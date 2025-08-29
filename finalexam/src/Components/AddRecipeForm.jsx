import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import generateUniqueId from "generate-unique-id";
import { useDispatch, useSelector } from "react-redux";
// import { addRecipe } from "../Services/Actions//recipeActions";
import { addRecipeAsync } from "../Services/Actions/recipeActions";




import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { FaBookOpen } from "react-icons/fa";

const AddRecipeForm = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    id: "",
    title: "",
    ingredients: "",
    instructions: "",
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
    const id = generateUniqueId({ length: 6, useLetters: false });
    const formData = { ...inputForm, id };
    dispatch(addRecipe(formData));
    dispatch(addRecipeAsync(formData));
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/signIn");
    }
  }, [user, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card
        className="shadow-lg border-0 rounded-4"
        style={{
          maxWidth: "650px",
          width: "100%",
          background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
        }}
      >
        {/* Header */}
        <div
          className="text-center text-white p-4 rounded-top"
          style={{
            background: "linear-gradient(135deg, #ff512f, #dd2476)", // red-pink gradient for Recipe Book branding
          }}
        >
          <FaBookOpen size={40} className="mb-2" />
          <h2 className="fw-bold m-0">Add New Recipe</h2>
          <small>Fill the details to add into Recipe Book</small>
        </div>

        {/* Body */}
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            {/* Recipe Title */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Recipe Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={inputForm.title}
                onChange={handleChanged}
                placeholder="e.g., Chocolate Cake"
                className="rounded-3 shadow-sm"
                required
              />
            </Form.Group>

            {/* Ingredients */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Ingredients</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="ingredients"
                value={inputForm.ingredients}
                onChange={handleChanged}
                placeholder="e.g., 2 eggs, 200g flour, 100g sugar..."
                className="rounded-3 shadow-sm"
                required
              />
            </Form.Group>

            {/* Instructions */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="instructions"
                value={inputForm.instructions}
                onChange={handleChanged}
                placeholder="e.g., Mix flour and sugar, whisk eggs, bake at 180°C for 30 mins..."
                className="rounded-3 shadow-sm"
                required
              />
            </Form.Group>

            <Row>
              {/* Category */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={inputForm.category}
                    onChange={handleChanged}
                    className="rounded-3 shadow-sm"
                    required
                  >
                    <option value="" disabled hidden>
                      Select Category
                    </option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="dessert">Dessert</option>
                    <option value="snacks">Snacks</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Image URL */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={inputForm.image}
                    onChange={handleChanged}
                    placeholder="https://url..."
                    className="rounded-3 shadow-sm"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Submit */}
            <div className="d-grid">
              <Button
                type="submit"
                size="lg"
                className="rounded-pill fw-bold shadow"
                style={{
                  background: "linear-gradient(135deg, #ff9966, #ff5e62)",
                  border: "none",
                  color: "#fff",
                }}
              >
                🍴 Add Recipe
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddRecipeForm;
