import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth"; // Import useAuth
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig"; 

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">Image Sharing App</Link>
        <div className="space-x-4 mt-2 md:mt-0">
          <Link 
            to="/" 
            className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-300"
          >
            Upload
          </Link>
          <Link 
            to="/gallery" 
            className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-300"
          >
            Gallery
          </Link>
          {currentUser ? (
            <button 
              onClick={handleLogout} 
              className="inline-block px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
