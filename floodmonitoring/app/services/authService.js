// services/authService.js
import { query } from '../lib/db';

export const login = async (credentials) => {
  try {
    // Query the database for the user
    const users = await query(
      'SELECT * FROM users WHERE email = ?', 
      [credentials.email]
    );
    
    if (users.length === 0) {
      return { success: false, message: 'User not found' };
    }
    
    const user = users[0];
    
    // In a real app, you should use bcrypt to compare hashed passwords
    if (user.password !== credentials.password) {
      return { success: false, message: 'Invalid password' };
    }
    
    // Don't return the password in the response
    delete user.password;
    
    return {
      success: true,
      user,
      token: 'your-jwt-token' // In a real app, generate a JWT
    };
  } catch (error) {
    console.error('Database error:', error);
    return { success: false, message: 'Database error' };
  }
};

export const logout = async () => {
  // In a real app, you might invalidate the token
  return { success: true };
};