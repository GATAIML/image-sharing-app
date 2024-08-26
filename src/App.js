import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadImage from "./components/UploadImage";
import DisplayImages from "./components/DisplayImages";
import Loader from "./Loader";
import { AuthProvider } from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen flex flex-col">
          {loading ? (
            <Loader />
          ) : (
            <>
              <Navbar /> {/* Include Navbar */}
              <main className="flex-grow flex items-center justify-center">
                <Routes>
                  <Route path="/" element={<ProtectedRoute><UploadImage /></ProtectedRoute>} />
                  <Route path="/gallery" element={<ProtectedRoute><DisplayImages /></ProtectedRoute>} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </main>
              <Footer />
            </>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
