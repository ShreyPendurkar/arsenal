import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { registerUser } from '../utils/fakeApi';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaKey, FaUserShield } from 'react-icons/fa';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'role1' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, user } = useAuth();

  if (user) navigate("/dashboard");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const res = registerUser(form);
    if (res.success) {
      login(form.username, form.role);
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-24 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-400 text-center">Create Account</h2>
      {error && <div className="text-red-500 text-center mb-4 font-semibold">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            name="username"
            required
            placeholder="Username"
            className="pl-10 py-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 placeholder-gray-400 dark:placeholder-gray-500 w-full"
            value={form.username}
            onChange={handleChange}
          />
        </label>
        <label className="relative">
          <FaKey className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="pl-10 py-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 placeholder-gray-400 dark:placeholder-gray-500 w-full"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <label className="relative">
          <FaUserShield className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
          <select
            name="role"
            className="pl-10 py-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 placeholder-gray-400 dark:placeholder-gray-500 w-full"
            value={form.role}
            onChange={handleChange}
          >
            <option value="role1">Role 1</option>
            <option value="role2">Role 2</option>
          </select>
        </label>
        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition">
          Register
        </button>
      </form>
      <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <a href="/login" className="text-green-600 hover:underline">
          Sign In
        </a>
      </p>
    </div>
  );
}
