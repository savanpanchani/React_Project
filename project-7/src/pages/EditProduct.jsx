import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { getStorageData, setStorageData } from "../Services/storageData";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialState = {
    id: "",
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
    let data = getStorageData();
    let updateData = data.map((prod) =>
      prod.id == id ? inputForm : prod
    );
    setStorageData(updateData);
    navigate("/");
  };

  useEffect(() => {
    let data = getStorageData();
    let singleRec = data.find((product) => product.id == id);
    setInputForm(singleRec || initialState);
  }, [id]);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card style={{ minWidth: 400, maxWidth: 500, width: "100%", boxShadow: "0 2px 8px rgba(40,116,240,0.08)" }}>
        <Card.Body>
          <h2 className="mb-4 text-center" style={{ color: "#2874f0", fontWeight: 700 }}>Edit Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={inputForm.title}
                onChange={handleChanged}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="desc"
                value={inputForm.desc}
                onChange={handleChanged}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
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
                name="image"
                value={inputForm.image}
                onChange={handleChanged}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              style={{
                background: "#2874f0",
                border: "none",
                width: "100%",
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
            >
              Update Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProduct;