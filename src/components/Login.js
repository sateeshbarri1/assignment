import React, { useState } from "react";
import axios from "axios";

const Login = ({setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.get(`https://swapi.dev/api/people/?search=${username}`);
      const user = response.data.results.find(u => u.name === username);
      if (user && user.birth_year === password) {
        setUser(user);
        setError("");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Failed to fetch user");
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h2 className="text-2xl font-bold">Login</h2>
      <input className="border p-2 m-2" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
      <input className="border p-2 m-2" type="password" placeholder="Birth Year" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleLogin}>Login</button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Login;