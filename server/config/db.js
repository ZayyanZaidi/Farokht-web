const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let useLocalJSONDb = false;
const localDbPath = path.join(__dirname, '..', 'data', 'local_db.json');

// Initialize local JSON DB if it doesn't exist
function initLocalDb() {
  const dbDir = path.dirname(localDbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  if (!fs.existsSync(localDbPath)) {
    const initialData = {
      users: [],
      brands: [],
      products: [],
      stories: [],
      sectionBackgrounds: []
    };
    fs.writeFileSync(localDbPath, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

// Guard against collections that don't exist yet in an older local_db.json
// (e.g. added after the file was first created) so reads/writes never crash.
function ensureCollection(db, collectionName) {
  if (!Array.isArray(db[collectionName])) {
    db[collectionName] = [];
  }
  return db[collectionName];
}

// JSON DB read/write helper
function readLocalDb() {
  initLocalDb();
  try {
    const data = fs.readFileSync(localDbPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading JSON database, resetting...", err);
    return { users: [], brands: [], products: [], stories: [] };
  }
}

function writeLocalDb(data) {
  try {
    fs.writeFileSync(localDbPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error writing to JSON database:", err);
  }
}

// Connect to database
async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farokht', {
      serverSelectionTimeoutMS: 3000 // 3 seconds timeout
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    useLocalJSONDb = false;
  } catch (error) {
    console.warn(`MongoDB Connection Failed: ${error.message}`);
    console.log("⚠️ Fallback: Initializing local JSON File-system database...");
    useLocalJSONDb = true;
    initLocalDb();
  }
}

// Generate unique string ID for JSON database items
function generateId() {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

// Define adapter for collection CRUD
const createJSONModel = (collectionName) => {
  return {
    find: async (query = {}) => {
      const db = readLocalDb();
      let items = db[collectionName] || [];
      // Basic query filtering
      return items.filter(item => {
        for (const key in query) {
          if (query[key] !== undefined && item[key] !== query[key]) {
            return false;
          }
        }
        return true;
      });
    },
    findOne: async (query = {}) => {
      const db = readLocalDb();
      let items = db[collectionName] || [];
      return items.find(item => {
        for (const key in query) {
          if (query[key] !== undefined && item[key] !== query[key]) {
            return false;
          }
        }
        return true;
      }) || null;
    },
    findById: async (id) => {
      const db = readLocalDb();
      let items = db[collectionName] || [];
      return items.find(item => item._id === id || item.id === id) || null;
    },
    create: async (data) => {
      const db = readLocalDb();
      const items = ensureCollection(db, collectionName);
      const newItem = {
        _id: generateId(),
        id: generateId(),
        createdAt: new Date().toISOString(),
        ...data
      };
      items.push(newItem);
      writeLocalDb(db);
      return newItem;
    },
    findByIdAndUpdate: async (id, updateData) => {
      const db = readLocalDb();
      const items = ensureCollection(db, collectionName);
      const idx = items.findIndex(item => item._id === id || item.id === id);
      if (idx === -1) return null;
      items[idx] = {
        ...items[idx],
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      writeLocalDb(db);
      return items[idx];
    },
    findByIdAndDelete: async (id) => {
      const db = readLocalDb();
      const items = ensureCollection(db, collectionName);
      const idx = items.findIndex(item => item._id === id || item.id === id);
      if (idx === -1) return null;
      const deletedItem = items.splice(idx, 1)[0];
      writeLocalDb(db);
      return deletedItem;
    }
  };
};

module.exports = {
  connectDB,
  isFallback: () => useLocalJSONDb,
  getJSONModel: (collection) => createJSONModel(collection)
};
