import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import UploadImage from "./components/UploadImage";
import DisplayImages from "./components/DisplayImages";
import Loader from "./Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

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
      <div className="bg-gray-100 min-h-screen flex flex-col">
        {loading ? (
          <Loader />
        ) : (
          <>
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
                </div>
              </div>
            </nav>
            <main className="flex-grow flex items-center justify-center">
              <Routes>
                <Route path="/" element={<UploadImage />} />
                <Route path="/gallery" element={<DisplayImages />} />
              </Routes>
            </main>
            <footer className="bg-white shadow-md p-4 sticky bottom-0 z-50">
              <div className="container mx-auto flex items-center justify-between">
                <span className="text-gray-800">
                  Created by{" "}
                  <a href="https://www.linkedin.com/in/bhuvan-a-r/" className="font-bold text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    Bhuvan AR
                  </a>
                </span>
                <div className="space-x-4">
                  <a href="https://www.linkedin.com/in/bhuvan-a-r/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-600">
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                  </a>
                  <a href="https://github.com/bhuvan-a-r" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                  </a>
                </div>
              </div>
            </footer>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
