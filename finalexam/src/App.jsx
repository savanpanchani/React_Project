import { useState } from "react";
import { Routes, Route } from "react-router-dom"; 
import "./App.css";

import ZeptoHeader from "./Components/Header";
import AddRecipeForm from "./Components/AddRecipeForm";
import EditRecipe from "./Components/EditRecipe";
import Home from "./Components/Home";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <ZeptoHeader onSearch={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/add-Recipe" element={<AddRecipeForm />} />
        <Route path="/edit-product/:id" element={<EditRecipe />} />
        <Route path="/login" element={<SignIn />} />  
        <Route path="/signup" element={<SignUp />} />  
        <Route path="*" element={<h2 className="text-center mt-5">404 Page Not Found</h2>} />
      </Routes>
    </>
  );
}

export default App;
