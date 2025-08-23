import { Button, Container, Form, Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import generateUniqueId from "generate-unique-id";
import { useDispatch } from "react-redux";
import { uploadImage } from "../Services/Reducers/imageUpload";
import { addProductAsync } from "../Services/Actions/productAction";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    id: "",
    title: "",
    desc: "",
    unit: "",
    price: "",
    category: "",
    image: null, // ✅ use null instead of empty string
  };

  const [inputForm, setInputForm] = useState(initialState);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = generateUniqueId({ length: 6, useLetters: false });
    const formData = { ...inputForm, id };
    dispatch(addProductAsync(formData));
    navigate("/");
  };

  const handleFileChanged = async (e) => {
    if (!e.target.files[0]) return; // ✅ avoid empty upload
    let imagePath = await uploadImage(e.target.files[0]);

    setInputForm({
      ...inputForm,
      image: imagePath,
    });
  };

  return (
    <Container style={{ maxWidth: "700px", marginTop: "40px" }}>
      <Card className="shadow-sm p-4 border-0">
        <h2 className="mb-4 text-success text-center">Add New Product</h2>
        <Form onSubmit={handleSubmit}>
          {/* Product Name */}
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Fruit & Vegetables"
              name="title"
              value={inputForm.title}
              onChange={handleChanged}
              required
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Fresh & Cheap"
              name="desc"
              value={inputForm.desc}
              onChange={handleChanged}
              required
            />
          </Form.Group>

          {/* Price */}
          <Form.Group className="mb-3">
            <Form.Label>Price (₹)</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g., 129"
              name="price"
              value={inputForm.price}
              onChange={handleChanged}
              required
            />
          </Form.Group>

          {/* Unit */}
          <Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., 1 kg, 500 ml, 1 pack"
              name="unit"
              value={inputForm.unit}
              onChange={handleChanged}
              required
            />
          </Form.Group>

          {/* Category */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={inputForm.category}
              onChange={handleChanged}
              required
            >
              <option value="" disabled hidden>
                Select Category
              </option>
              <option value="paan">Paan</option>
              <option value="dairy">Dairy</option>
              <option value="fruits">Fruits</option>
              <option value="drinks">Drinks</option>
              <option value="snacks">Snacks</option>
              <option value="breakfast">Breakfast</option>
              <option value="sweet">Sweet</option>
              <option value="bakery">Bakery</option>
              <option value="tea">Tea</option>
              <option value="atta">Atta</option>
              <option value="masala">Masala</option>
              <option value="sauces">Sauces</option>
              <option value="meat">Meat</option>
              <option value="organic">Organic</option>
              <option value="baby">Baby</option>
              <option value="pharma">Pharma</option>
              <option value="cleaning">Cleaning</option>
              <option value="home">Home</option>
              <option value="personal">Personal</option>
              <option value="pet">Pet</option>
            </Form.Select>
          </Form.Group>

          {/* Image Upload */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChanged}
            />

            {/* ✅ Safe Preview */}
            {inputForm.image && (
              <img
                src={inputForm.image}
                alt="Preview"
                style={{
                  width: "120px",
                  marginTop: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            )}
          </Form.Group>

          {/* Submit */}
          <div className="d-grid mt-4">
            <Button
              type="submit"
              style={{ backgroundColor: "#03831f", border: "none" }}
              size="lg"
            >
              Add Product
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AddProduct;
