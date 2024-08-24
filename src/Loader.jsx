// src/components/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <img 
        src="https://firebasestorage.googleapis.com/v0/b/image-sharing-app-61874.appspot.com/o/images%2FTAG%20IT%20SHARE%20IT.png?alt=media&token=1c4b4c89-36dc-4a48-b875-50f0488874fe" 
        alt="Loading..." 
        className="w-32 h-32" // Adjust these values to increase the size
      />
    </div>
  );
};

export default Loader;
