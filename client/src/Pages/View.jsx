import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { showToast } from '../utils/showToast';

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api.get(`/api/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');

    try {
      await api.delete(`/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      showToast('✅ Blog deleted successfully!', 'success');
      navigate('/');
    } catch (err) {
      console.error(err);
      showToast('❌ Only the blog author can delete this blog.', 'error');
    }
  };

  if (!blog) return (
    <div className="min-h-[91.3vh] flex justify-center items-center bg-base-200 text-center">
      <p className="text-lg text-base-content">Loading blog...</p>
    </div>
  );

  return (
    <>
      {/* DaisyUI toast container */}
      <div id="toast-container" className="toast toast-top toast-end fixed z-50" />

      <div className="min-h-[91.3vh] bg-base-200 flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-base-100 p-8 rounded-2xl shadow-md border border-base-300">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-56 object-cover rounded-xl mb-6"
          />

          <h1 className="text-3xl font-bold mb-2 text-primary">{blog.title}</h1>
          <p className="text-sm text-base-content mb-6">
            By <span className="font-semibold">{blog.author?.name || 'Anonymous'}</span> on{' '}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>

          <div className="prose max-w-none mb-8 text-base-content">
            <p className="whitespace-pre-line break-words">{blog.content}</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-end">
            <Link to={`/edit/${blog._id}`}>
              <button className="btn btn-warning text-white rounded-xl">
                ✏️ Edit
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error text-white rounded-xl"
            >
              🗑️ Delete
            </button>
            <Link to="/">
              <button className="btn btn-outline rounded-xl">
                ← Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
