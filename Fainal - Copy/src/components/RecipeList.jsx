import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes, deleteRecipe } from '../redux/Actions/recipeActions';

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.list);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteRecipe(id));
    }
  };

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h4>{recipe.title}</h4>
          <button onClick={() => handleDelete(recipe.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
