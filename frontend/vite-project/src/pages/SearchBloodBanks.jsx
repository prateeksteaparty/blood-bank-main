import { useState } from "react";

const SearchBloodBanks = () => {
  const [city, setCity] = useState("");
  const [bloodBanks, setBloodBanks] = useState([]);

  const handleSearch = () => {
    // Simulating an API call
    const sampleBanks = [
      { name: "Red Cross Blood Bank", city: "Mumbai", contact: "9876543210" },
      { name: "LifeSaver Blood Bank", city: "Delhi", contact: "8765432109" },
    ];
    setBloodBanks(sampleBanks.filter((bank) => bank.city.toLowerCase() === city.toLowerCase()));
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
        {bloodBanks.length > 0 ? (
          bloodBanks.map((bank, index) => (
            <div key={index} className="border p-2 mt-2">
              <p><strong>Name:</strong> {bank.name}</p>
              <p><strong>City:</strong> {bank.city}</p>
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
