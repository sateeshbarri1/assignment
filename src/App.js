import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import "tailwindcss/tailwind.css";
import Login from "./components/Login";
import Search from "./components/Search";

// App Component
const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login setUser={setUser} /> : <Navigate to="/search" />} />
        <Route path="/search" element={user ? <Search user={user} setUser={setUser}  /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;