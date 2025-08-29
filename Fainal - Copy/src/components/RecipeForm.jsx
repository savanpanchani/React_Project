import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../redux/Actions/recipeActions';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !ingredients) return alert('Title and ingredients are required');
    dispatch(addRecipe({ title, ingredients, category }));
    navigate('/');
  };

  return (
    <div className="container my-4">
      <h2>Add Recipe</h2>
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit">Add Recipe</Button>
      </Form>
    </div>
  );
};

export default RecipeForm;
