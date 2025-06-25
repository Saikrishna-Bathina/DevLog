import React, { useState } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/showToast';

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'devlog_preset'); // replace with your Cloudinary preset

    const response = await fetch('https://api.cloudinary.com/v1_1/dagsneuyk/image/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await handleImageUpload();
      const token = localStorage.getItem('token');
      await api.post('/api/blogs', {
        title,
        content,
        coverImage: imageUrl
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      showToast('Publish successful 🎉', 'success'); 
      navigate('/');
    } catch (err) {
      toast.error("Failed to create blog");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[91.3vh] bg-base-200 w-full flex justify-center items-start px-4 py-8">
      <div className="w-full max-w-2xl bg-base-100 p-8 rounded-2xl shadow-md border border-base-300">
        <h1 className="text-2xl font-bold mb-6 text-primary">📝 Create New Blog</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input input-bordered w-full rounded-xl bg-zinc-950 text-white"
          />

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="textarea textarea-bordered h-40 w-full rounded-xl bg-zinc-950 text-white"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="file-input file-input-bordered w-full rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="btn bg-primary text-base-100 rounded-xl hover:bg-primary-focus"
          >
            {loading ? 'Posting...' : 'Create Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
