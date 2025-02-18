import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import SearchDonors from "./pages/SearchDonors";
import SearchBloodBanks from "./pages/SearchBloodBanks";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search-donors" element={<SearchDonors />} />
        <Route path="/search-bloodbanks" element={<SearchBloodBanks />} />
        <Route path="/donor-dashboard" element={<PrivateRoute><DonorDashboard /></PrivateRoute>} />
        <Route path="/hospital-dashboard" element={<PrivateRoute><HospitalDashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
