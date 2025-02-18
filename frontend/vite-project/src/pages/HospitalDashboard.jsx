import { useState, useEffect } from "react";

const HospitalDashboard = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bloodAvailable, setBloodAvailable] = useState({
    "A+": "0", "A-": "0", "B+": "0", "B-": "0", "O+": "0", "O-": "0", "AB+": "0", "AB-": "0",
  });
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetchHospitals();
  }, []);

  // Fetch all hospitals
// Fetch all hospitals
const fetchHospitals = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/hospitals/all");
    if (!res.ok) {
      throw new Error('Failed to fetch hospitals');
    }
    const data = await res.json();
    setHospitals(data);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
  }
};


  // Handle input change for blood availability
 // Handle input change for blood availability
const handleBloodChange = (group, value) => {
  if (/^\d*$/.test(value)) { // Ensure only digits are entered
    setBloodAvailable({
      ...bloodAvailable,
      [group]: value === "" ? 0 : parseInt(value, 10),  // Convert input to number
    });
  }
};


  // Add hospital details
  const handleSubmit = async () => {
    const res = await fetch("http://localhost:3000/api/hospitals/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, location, bloodAvailable }),
    });

    if (res.ok) {
      alert("Hospital added!");
      fetchHospitals();
    } else {
      alert("Failed to add hospital");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Hospital Dashboard</h2>

      {/* Hospital Form */}
      <div className="border p-4 mt-4">
        <input className="border p-2 w-full mb-2" type="text" placeholder="Hospital Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border p-2 w-full mb-2" type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

        {/* Blood Availability Inputs */}
        <div className="grid grid-cols-4 gap-2">
          {Object.keys(bloodAvailable).map((group) => (
            <div key={group}>
              <label>{group}</label>
              <input 
                className="border p-2 w-full" 
                type="text"  // Use text to allow leading zeros
                value={bloodAvailable[group]} 
                onChange={(e) => handleBloodChange(group, e.target.value)} 
              />
            </div>
          ))}
        </div>

        <button className="bg-blue-600 text-white p-2 w-full mt-4" onClick={handleSubmit}>Add Hospital</button>
      </div>

      {/* Display Hospitals */}
      <h3 className="text-lg font-bold mt-6">Available Hospitals</h3>
      <div className="mt-4">
        {hospitals.length === 0 ? <p>No hospitals found</p> : (
          hospitals.map((hospital) => (
            <div key={hospital._id} className="border p-4 mt-2">
              <h4 className="font-bold">{hospital.name} - {hospital.location}</h4>
              <p>Blood Availability:</p>
              <ul>
                {Object.entries(hospital.bloodAvailable).map(([group, count]) => (
                  <li key={group}>{group}: {count} units</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HospitalDashboard;
