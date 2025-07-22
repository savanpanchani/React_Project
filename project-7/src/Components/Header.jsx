import React from "react";
import { Navbar, Container, Form, FormControl, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

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
  const handelform = () => {
    console.log("Add Product button clicked");
  };

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

  return (
    <>

      <Navbar
        bg="light"
        variant="dark"
        expand="lg"
        sticky="top"
        className="py-2 border-bottom shadow-sm"
        style={{ zIndex: 1030 }}
      >
        <Container style={{ maxWidth: "1600px" }}>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-start me-3">
            <img src={flipkartlogo} alt="Flipkart" height={40} width={160} className="me-1" />
          </Navbar.Brand>

          <Form className="d-flex flex-grow-1 mx-3" style={{ maxWidth: "772px" }}>
            <div className="input-group w-100">
              <span className="input-group-text bg-white border-end-0">
                <FaSearch className="text-muted" />
              </span>
              <FormControl
                type="search"
                placeholder="Search for Products, Brands and More"
                className="border-start-0"
                style={{
                  backgroundColor: "#f0f5ff",
                  borderRadius: "0 5px 5px 0",
                  borderLeft: "none",
                }}
              />
            </div>
          </Form>

         <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link as={Link} to="/add-product" className="d-flex align-items-center text-dark fw-semibold">
              <FaPlus className="me-1" />
              Add Product
            </Nav.Link>

            <Nav.Link as={Link} to="/login" className="d-flex align-items-center text-dark fw-semibold">
              <FaUser className="me-1" />
              Login <IoMdArrowDropdown className="ms-1" />
            </Nav.Link>

            <Nav.Link className="seller-link fw-semibold text-dark">Become a Seller</Nav.Link>

            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center text-dark fw-semibold">
              <FaShoppingCart className="me-1" />
              Cart
            </Nav.Link>
          </Nav>

        </Container>
      </Navbar>

      
      <div style={{ backgroundColor: "#fff", padding: "10px 0", borderBottom: "1px solid #ddd" }}>
        <Container
          fluid
          style={{ maxWidth: "1600px" }}
          className="d-flex justify-content-between flex-wrap text-center"
        >
          {categories.map((item, index) => (
            <div key={index} style={{ width: "90px" }} className="d-flex flex-column align-items-center">
              <img
                src={item.img}
                alt={item.label}
                width={63}
                height={63}
                style={{ objectFit: "contain" }}
              />
              <span style={{ fontSize: "14px", marginTop: "16px" }}>{item.label}</span>
            </div>
          ))}
        </Container>
      </div>
    </>
  );
};

export default FlipkartHeader;
