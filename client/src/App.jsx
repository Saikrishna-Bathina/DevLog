import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Create from './Pages/Create';
import Edit from './Pages/Edit';
import View from './Pages/View';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './Components/NavBar'; 
import Profile from './Pages/Profile';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div id="daisy-toast-root" className="toast toast-top toast-end z-50" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
      <Footer/>
    </Router>

  );
}

export default App;
