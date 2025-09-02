// Admin password management utilities
const ADMIN_EMAIL = 'admin@smartstake.com';
const DEFAULT_PASSWORD = 'SmartStake2025!';

// Simple password hashing (in production, use bcrypt or similar)
function simpleHash(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}

// Get stored admin password hash
function getAdminPasswordHash() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_password_hash') || simpleHash(DEFAULT_PASSWORD);
  }
  return simpleHash(DEFAULT_PASSWORD);
}

// Set new admin password hash
function setAdminPasswordHash(newPassword) {
  if (typeof window !== 'undefined') {
    const hash = simpleHash(newPassword);
    localStorage.setItem('admin_password_hash', hash);
    return hash;
  }
  return null;
}

// Verify admin credentials
export function verifyAdminCredentials(email, password) {
  if (email !== ADMIN_EMAIL) {
    return false;
  }
  
  const storedHash = getAdminPasswordHash();
  const inputHash = simpleHash(password);
  
  return storedHash === inputHash;
}

// Change admin password
export function changeAdminPassword(currentPassword, newPassword) {
  // Verify current password first
  if (!verifyAdminCredentials(ADMIN_EMAIL, currentPassword)) {
    return { success: false, error: 'Current password is incorrect' };
  }
  
  // Validate new password
  if (newPassword.length < 8) {
    return { success: false, error: 'New password must be at least 8 characters long' };
  }
  
  if (newPassword === currentPassword) {
    return { success: false, error: 'New password must be different from current password' };
  }
  
  // Set new password
  setAdminPasswordHash(newPassword);
  return { success: true, message: 'Password changed successfully' };
}

// Get admin email
export function getAdminEmail() {
  return ADMIN_EMAIL;
}
