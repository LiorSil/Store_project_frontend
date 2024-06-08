import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import HomePage from "./Pages/Home/HomePage";
import ErrorPage from "./Pages/Error/ErrorPage";
import "./firebaseConfig";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const App = () => {
  const db = getFirestore();
  const addDocToCollection = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      alert("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home/*" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
