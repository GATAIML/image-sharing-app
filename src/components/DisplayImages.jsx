import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const DisplayImages = () => {
  const [images, setImages] = useState([]);

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={image.imageUrl} alt={image.tag} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold">{image.tag}</h3>
            <p>Uploaded by: {image.uploaderName || 'Unknown'}</p>
            <p className="text-gray-500 text-sm">
              {new Date(image.timestamp.seconds * 1000).toLocaleDateString("en-US")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayImages;
