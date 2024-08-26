import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDrbmdbqiH4RfnNJ9EhQg2ewiJy4Y4S7jA",
    authDomain: "image-sharing-app-61874.firebaseapp.com",
    projectId: "image-sharing-app-61874",
    storageBucket: "image-sharing-app-61874.appspot.com",
    messagingSenderId: "993357715095",
    appId: "1:993357715095:web:d0cf4e0028da423f337bd2",
    measurementId: "G-ZYEJPVZVY8"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
export const auth = getAuth(app);

export { storage, db};
