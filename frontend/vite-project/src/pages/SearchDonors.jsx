import { useState } from "react";

const SearchDonors = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [donors, setDonors] = useState([]);

  const handleSearch = () => {
    // Simulating an API call
    const sampleDonors = [
      { name: "Rahul", bloodGroup: "A+", location: "Mumbai" },
      { name: "Priya", bloodGroup: "O-", location: "Delhi" },
    ];
    setDonors(sampleDonors.filter((donor) => donor.bloodGroup === bloodGroup));
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
      <button className="bg-red-600 text-white p-2 w-full mt-4" onClick={handleSearch}>
        Search
      </button>

      <div className="mt-4">
        {donors.length > 0 ? (
          donors.map((donor, index) => (
            <div key={index} className="border p-2 mt-2">
              <p><strong>Name:</strong> {donor.name}</p>
              <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
              <p><strong>Location:</strong> {donor.location}</p>
            </div>
          ))
        ) : (
          <p>No donors found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchDonors;
