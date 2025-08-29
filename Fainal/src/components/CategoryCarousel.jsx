import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import CategoryCarousel from './CategoryCarousel';
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipesByCategory,
  deleteRecipe,
} from "../redux/Actions/recipeActions";
import { fetchRecipesByCategory, deleteRecipe } from "../redux/Actions/recipeActions";

// import "./RecipeCategoryCarousel.css";
const CategoryCarousel = ({ title, category }) => {
  // component code here
};


const RecipeCategoryCarousel = ({ title, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visibleIndex, setVisibleIndex] = useState(0);
  const itemsPerPage = 6;
  const maxItems = 12;

  const recipesByCategory = useSelector(
    (state) => state.recipeCategory.recipesByCategory || {}
  );

  const categoryRecipes = recipesByCategory[category] || [];
  const visibleRecipes = categoryRecipes.slice(
    visibleIndex,
    visibleIndex + itemsPerPage
  );

  useEffect(() => {
    dispatch(fetchRecipesByCategory(category));
  }, [dispatch, category]);

  const scrollRight = () => {
    if (visibleIndex + itemsPerPage < categoryRecipes.length) {
      setVisibleIndex((prev) => prev + 1);
    }
  };

  const scrollLeft = () => {
    if (visibleIndex > 0) {
      setVisibleIndex((prev) => prev - 1);
    }
  };

  const handleEdit = (recipe) => {
    navigate(`/add-recipe/${recipe.id}`, { state: { recipe } });
  };

  const handleDelete = (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(recipeId)).then(() => {
        dispatch(fetchRecipesByCategory(category));
      });
    }
  };

  return (
    <div className="recipe-carousel-wrapper">
      <h2 className="carousel-title">{title}</h2>

      <div className="carousel-container">
        {visibleIndex > 0 && (
          <button className="scroll-btn left" onClick={scrollLeft}>
            &#8592;
          </button>
        )}

        <div className="recipe-carousel-inner">
          <Row className="recipe-carousel">
            {visibleRecipes.map((recipe) => (
              <Col key={recipe.id} xs={6} sm={4} md={3} lg={2}>
                <div className="recipe-card">
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="recipe-link"
                  >
                    <div className="recipe-image-container">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="recipe-image"
                      />
                    </div>
                    <div className="recipe-details">
                      <p className="recipe-name">{recipe.name}</p>
                      <div className="action-links">
                        <button
                          className="action-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEdit(recipe);
                          }}
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          className="action-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(recipe.id);
                          }}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {visibleIndex + itemsPerPage < Math.min(categoryRecipes.length, maxItems) && (
          <button className="scroll-btn right" onClick={scrollRight}>
            &#8594;
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCategoryCarousel;
