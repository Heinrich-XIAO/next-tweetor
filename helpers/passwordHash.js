const bcrypt = require('bcrypt');

// Function to hash a password
export default async function hashPassword(password) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}
