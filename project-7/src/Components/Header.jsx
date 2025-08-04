import React, { useState } from "react";
import {Navbar,Form,FormControl,Nav,Dropdown,} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {FaShoppingCart,FaUser,FaSearch,FaPlus,FaSort,} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

import flipkartlogo from "../assets/flipkartlogo.svg";
import minutes from "../assets/minutes.png";
import mobiles from "../assets/mobiles.png";
import fashion from "../assets/fashion.png";
import electronics from "../assets/electronics.png";
import home from "../assets/home.png";
import tv from "../assets/tv.jpg"; 
import flight from "../assets/flight.png";
import beauty from "../assets/beauty.png";
import grocery from "../assets/grocery.png";

import "./Header.css";

const FlipkartHeader = () => {
  const categories = [
    { img: minutes, label: "Minutes" },
    { img: mobiles, label: "Mobiles & Tablets" },
    { img: fashion, label: "Fashion" },
    { img: electronics, label: "Electronics" },
    { img: home, label: "Home & Furniture" },
    { img: tv, label: "TVs & Appliances" },
    { img: flight, label: "Flight Bookings" },
    { img: beauty, label: "Beauty, Food.." },
    { img: grocery, label: "Grocery" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleSortChange = (sortValue) => {
    navigate(`/?sort=${sortValue}`);
  };

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        sticky="top"
        className="py-2 border-bottom shadow-sm full-width-navbar"
      >
        <div className="container-fluid px-5" style={{ maxWidth: "100%" }}>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-start me-3">
            <img src={flipkartlogo} alt="Flipkart" height={40} width={160} />
          </Navbar.Brand>

          <Form className="d-flex flex-grow-1 mx-3" onSubmit={handleSearchSubmit} style={{ maxWidth: "750px" }}>
            <div className="input-group w-100">
              <span className="input-group-text bg-white border-end-0">
                <FaSearch className="text-muted" />
              </span>
              <FormControl
                type="search"
                placeholder="Search for Products, Brands and More"
                className="border-start-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  backgroundColor: "#f0f5ff",
                  borderRadius: "0 5px 5px 0",
                  borderLeft: "none",
                }}
              />
            </div>
          </Form>

          <Nav className="ms-auto align-items-center gap-3">
            <Dropdown>
              <Dropdown.Toggle variant="light" className="fw-semibold text-dark d-flex align-items-center">
                <FaSort className="me-1" />
                Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange("title,asc")}>Name: A to Z</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("title,desc")}>Name: Z to A</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("price,asc")}>Price: Low to High</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("price,desc")}>Price: High to Low</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("category,asc")}>Category: A to Z</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("category,desc")}>Category: Z to A</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link as={Link} to="/add-product" className="d-flex align-items-center text-dark fw-semibold">
              <FaPlus className="me-1" />
              Add Product
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="d-flex align-items-center text-dark fw-semibold">
              <FaUser className="me-1" />
              Login <IoMdArrowDropdown className="ms-1" />
            </Nav.Link>
            <Nav.Link className="fw-semibold text-dark">Become a Seller</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center text-dark fw-semibold">
              <FaShoppingCart className="me-1" />
              Cart
            </Nav.Link>
          </Nav>
        </div>
      </Navbar>

      <div className="category-bar w-100">
        <div className="container-fluid px-5 d-flex justify-content-between flex-wrap text-center">
          {categories.map((item, index) => (
            <div
              key={index}
              style={{ width: "90px" }}
              className="d-flex flex-column align-items-center"
            >
              <img
                src={item.img}
                alt={item.label}
                width={63}
                height={63}
                style={{ objectFit: "contain" }}
              />
              <span style={{ fontSize: "14px", marginTop: "16px" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FlipkartHeader;
