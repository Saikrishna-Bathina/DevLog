import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../Components/Loader';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const fetchProfile = async () => {
      try {
        const res = await api.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data.user);
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-[91.3vh] bg-base-200 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        {userData && (
          <>
            <div className="bg-base-100 shadow-md p-6 rounded-2xl mb-6 border border-base-300">
              <h1 className="text-2xl font-bold text-primary mb-2">👤 {userData.name}</h1>
              <p className="text-base-content text-sm">📧 {userData.email}</p>
            </div>

            <h2 className="text-xl font-semibold mb-4 text-primary">📝 Your Blogs</h2>

            {blogs.length === 0 ? (
              <p className="text-base-content text-center mt-10">You haven’t written any blogs yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
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
                      <h3 className="text-lg font-semibold text-base-content mb-1">{blog.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">Created on {new Date(blog.createdAt).toLocaleString()}</p>
                      <div className="mt-auto flex justify-between items-center gap-2">
                        <Link to={`/view/${blog._id}`} className="btn btn-outline btn-sm rounded-full hover:text-info hover:border-info">
                          View
                        </Link>
                        <Link to={`/edit/${blog._id}`} className="btn btn-sm btn-info text-white rounded-full">
                          Edit
                        </Link>
                        <button
                          className="btn btn-error btn-sm  text-white rounded-full"
                          onClick={async () => {
                            const confirm = window.confirm('Are you sure you want to delete this blog?');
                            if (!confirm) return;
                            try {
                              const token = localStorage.getItem('token');
                              await api.delete(`/api/blogs/${blog._id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                              });
                              setBlogs(blogs.filter((b) => b._id !== blog._id));
                            } catch (err) {
                              alert('Failed to delete blog');
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
