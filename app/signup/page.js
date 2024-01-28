import { useState } from 'next';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import hashPassword from '../../helpers/passwordHash'

const Signup = () => {
  
  async function handleLogin(formData) {
    'use server'
    const rawFormData = {
      username: formData.get('username'),
      password: formData.get('password'),
      confirmation: formData.get('passwordConfirm')
    };
    console.log(rawFormData);
    
    if (rawFormData.password != rawFormData.confirmation) {
      redirect('/signup');
    }

    const { rows } = await sql`SELECT * FROM users WHERE username=${rawFormData.username}`
    
    if (rows.length != 0) {
      redirect('/signup');
    }
    
    await sql`INSERT INTO users (username, password) VALUES (${rawFormData.username}, ${await hashPassword(rawFormData.password)})`

    redirect('/');
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 rounded shadow-md w-96 border border-white">
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
        <form action={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 bg-black"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 bg-black"
              placeholder="Enter your password"
            />
          </div>          
          <div className="mb-4">
            <label htmlFor="passwordConfirm" className="block text-gray-600 text-sm font-medium mb-2">
              Confirmation Password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 bg-black"
              placeholder="Enter your password again"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

