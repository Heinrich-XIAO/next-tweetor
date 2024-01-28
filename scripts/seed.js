const { sql } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

// Function to hash a password
async function hashPassword(password) {
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

async function setup_db() {
  
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL UNIQUE
  );`;

  await sql`CREATE TABLE IF NOT EXISTS flits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profane_flit TEXT,
    username TEXT NOT NULL
  )`;

  if ((await sql`SELECT * FROM users WHERE username='admin'`).rows.length == 0) {
    await sql`INSERT INTO users (username, password) VALUES ('admin', ${await hashPassword("admin_password")})`;
  }
}

setup_db();
