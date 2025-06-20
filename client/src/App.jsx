import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Create from './Pages/Create';
import Edit from './Pages/Edit';
import View from './Pages/View';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './Components/NavBar';  // Import the Navbar component

function App() {
  return (
    <Router>
      {/* Navbar will be shown on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
