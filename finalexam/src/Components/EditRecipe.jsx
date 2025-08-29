import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeAsync, updateRecipeAsync } from "../Services/Actions/recipeActions";
import { Form, Button, Card, Container, Row, Col, Spinner } from "react-bootstrap";

const EditRecipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipe, isLoading } = useSelector((state) => state.recipeReducer || {});

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
    setInputForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRecipeAsync(inputForm));
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      dispatch(getRecipeAsync(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (recipe && Object.keys(recipe).length > 0) {
      setInputForm({
        id: recipe.id || "",
        title: recipe.title || "",
        ingredients: recipe.ingredients || "",
        instructions: recipe.instructions || "",
        category: recipe.category || "",
        image: recipe.image || "",
      });
    }
  }, [recipe]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" variant="success" />
        <span className="ms-2 fw-bold text-success">Loading recipe...</span>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card
            className="shadow-lg border-0 rounded-4"
            style={{
              background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            }}
          >
            <Card.Body className="p-5">
              <h2 className="text-center mb-4 fw-bold text-dark">
                ✏️ Edit Recipe
              </h2>
              <p className="text-center text-muted mb-4">
                Update your recipe details below and click save
              </p>

              <Form onSubmit={handleSubmit}>
                {/* Recipe Title */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Recipe Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter recipe title"
                    value={inputForm.title}
                    onChange={handleChanged}
                    className="rounded-pill shadow-sm"
                  />
                </Form.Group>

                {/* Ingredients */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Ingredients</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="ingredients"
                    placeholder="Enter ingredients"
                    value={inputForm.ingredients}
                    onChange={handleChanged}
                    className="rounded-3 shadow-sm"
                  />
                </Form.Group>

                {/* Instructions */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="instructions"
                    placeholder="Enter instructions"
                    value={inputForm.instructions}
                    onChange={handleChanged}
                    className="rounded-3 shadow-sm"
                  />
                </Form.Group>

                {/* Category */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={inputForm.category}
                    onChange={handleChanged}
                    className="rounded-pill shadow-sm"
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

                {/* Image */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Recipe Image</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    placeholder="Paste image URL"
                    value={inputForm.image}
                    onChange={handleChanged}
                    className="rounded-pill shadow-sm"
                  />
                  {inputForm.image && (
                    <div className="text-center mt-3">
                      <img
                        src={inputForm.image}
                        alt="Preview"
                        className="img-thumbnail shadow"
                        style={{
                          width: "140px",
                          height: "140px",
                          borderRadius: "15px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </Form.Group>

                {/* Submit */}
                <div className="d-grid mt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-pill shadow fw-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
                      border: "none",
                    }}
                  >
                    🚀 Update Recipe
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditRecipe;
