import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import History from "./pages/History"; // ✅ TAMBAH INI

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis" element={<Analysis />} />

        {/* ✅ FIX HISTORY ROUTE */}
        <Route path="/history" element={<History />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;