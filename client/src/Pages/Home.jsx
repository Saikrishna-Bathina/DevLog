import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api.get('/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📝 DevLog Blog</h1>
        <Link to="/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            + Create Blog
          </button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p>No blogs yet. Start by creating one!</p>
      ) : (
        blogs.map(blog => (
          <div key={blog._id} className="border rounded-lg p-4 mb-4 shadow">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600 text-sm">By {blog.author?.name || "Anonymous"} on {new Date(blog.createdAt).toLocaleDateString()}</p>
            <Link to={`/view/${blog._id}`}>
              <button className="mt-2 text-blue-600 hover:underline">Read More</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
