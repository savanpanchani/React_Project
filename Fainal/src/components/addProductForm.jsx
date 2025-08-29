import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipeById,
  addNewRecipe,
  updateRecipeData,
} from "../redux/Actions/recipeActions";
import "./addRecipeForm.css";

const RecipeBookAddEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(id);

  const recipeFromStore = useSelector((state) =>
    state.recipes.recipes.find((r) => r.id === Number(id))
  );

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    ingredients: "",
    instructions: "",
    image: "",
  });

  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Dessert",
    "Beverages",
  ];

  // Fetch recipe data if editing
  useEffect(() => {
    if (isEditMode && !recipeFromStore) {
      dispatch(fetchRecipeById(id));
    }
  }, [dispatch, id, isEditMode, recipeFromStore]);

  // Populate form when recipe data is available
  useEffect(() => {
    if (isEditMode && recipeFromStore) {
      setFormData(recipeFromStore);
    }
  }, [recipeFromStore, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(updateRecipeData(id, formData))
        .then(() => {
          alert("Recipe updated successfully!");
          navigate("/");
        })
        .catch((err) => console.error(err));
    } else {
      dispatch(addNewRecipe(formData))
        .then(() => {
          alert("Recipe added successfully!");
          navigate("/");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Container className="add-recipe-form mt-4">
      <div className="d-flex justify-content-center mb-4">
        <h2 className="form-title">{isEditMode ? "Edit Recipe" : "Add New Recipe"}</h2>
      </div>

      <Form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-header">
          {isEditMode ? "EDIT RECIPE DETAILS" : "ADD NEW RECIPE"}
        </div>

        <div className="form-body p-4">
          <Row className="mb-4">
            <Col md={6} className="mb-3 mb-md-0">
              <Form.Group controlId="recipeName">
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter recipe name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="recipeCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4" controlId="recipeIngredients">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="List ingredients separated by commas"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="recipeInstructions">
            <Form.Label>Instructions</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Enter cooking instructions"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="recipeImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste image URL"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="submit-btn">
              {isEditMode ? "UPDATE RECIPE" : "ADD RECIPE"}
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default RecipeBookAddEdit;
