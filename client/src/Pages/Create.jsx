import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Create = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert("Title and Content are required.");
      return;
    }

    const token = localStorage.getItem('token');

    try {
      await api.post('/api/blogs',
        {
          title: formData.title,
          content: formData.content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Unauthorized. Please login again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Create New Blog</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          className="border p-2 rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Write your blog content here..."
          className="border p-2 h-40 rounded"
          value={formData.content}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name (Optional)"
          className="border p-2 rounded"
          value={formData.author}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default Create;
