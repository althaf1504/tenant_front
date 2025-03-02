import { useState, useEffect } from "react";

const API_URL = "https://your-backend-url.onrender.com"; // Change after deployment

function App() {
  const [tenants, setTenants] = useState([]);
  const [name, setName] = useState("");
  const [rentAmount, setRentAmount] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/tenants`)
      .then((res) => res.json())
      .then((data) => setTenants(data));
  }, []);

  const addTenant = () => {
    fetch(`${API_URL}/tenants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rentAmount }),
    }).then(() => window.location.reload());
  };

  return (
    <div>
      <h1>Tenant Management</h1>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Rent" onChange={(e) => setRentAmount(e.target.value)} />
      <button onClick={addTenant}>Add Tenant</button>
      
      <h2>Tenant List</h2>
      {tenants.map((tenant) => (
        <div key={tenant._id}>
          {tenant.name} - ${tenant.rentAmount}
        </div>
      ))}
    </div>
  );
}

export default App;
