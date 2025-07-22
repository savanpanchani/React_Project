import "./App.css";
import { Route, Routes } from "react-router";
import Header from "./Components/Header";
import Home from "./pages/Home";
import AddProduct from "./Components/AddProduct.jsx";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
}

export default App;