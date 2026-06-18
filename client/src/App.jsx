import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Directory from './pages/Directory';
import BrandDetail from './pages/BrandDetail';
import AdminLogin from './pages/AdminLogin';
import Auth from './pages/Auth';
import './App.css';

function AppLayout() {
  const location = useLocation();
  const minimalChrome = location.pathname === '/auth' || location.pathname === '/admin';

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/brand/:handle" element={<BrandDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </main>
      {!minimalChrome && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
