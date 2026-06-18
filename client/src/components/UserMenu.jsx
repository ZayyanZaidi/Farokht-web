import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getAvatarUrl } from '../utils/auth';
import './UserMenu.css';

export default function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="user-menu" ref={ref}>
      <button type="button" className="user-menu-trigger" onClick={() => setOpen(!open)} aria-expanded={open}>
        <img src={getAvatarUrl(user)} alt="" className="user-menu-avatar" />
        <span className="user-menu-name">{user.username}</span>
      </button>
      {open && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <img src={getAvatarUrl(user)} alt="" />
            <div>
              <strong>{user.username}</strong>
              <span>{user.email}</span>
            </div>
          </div>
          {user.role === 'admin' && (
            <Link to="/?admin=1#admin-panel" onClick={() => setOpen(false)}>
              Admin panel
            </Link>
          )}
          <button type="button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
