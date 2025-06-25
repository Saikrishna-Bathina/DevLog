import React, { useEffect, useState } from 'react';
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
    <div className="min-h-[91.3vh] bg-base-200 p-6  mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary"> Explore Blogs</h1>
        <Link to="/create">
          <button className="btn bg-primary text-base-100 rounded-xl hover:bg-primary-focus">
            Create
          </button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="text-center text-base-content text-lg mt-20">No blogs yet. Start by creating one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <div
              key={blog._id}
              className="bg-base-100 border border-base-300 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <figure className="relative">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </figure>

              <div className="p-4 flex flex-col h-full">
                <h2 className="text-lg font-semibold text-base-content">{blog.title}</h2>
                <p className="text-sm text-gray-500 mb-4">by {blog.author?.name || "Anonymous"}</p>

                <div className="mt-auto flex justify-end">
                  <Link to={`/view/${blog._id}`}>
                    <button className="btn btn-outline btn-sm rounded-full px-4 py-1 hover:text-info hover:border-info">
                      Read More →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
