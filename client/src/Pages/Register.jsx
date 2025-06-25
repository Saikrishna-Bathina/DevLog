import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await api.post('/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      toast.success("Registration successful!");
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to register';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-[91.3vh] flex justify-center items-center px-4 bg-base-200">

      <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-md border border-base-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full rounded-xl bg-zinc-950 text-white"
          />
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
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-base-content">
          Already registered?{' '}
          <Link to="/login" className="text-info font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
