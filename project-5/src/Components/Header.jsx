import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import logo from '../assets/img/header.png';
import './Header.css';

const Header = () => {
  return (
    <Navbar expand="lg" className="sticky-top" style={{ backgroundColor: '#121619' }}>
      <Container fluid className="px-4" style={{ maxWidth: '1200px' }}>
        

        <Navbar.Brand href="#">
          <img src={logo} alt="header-logo" width={150} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ms-auto bg-white" />

        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">

          <Nav className="index-header mx-auto text-center">
            <Nav.Link href="#home" className="nav-link">Home</Nav.Link>

            <NavDropdown title="Menu" className="nav-link-custom dropdown-custom">
              <NavDropdown.Item href="#menu-list">Menu List</NavDropdown.Item>
              <NavDropdown.Item href="#menu-grid">Menu Grid</NavDropdown.Item>
              <NavDropdown.Item href="#special-pizza">Special Pizza</NavDropdown.Item>
              <NavDropdown.Item href="#all-pizza">All Pizza</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Blog" className="nav-link-custom dropdown-custom">
              <NavDropdown.Item href="#blog-left">Blog Leftside</NavDropdown.Item>
              <NavDropdown.Item href="#blog-right">Blog Rightside</NavDropdown.Item>
              <NavDropdown.Item href="#blog-detail">Blog Detail</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#reservation" className="nav-link">Reservation</Nav.Link>

            <NavDropdown title="Pages" className="nav-link-custom dropdown-custom">
              <NavDropdown.Item href="#about-us">About Us</NavDropdown.Item>
              <NavDropdown.Item href="#contact">Contact</NavDropdown.Item>
              <NavDropdown.Item href="#shop-grid">Shop Grid</NavDropdown.Item>
              <NavDropdown.Item href="#404">404</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <div className="header-right d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 mt-3 mt-lg-0">
            <div className="d-flex align-items-center text-white phone-icon-hover">
              <IoCallOutline className="me-2 header-icon" />
              +91 123 456 789
            </div>
            <div className="d-flex align-items-center text-white">
              <HiOutlineShoppingBag className="me-2 header-icon" />
              0 items - <span className="ms-1">$0.00</span>
            </div>
            <button className="order-button">
              ORDER ONLINE
            </button>
          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
