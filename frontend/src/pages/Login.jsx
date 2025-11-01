import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUser } from 'react-icons/fa';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  if (user) navigate("/dashboard");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const res = await login(form.username, form.password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message || 'Invalid credentials, please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto mt-24 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400 text-center">Sign In</h2>
      {error && <div className="text-red-500 text-center mb-4 font-semibold">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            name="username"
            required
            placeholder="Username"
            className="pl-10 py-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-gray-400 dark:placeholder-gray-500 w-full"
            value={form.username}
            onChange={handleChange}
          />
        </label>
        <label className="relative">
          <FaLock className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="pl-10 py-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-gray-400 dark:placeholder-gray-500 w-full"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-600 hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
}
