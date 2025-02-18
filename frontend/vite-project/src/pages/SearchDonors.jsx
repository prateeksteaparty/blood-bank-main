import { useState } from "react";
import axios from "axios";

const SearchDonors = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState(""); // For city/location
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
  
    console.log("Searching for:", bloodGroup, location); // Add this line for debugging
  
    try {
      const response = await axios.get("http://localhost:3000/api/donors", {
        params: {
          bloodGroup,
          city: location
        }
      });
  
      const filteredDonors = response.data;
      setDonors(filteredDonors);
      
      if (filteredDonors.length === 0) {
        setError("No donors found.");
      }
    } catch (error) {
      setError("Error fetching donors.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Search Blood Donors</h2>
      <input
        className="border p-2 w-full mt-2"
        type="text"
        placeholder="Enter Blood Group (e.g., A+)"
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
      />
      <input
        className="border p-2 w-full mt-2"
        type="text"
        placeholder="Enter Location (e.g., Delhi)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        className="bg-red-600 text-white p-2 w-full mt-4"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>

      <div className="mt-4">
        {error && <p className="text-red-600">{error}</p>}
        {donors.length > 0 ? (
          donors.map((donor, index) => (
            <div key={index} className="border p-2 mt-2">
              <p><strong>Name:</strong> {donor.name}</p>
              <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
              <p><strong>Location:</strong> {donor.city}</p>
            </div>
          ))
        ) : (
          !loading && <p>No donors found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchDonors;
