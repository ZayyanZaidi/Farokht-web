const db = require('../config/db');

const UserMongoose = require('./User');
const BrandMongoose = require('./Brand');
const ProductMongoose = require('./Product');
const StoryMongoose = require('./Story');
const SectionBackgroundMongoose = require('./SectionBackground');

const getModel = (name, mongooseModel) => {
  return {
    find: async (query) => {
      if (db.isFallback()) {
        return await db.getJSONModel(name).find(query);
      }
      return await mongooseModel.find(query);
    },
    findOne: async (query) => {
      if (db.isFallback()) {
        return await db.getJSONModel(name).findOne(query);
      }
      return await mongooseModel.findOne(query);
    },
    findById: async (id) => {
      if (db.isFallback()) {
        return await db.getJSONModel(name).findById(id);
      }
      // Handle Mongoose cast errors gracefully
      try {
        return await mongooseModel.findById(id);
      } catch (err) {
        return null;
      }
    },
    create: async (data) => {
      if (db.isFallback()) {
        return await db.getJSONModel(name).create(data);
      }
      const instance = new mongooseModel(data);
      return await instance.save();
    },
    findByIdAndUpdate: async (id, updateData) => {
      if (db.isFallback()) {
        return await db.getJSONModel(name).findByIdAndUpdate(id, updateData);
      }
      try {
        return await mongooseModel.findByIdAndUpdate(id, updateData, { new: true });
      } catch (err) {
        return null;
      }
    },
    findByIdAndDelete: async (id) => {
      if (db.isFallback()) {
        return await db.getJSONModel(name).findByIdAndDelete(id);
      }
      try {
        return await mongooseModel.findByIdAndDelete(id);
      } catch (err) {
        return null;
      }
    }
  };
};

module.exports = {
  User: getModel('users', UserMongoose),
  Brand: getModel('brands', BrandMongoose),
  Product: getModel('products', ProductMongoose),
  Story: getModel('stories', StoryMongoose),
  SectionBackground: getModel('sectionBackgrounds', SectionBackgroundMongoose)
};
