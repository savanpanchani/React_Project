import { useState } from "react";
import { Container } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";
import BreakfastImg from "../../src/assets/Breakfast.webp";
import LunchImg from "../../src/assets/Lunch.webp";
import DinnerImg from "../../src/assets/Dinner.webp";
import DessertsImg from "../../src/assets/Desserts.webp";
import SnacksImg from "../../src/assets/Snacks.webp";
import BeveragesImg from "../../src/assets/Beverages.webp";
import "./RecipeCategorySlider.css";

const categories = [
  { img: BreakfastImg, text: "Breakfast", hasArrow: true },
  { img: LunchImg, text: "Lunch", hasArrow: true },
  { img: DinnerImg, text: "Dinner", hasArrow: true },
  { img: DessertsImg, text: "Desserts" },
  { img: SnacksImg, text: "Snacks", hasArrow: true },
  { img: BeveragesImg, text: "Beverages" },
];

const dropdownData = {
  Breakfast: ["Pancakes", "Omelette", "Smoothies", "Toast", "Cereals"],
  Lunch: ["Salads", "Rice Dishes", "Curries", "Sandwiches", "Wraps"],
  Dinner: ["Soups", "Pasta", "Grilled Dishes", "Casseroles", "Stews"],
  Snacks: ["Chips & Crisps", "Cookies", "Muffins", "Finger Foods", "Quick Bites"]
};

function RecipeCategorySlider() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="recipe-category-slider-wrapper">
      <Container>
        <div className="recipe-category-slider-box">
          {categories.map((item, index) => (
            <div
              key={index}
              className="recipe-slider-item"
              onMouseEnter={() => item.hasArrow && setHovered(item.text)}
              onMouseLeave={() => setHovered(null)}
            >
              <img src={item.img} alt={item.text} className="slider-img" />
              <div className="title-row">
                <span className="slider-title">{item.text}</span>
                {item.hasArrow && <FaChevronDown className="slider-icon" />}
              </div>

              {hovered === item.text && (
                <div
                  className="single-dropdown"
                  onMouseEnter={() => setHovered(item.text)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {dropdownData[item.text]?.map((sub, i) => (
                    <div key={i} className="dropdown-item">{sub}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default RecipeCategorySlider;
