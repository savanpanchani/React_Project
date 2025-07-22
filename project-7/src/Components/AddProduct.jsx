import generateUniqueId from "generate-unique-id";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Container, Form, Card } from "react-bootstrap";
import { getStorageData, setStorageData } from "../Services/storageData";
import "./AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const initialState = {
    title: "",
    desc: "",
    price: "",
    category: "",
    image: "",
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
    let id = generateUniqueId({ length: 6, useLetters: false });
    const newProduct = { ...inputForm, id };
    let data = getStorageData();
    data.push(newProduct);
    setStorageData(data);
    navigate("/");
  };

  return (
    <Container className="add-product-page">
      <Card className="add-product-card">
        <Card.Body>
          <h4 className="add-product-title">Add Product</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Title"
                name="title"
                value={inputForm.title}
                onChange={handleChanged}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Short product description"
                name="desc"
                value={inputForm.desc}
                onChange={handleChanged}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                name="price"
                value={inputForm.price}
                onChange={handleChanged}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={inputForm.category}
                onChange={handleChanged}
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Mobiles">Mobiles</option>
                <option value="Appliances">Appliances</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Paste image URL"
                name="image"
                value={inputForm.image}
                onChange={handleChanged}
                required
              />
            </Form.Group>

            <Button type="submit" className="add-product-btn">
              + Add Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProduct;
