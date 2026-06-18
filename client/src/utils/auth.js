import { apiFetch } from './api';
import { DEFAULT_AVATAR } from '../data/referenceAssets';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession({ token, user }) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    if (user.role) localStorage.setItem('role', user.role);
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem('role');
}

export function getAvatarUrl(user) {
  return user?.avatarUrl || DEFAULT_AVATAR;
}

export async function fetchCurrentUser() {
  const token = getToken();
  if (!token) return null;

  const response = await apiFetch('/api/auth/me');
  if (!response.ok) {
    clearSession();
    return null;
  }

  const data = await response.json();
  const user = {
    id: data.id,
    username: data.username,
    email: data.email,
    role: data.role,
    avatarUrl: data.avatarUrl || DEFAULT_AVATAR
  };
  setSession({ user });
  return user;
}

export async function login(email, password) {
  const response = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || 'Login failed');

  const user = {
    ...data.user,
    avatarUrl: data.user?.avatarUrl || DEFAULT_AVATAR
  };
  setSession({ token: data.token, user });
  return { token: data.token, user };
}

export async function register({ username, email, password }) {
  const response = await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, role: 'merchant' })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || 'Registration failed');

  const user = {
    ...data.user,
    avatarUrl: data.user?.avatarUrl || DEFAULT_AVATAR
  };
  setSession({ token: data.token, user });
  return { token: data.token, user };
}

export function logout() {
  clearSession();
}
