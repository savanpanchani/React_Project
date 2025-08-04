import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import generateUniqueId from "generate-unique-id";
import { useDispatch } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { addProduct } from "../Services/Actions/productAction";
import "./AddProduct.css";

const AddProduct = () => {
  const dispatch = useDispatch();
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
  const [errors, setErrors] = useState({});

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!inputForm.title.trim()) newErrors.title = "Title is required";
    if (!inputForm.desc.trim()) newErrors.desc = "Description is required";
    if (!inputForm.price) newErrors.price = "Price is required";
    if (!inputForm.category || inputForm.category === "Select Category")
      newErrors.category = "Please select a valid category";
    if (!inputForm.image.trim()) newErrors.image = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const id = generateUniqueId({ length: 6, useLetters: false });
    inputForm.id = id;
    dispatch(addProduct(inputForm));
    navigate("/");
  };

  return (
    <Container className="add-product-container">
      <h1 className="add-product-title">🛒 Add New Product</h1>

      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Title</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter product title"
              name="title"
              value={inputForm.title}
              onChange={handleChanged}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Description</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter product description"
              name="desc"
              value={inputForm.desc}
              onChange={handleChanged}
              isInvalid={!!errors.desc}
            />
            <Form.Control.Feedback type="invalid">
              {errors.desc}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Price (₹)</Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="price"
              value={inputForm.price}
              onChange={handleChanged}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Category</Form.Label>
          <Col sm="10">
            <Form.Select
              name="category"
              value={inputForm.category}
              onChange={handleChanged}
              isInvalid={!!errors.category}
            >
              <option>Select Category</option>
              <option value="Fresh Vegetables">Fresh Vegetables</option>
              <option value="Fresh Fruits">Fresh Fruits</option>
              <option value="Cold Drinks & Juices">Cold Drinks & Juices</option>
              <option value="Dairy, Bread & Eggs">Dairy, Bread & Eggs</option>
              <option value="Snacks & Munchies">Snacks & Munchies</option>
              <option value="Ice Creams & Frozen Desserts">Ice Creams & Frozen Desserts</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Image URL</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Paste image URL"
              name="image"
              value={inputForm.image}
              onChange={handleChanged}
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <div className="text-end">
          <Button variant="success" type="submit">
            <IoMdAdd /> Add Product
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddProduct;
