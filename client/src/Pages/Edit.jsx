import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/axios';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });

  useEffect(() => {
    api.get(`/api/blogs/${id}`)
      .then(res => {
        setFormData({
          title: res.data.title || '',
          content: res.data.content || '',
          author: res.data.author || ''
        });
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      await api.put(`/api/blogs/${id}`, {
        title: formData.title,
        content: formData.content
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate(`/view/${id}`);
    } catch (err) {
      console.error(err);
      alert("Unauthorized or failed to update blog.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Blog</h1>
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
          placeholder="Edit your blog content..."
          className="border p-2 h-40 rounded"
          value={formData.content}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          className="border p-2 rounded"
          value={formData.author}
          onChange={handleChange}
          disabled
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default Edit;
