import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateRecipe, fetchRecipes } from '../redux/Actions/recipeActions';
import { Form, Button } from 'react-bootstrap';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipes = useSelector((state) => state.recipes.list);
  const recipe = recipes.find((r) => r.id === parseInt(id));
  const [title, setTitle] = useState(recipe?.title || '');
  const [ingredients, setIngredients] = useState(recipe?.ingredients || '');
  const [category, setCategory] = useState(recipe?.category || '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!recipe) dispatch(fetchRecipes());
  }, [recipe, dispatch]);

  const handleUpdate = () => {
    dispatch(updateRecipe(recipe.id, { title, ingredients, category }));
    navigate('/');
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="container my-4">
      <h2>Edit Recipe</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control value={category} onChange={(e) => setCategory(e.target.value)} />
        </Form.Group>
        <Button onClick={handleUpdate}>Update Recipe</Button>
      </Form>
    </div>
  );
};

export default RecipeDetails;
