// src/components/TopCategoryBar.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import './TopCategoryBar.css';

// Import your recipe category images
import breakfastImg from '../assets/breakfast.webp';
import lunchImg from '../assets/lunch.webp';
import dinnerImg from '../assets/dinner.webp';
import dessertImg from '../assets/dessert.webp';
import beveragesImg from '../assets/beverages.webp';
import snacksImg from '../assets/snacks.webp';
import veganImg from '../assets/vegan.webp';
import quickMealsImg from '../assets/quickMeals.webp';
import festiveImg from '../assets/festive.webp';

const categories = [
  { name: "Breakfast", img: breakfastImg },
  { name: "Lunch", img: lunchImg },
  { name: "Dinner", img: dinnerImg },
  { name: "Desserts", img: dessertImg },
  { name: "Beverages", img: beveragesImg },
  { name: "Snacks", img: snacksImg },
  { name: "Vegan", img: veganImg },
  { name: "Quick Meals", img: quickMealsImg },
  { name: "Festive", img: festiveImg },
];

const TopCategoryBar = () => {
  return (
    <div className="top-category-bar py-2 bg-white border-bottom">
      <Container className="d-flex justify-content-around align-items-center flex-wrap">
        {categories.map((cat, idx) => (
          <div key={idx} className="text-center category-item">
            <img src={cat.img} alt={cat.name} className="category-img" />
            <p className="small mt-2">{cat.name}</p>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default TopCategoryBar;
