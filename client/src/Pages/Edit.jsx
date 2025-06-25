import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await api.get(`/api/blogs/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
      setCoverImage(res.data.coverImage);
    };
    fetchBlog();
  }, [id]);

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('file', newImage);
    formData.append('upload_preset', 'devlog_preset');

    const response = await fetch('https://api.cloudinary.com/v1_1/dagsneuyk/image/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    return data.secure_url;
  };

  // ✅ DaisyUI toast
  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} text-sm`;
    toast.innerHTML = `<span>${message}</span>`;
    document.getElementById('toast-container').appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = coverImage;
      if (newImage) {
        imageUrl = await handleImageUpload();
      }

      const token = localStorage.getItem('token');
      await api.put(`/api/blogs/${id}`, {
        title,
        content,
        coverImage: imageUrl
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      showToast('✅ Blog updated successfully!', 'success');
      navigate(`/view/${id}`);
    } catch (err) {
      showToast('❌ Failed to update blog', 'error');
      console.error(err);
    }
  };

  return (
    <>
      
      <div id="toast-container" className="toast toast-top toast-end z-50 fixed"></div>

      <div className="min-h-[91.3vh] bg-base-200 flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-2xl bg-base-100 p-8 rounded-2xl shadow-md border border-base-300">
          <h1 className="text-2xl font-bold mb-6 text-primary text-center">✍️ Edit Blog</h1>

          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Title"
              className="input input-bordered w-full rounded-xl bg-zinc-950 text-white"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Blog Content"
              className="textarea textarea-bordered w-full h-40 rounded-xl bg-zinc-950 text-white"
            />

            <div>
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-52 object-cover rounded-xl mb-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files[0])}
                className="file-input file-input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className="btn bg-primary text-base-100 w-full rounded-xl hover:bg-primary-focus"
            >
              Update Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
