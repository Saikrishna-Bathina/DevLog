import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Unauthorized or error while deleting.");
    }
  };

  if (!blog) return <p className="text-center p-6">Loading blog...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 mb-4">
        By {blog.author?.name || 'Anonymous'} on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <p className="mb-6 whitespace-pre-line break-words">{blog.content}</p>

      <div className="flex gap-4">
        <Link to={`/edit/${blog._id}`}>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            ✏️ Edit
          </button>
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          🗑️ Delete
        </button>
        <Link to="/">
          <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
            ← Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default View;
