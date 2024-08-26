import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faCopy } from '@fortawesome/free-solid-svg-icons';

const DisplayImages = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const db = getFirestore();
      const imagesCollection = collection(db, "images");
      const imagesSnapshot = await getDocs(imagesCollection);
      const imagesList = imagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setImages(imagesList);
    };

    fetchImages();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
      weekday: 'long' 
    };
    return `Uploaded on: ${date.toLocaleDateString('en-IN', options)}`;
  };

  const handleShareClick = (image) => {
    setSelectedImage(image);
    setShowShareModal(true);
  };

  const handleCloseModal = () => {
    setShowShareModal(false);
    setSelectedImage(null);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(selectedImage.imageUrl);
    alert("Link copied to clipboard!");
  };

  const handleShareImage = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this image!',
        text: 'Here is an amazing image I wanted to share with you.',
        url: selectedImage.imageUrl
      })
      .then(() => console.log('Image shared successfully'))
      .catch((error) => console.error('Error sharing image', error));
    } else {
      alert("Web Share API is not supported in this browser.");
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={image.imageUrl} alt={image.tag} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold">{image.tag}</h3>
              <p className="mb-2">Uploaded by: {image.uploaderName || 'Unknown'}</p>
              <p className="text-gray-500 text-sm">
                {formatDate(image.timestamp)}
              </p>
              <button 
                onClick={() => handleShareClick(image)} 
                className="mt-2 text-blue-500 hover:underline flex items-center"
              >
                <FontAwesomeIcon icon={faShareAlt} className="mr-2" />
                Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {showShareModal && selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Share Image</h3>
            <p className="mb-4">Choose how you want to share this image:</p>
            <button 
              onClick={handleShareImage} 
              className="w-full bg-blue-500 text-white p-2 rounded mb-2 hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faShareAlt} className="mr-2" />
              Share Image
            </button>
            <button 
              onClick={handleShareLink} 
              className="w-full bg-blue-500 text-white p-2 rounded mb-2 hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faCopy} className="mr-2" />
              Copy Image Link
            </button>
            <button 
              onClick={handleCloseModal} 
              className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayImages;
