import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidV4 } from "uuid";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_APIKEY,
  authDomain: import.meta.env.REACT_APP_AUTHDOMAIN,
  projectId: import.meta.env.REACT_APP_PROJECTID,
  storageBucket: import.meta.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.REACT_APP_MESSAGINGSENDERID,
  appId: import.meta.env.REACT_APP_APPID,
  measurementId: import.meta.env.REACT_APP_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const handleUpload = async (image) => {
  const uuid = uuidV4();
  const metadata = {
    contentType: "image/jpeg",
  };
  const fileExtension = image.name.split(".").pop();
  const storageRef = ref(storage, "images/" + `${uuid}.${fileExtension}`);

  const uploadTask = await uploadBytesResumable(storageRef, image, metadata);
  const urlImage = await getDownloadURL(uploadTask.ref);
  return urlImage;
};

export { handleUpload };
