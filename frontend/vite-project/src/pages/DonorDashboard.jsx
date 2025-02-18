import { useState } from "react";

const DonorDashboard = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [availability, setAvailability] = useState(true);
  const [donorInfo, setDonorInfo] = useState(null);

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:3000/api/donors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bloodGroup, city, availability }),
    });

    const data = await res.json();
    if (res.ok) {
      setDonorInfo(data);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Donor Dashboard</h2>
      <input className="border p-2 w-full mt-2" type="text" placeholder="Blood Group" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />
      <input className="border p-2 w-full mt-2" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
      <label className="mt-2 flex items-center">
        <input type="checkbox" checked={availability} onChange={() => setAvailability(!availability)} />
        <span className="ml-2">Available for Donation</span>
      </label>
      <button className="bg-red-600 text-white p-2 w-full mt-4" onClick={handleSubmit}>Submit</button>
      {donorInfo && (
        <div className="mt-4 p-4 border">
          <h3 className="font-bold">Your Donation Info</h3>
          <p>Blood Group: {donorInfo.bloodGroup}</p>
          <p>City: {donorInfo.city}</p>
          <p>Available: {donorInfo.availability ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;