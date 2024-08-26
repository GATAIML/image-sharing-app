import { useState, useEffect } from "react";
import { storage, db, auth } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, updateProfile } from "firebase/auth";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [tag, setTag] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [previousTags, setPreviousTags] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploaderName, setUploaderName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      const querySnapshot = await getDocs(collection(db, "images"));
      const tags = new Set();
      querySnapshot.forEach((doc) => {
        tags.add(doc.data().tag);
      });
      setPreviousTags(Array.from(tags));
    };

    fetchTags();

    onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        setUploaderName(user.displayName);
      }
    });
  }, []);

  const handleUpload = async () => {
    if (image == null || tag.trim() === "") return;

    if (!uploaderName.trim()) {
      alert("Please enter your name.");
      return;
    }

    setUploading(true);

    try {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "images"), {
        imageUrl,
        tag,
        uploaderName,
        timestamp: serverTimestamp(),
      });

      setImage(null);
      setTag("");
      setUploadSuccess(true);

      // Redirect to gallery after 2 seconds
      setTimeout(() => {
        navigate('/gallery');
      }, 2000);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    setTag(value);

    if (value.length > 0) {
      const filteredSuggestions = previousTags.filter(tag =>
        tag.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--background-color)] p-4">
      <div className="bg-[var(--secondary-color)] p-6 rounded-lg shadow-md w-full max-w-md border border-gray-300">
        <h2 className="text-2xl font-semibold text-[var(--text-color)] mb-4 text-center">Upload Image</h2>
        
        <div className="mb-4 w-full flex flex-col items-center">
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
            accept="image/*"
            className="hidden"
            id="file-upload"
          />
          <label 
            htmlFor="file-upload" 
            className="text-sm text-[var(--text-color)] cursor-pointer border border-dashed border-gray-400 rounded-lg p-4 w-full text-center mb-2"
          >
            Choose an Image
          </label>

          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
            accept="image/*" 
            capture="environment"
            className="hidden"
            id="camera-upload"
          />
          <label 
            htmlFor="camera-upload" 
            className="text-sm text-[var(--text-color)] cursor-pointer border border-dashed border-gray-400 rounded-lg p-4 w-full text-center"
          >
            Take a Photo
          </label>

          {image && (
            <div className="mt-4 w-full flex justify-center">
              <img 
                src={URL.createObjectURL(image)} 
                alt="Selected preview" 
                className="max-w-full h-auto rounded-md"
              />
            </div>
          )}
        </div>

        <input 
          type="text" 
          value={uploaderName}
          onChange={(e) => setUploaderName(e.target.value)}
          placeholder="Enter your name"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />

        <input 
          type="text" 
          value={tag}
          onChange={handleTagChange}
          placeholder="Enter a tag"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />

        {suggestions.length > 0 && (
          <ul className="bg-white border border-gray-300 rounded p-2 mb-4">
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                className="cursor-pointer p-1 hover:bg-gray-100"
                onClick={() => setTag(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        <button 
          onClick={handleUpload} 
          className="w-full bg-[var(--primary-color)] text-white p-2 rounded hover:bg-blue-700 transition duration-200 mb-4"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        {uploading && (
          <div className="w-full flex justify-center">
            <div className="loader"></div>
          </div>
        )}

        {uploadSuccess && (
          <div className="w-full flex justify-center mt-4">
            <div className="bg-green-500 text-white p-2 rounded">
              Uploaded successfully!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
