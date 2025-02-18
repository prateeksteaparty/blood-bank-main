import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // <-- Add role state
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }), // <-- Include role
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/donor-dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Register</h2>
      <input className="border p-2 w-full mt-2" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="border p-2 w-full mt-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full mt-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      
      {/* Role Dropdown */}
      <select className="border p-2 w-full mt-2" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="donor">Donor</option>
        <option value="hospital">Hospital</option>
      </select>

      <button className="bg-red-600 text-white p-2 w-full mt-4" onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
