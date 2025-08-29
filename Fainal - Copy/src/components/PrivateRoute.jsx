import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { BsBookmark, BsThreeDotsVertical } from 'react-icons/bs';
import { Button, NavDropdown } from 'react-bootstrap';
import logo from '../assets/recipe-logo.png'; // your recipe book logo
import './Header.css';

const Header = ({ recipes = [], setFiltered = () => {} }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);

    const filtered = recipes.filter((item) =>
      item.name.toLowerCase().includes(keyword)
    );
    setFiltered(filtered);

    if (window.location.pathname !== '/') navigate('/');
  };

  return (
    <header className="header-container p-3">
      <div className="header-top d-flex justify-content-between align-items-center container">
        {/* Logo & Search */}
        <div className="d-flex align-items-center right-side gap-3">
          <Link to="/">
            <img src={logo} alt="RecipeBook Logo" width="100" />
          </Link>
          <div className="search-bar d-flex align-items-center">
            <IoSearchOutline className="search-icon fs-5" />
            <input
              className="search-input"
              placeholder="Search for recipes, cuisines, ingredients..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-4">
          {/* Login Dropdown */}
          <NavDropdown title="Login" id="login-dropdown" menuVariant="light">
            <NavDropdown.Item>
              <span className="fw-semibold">New User? </span>
              <Link to="#" className="ms-2 text-primary">Sign Up</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>My Profile</NavDropdown.Item>
            <NavDropdown.Item>My Recipes</NavDropdown.Item>
            <NavDropdown.Item>Favorites</NavDropdown.Item>
            <NavDropdown.Item>Settings</NavDropdown.Item>
          </NavDropdown>

          {/* Saved Recipes */}
          <Link to="/saved" className="text-dark text-decoration-none d-flex align-items-center">
            <BsBookmark className="me-1" />
            Saved
          </Link>

          {/* Add Recipe */}
          <Link to="/add-recipe">
            <Button size="sm" className="btn btn-warning fw-semibold text-dark">+ Add Recipe</Button>
          </Link>

          {/* More Icon */}
          <BsThreeDotsVertical className="fs-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;
