import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async e => {
  e.preventDefault();
  setError('');

  try {
    const res = await api.post('/api/auth/register', formData);

    localStorage.setItem('token', res.data.token);
    navigate('/');
  } catch (err) {
    const message = err.response?.data?.message || 'Failed to register';
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
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
      {error && (
        <p style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</p>
      )}
      <input
        name="name"
        type="text"
        placeholder="Full Name"
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
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Register
      </button>
    </form>
  );
}
