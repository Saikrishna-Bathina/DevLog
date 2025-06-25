import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };


  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location.pathname]);

  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", syncToken);
    return () => window.removeEventListener("storage", syncToken);
  }, []);

  return (
    <nav className="bg-base-200 text-base-content shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-wide text-primary border-1">
          <img src="/logo.png" alt="DevLog Logo" className="w-10 h-10 object-contain mr-2 rounded-xl " /> 
          DevLog
        </Link>

        <button
          className="md:hidden text-xl text-base-content"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <Link to="/" className="hover:text-info transition">Home</Link>
          {token ? (
            <>
              <Link to="/create" className="hover:text-info transition">Create</Link>
              <Link to="/profile" className="hover:text-info transition">Profile</Link>
              <button
                onClick={handleLogout}
                className="hover:text-error transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-info transition">Login</Link>
              <Link to="/register" className="hover:text-info transition">Register</Link>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-3 space-y-2 text-sm font-medium px-2 pt-3 border-t border-base-300">
          <Link to="/" className="block hover:text-info">Home</Link>
          {token ? (
            <>
              <Link to="/create" className="block hover:text-info">Create</Link>
              <Link to="/profile" className="block hover:text-info">Profile</Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left hover:text-error"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-info">Login</Link>
              <Link to="/register" className="block hover:text-info">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
