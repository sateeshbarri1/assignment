import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ user, setUser }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [error, setError] = useState("");

//   if (!user) {
//     return <Navigate to="/" />; // Redirect if user is not logged in
//   }
  useEffect(() => {
    console.log(searchCount)
    if (searchCount > 15 && user.name !== "Luke Skywalker") {
      setError("Search limit exceeded! Wait a minute.");
      return;
    }
    if (query.length > 0) {
        setSearchCount((prev)=>prev+1)
      axios.get(`https://swapi.dev/api/planets/?search=${query}`)
        .then(res => setResults(res.data.results))
        .catch(() => setError("Failed to fetch planets"));
    }
  }, [query, searchCount, user.name]);

  const handleLogout = () => {
    console.log(user,"user")
    setUser("");
    console.log(user,"user")
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Search Planets</h2>
      <input className="border p-2 m-2 w-full" type="text" placeholder="Search for planets" value={query} onChange={(e) => setQuery(e.target.value)} />
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {results.map(planet => (
          <li key={planet.name} className="p-4 border my-2" style={{ fontSize: `${Math.log(planet.population || 1) * 2}px` }}>
            {planet.name} - Population: {planet.population}
          </li>
        ))}
      </ul>

      <button className="bg-red-500 text-white p-2 rounded mt-4" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Search;