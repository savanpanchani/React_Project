import { Container, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "./Header.css";
import logo from "../assets/logo.svg";

const Header = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    dispatch({ type: "SEARCH_PRODUCT", payload: search });
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm py-3 sticky-top">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="fw-bold text-success d-flex align-items-center">
          <img
            src={logo}
            alt="Blinkite Logo"
            height="40"
            className="me-2"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Form
            className="d-flex mx-auto header-search-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <FormControl
              type="search"
              placeholder="Search for products"
              className="me-2 rounded-pill px-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "400px", maxWidth: "100%" }}
            />
            <Button variant="success" type="submit" className="rounded-pill px-4">
              Search
            </Button>
          </Form>

          <Nav>
            <Nav.Link
              as={Link}
              to="/add-product"
              className="fw-semibold text-success"
            >
              + Add Product
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
