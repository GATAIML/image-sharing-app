import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const DisplayImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "images"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setImages(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="p-4 bg-[var(--background-color)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <img 
              src={image.imageUrl} 
              alt="uploaded" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-lg font-semibold text-[var(--text-color)]">Tag: {image.tag}</p>
              <p className="text-sm text-gray-600">Uploaded on: {formatDate(image.timestamp)}</p>
              <a 
                href={image.imageUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:underline mt-2 block"
              >
                Share Link
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayImages;
