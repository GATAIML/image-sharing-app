import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import UploadImage from "./components/UploadImage";
import DisplayImages from "./components/DisplayImages";
import Loader from "./Loader";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {loading ? (
          <Loader />
        ) : (
          <>
            <nav className="bg-white shadow-md p-4">
              <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">Image Sharing App</Link>
                <div className="space-x-4">
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
                </div>
              </div>
            </nav>
            <main className="container mx-auto p-4">
              <Routes>
                <Route path="/" element={<UploadImage />} />
                <Route path="/gallery" element={<DisplayImages />} />
              </Routes>
            </main>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
