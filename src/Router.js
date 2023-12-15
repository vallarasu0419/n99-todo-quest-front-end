import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import DashboardLayout from "./Pages/Dashboard/DashboardLayout";
import DiscussHub from "./Pages/DiscussHub";
import Chat from "./Pages/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard/discussHub" element={<DiscussHub />} />
          <Route path="/dashboard/chat" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
