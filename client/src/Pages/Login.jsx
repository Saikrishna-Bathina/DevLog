import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const handleSubmit = async e => {
  e.preventDefault();
  setError('');

  try {
    const res = await api.post('/api/auth/login', formData);


    localStorage.setItem('token', res.data.token);
    navigate('/');
  } catch (err) {
    const message =
      err.response?.data?.message || 'Failed to login';
    setError(message);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '400px',
        margin: '40px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        boxShadow: '0 0 8px rgba(0,0,0,0.1)'
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      {error && (
        <p style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</p>
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Login
      </button>
    </form>
  );
}
