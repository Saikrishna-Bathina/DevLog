import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
      <p className="text-sm text-gray-600 mb-2">
        By {blog.author || 'Anonymous'} on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-800 mb-3 line-clamp-3">{blog.content}</p>
      <Link to={`/view/${blog._id}`} className="text-blue-500 hover:underline">
        Read More →
      </Link>
    </div>
  );
};

export default BlogCard;
