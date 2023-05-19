import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidV4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCOJ9tBsAUohQG2bToxl92jvYDpLsEz1fw",
  authDomain: "library-a7da7.firebaseapp.com",
  projectId: "library-a7da7",
  storageBucket: "library-a7da7.appspot.com",
  messagingSenderId: "545688549958",
  appId: "1:545688549958:web:ec177e4d536882e281e847",
  measurementId: "G-10SMRC0871",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const handleUpload = async (image) => {
  const uuid = uuidV4();
  const metadata = {
    contentType: "image/jpeg",
  };
  const fileExtension = image.name.split(".").pop();
  const storageRef = ref(
    storage,
    "images/" + `${uuid}.${fileExtension}`
  );

  const uploadTask = await uploadBytesResumable(storageRef, image, metadata);
  const urlImage = await getDownloadURL(uploadTask.ref);
  return urlImage;
};

export { handleUpload };
