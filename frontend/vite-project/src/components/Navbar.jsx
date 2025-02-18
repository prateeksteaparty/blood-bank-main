import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-red-600 p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold">Blood Donation App</h1>
      <div>
        <Link className="mr-4" to="/">Home</Link>
        <Link className="mr-4" to="/search-donors">Search Donors</Link>
        <Link className="mr-4" to="/search-bloodbanks">Blood Banks</Link>

        {isAuthenticated ? (
          <button className="bg-white text-red-600 px-4 py-1" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link className="mr-4" to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
