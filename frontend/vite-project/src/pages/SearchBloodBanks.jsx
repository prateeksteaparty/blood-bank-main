import { useState } from "react";
import axios from 'axios';

const SearchBloodBanks = () => {
  const [city, setCity] = useState("");
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/api/hospitals/all`, {
        params: { city }
      });
      setBloodBanks(response.data.filter((bank) => bank.location.toLowerCase() === city.toLowerCase()));
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Search Blood Banks</h2>
      <input
        className="border p-2 w-full mt-2"
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="bg-red-600 text-white p-2 w-full mt-4" onClick={handleSearch}>
        Search
      </button>

      <div className="mt-4">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {bloodBanks.length > 0 ? (
          bloodBanks.map((bank, index) => (
            <div key={index} className="border p-2 mt-2">
              <p><strong>Name:</strong> {bank.name}</p>
              <p><strong>City:</strong> {bank.location}</p>
              <p><strong>Contact:</strong> {bank.contact}</p>
            </div>
          ))
        ) : (
          <p>No blood banks found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBloodBanks;
