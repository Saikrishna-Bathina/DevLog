import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { showToast } from '../utils/showToast'; 

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await api.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);

      showToast('Login successful 🎉', 'success');
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to login';
      showToast(`❌ ${message}`, 'error'); 
    }
  };

  return (
    <div className="min-h-[91.3vh] flex justify-center items-center px-4 bg-base-200">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-md border border-base-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full rounded-xl bg-zinc-950 text-white"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input input-bordered w-full rounded-xl bg-zinc-950 text-white"
          />
          <button
            type="submit"
            className="btn bg-primary text-base-100 w-full rounded-xl hover:bg-primary-focus"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-base-content">
          Don't have an account?{' '}
          <Link to="/register" className="text-info font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
