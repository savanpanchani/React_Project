import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const RecipeBookFooter = () => {
  return (
    <footer className="recipebook-footer text-light">
      <Container fluid className="top-footer py-4 px-md-5">
        <Row className="gx-md-5">
          <Col md={2} sm={6} className="mb-4">
            <h6>ABOUT</h6>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">About RecipeBook</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog & Stories</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </Col>

          <Col md={2} sm={6} className="mb-4">
            <h6>RECIPES</h6>
            <ul>
              <li><a href="#">Breakfast</a></li>
              <li><a href="#">Lunch</a></li>
              <li><a href="#">Dinner</a></li>
              <li><a href="#">Snacks</a></li>
              <li><a href="#">Desserts</a></li>
            </ul>
          </Col>

          <Col md={2} sm={6} className="mb-4">
            <h6>HELP</h6>
            <ul>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </Col>

          <Col md={2} sm={6} className="mb-4">
            <h6>POLICIES</h6>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </Col>

          <Col md={2} className="mb-4">
            <h6>Mail Us:</h6>
            <div className="footer-address">
              RecipeBook Pvt. Ltd.<br />
              123 Culinary Street,<br />
              Food City, FC 12345, India
            </div>
            <h6 className="mt-3">Social:</h6>
            <div className="social-icons">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter"></i>
              <i className="bi bi-youtube"></i>
              <i className="bi bi-instagram"></i>
            </div>
          </Col>

          <Col md={2} className="mb-4">
            <h6>Registered Office:</h6>
            <div className="footer-address">
              RecipeBook Pvt. Ltd.<br />
              123 Culinary Street, Food City, FC 12345, India<br />
              CIN: U12345FC2025PTC000001<br />
              Telephone: <a href="tel:0123456789">01234-56789</a>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="footer-divider"></div>

      <Container className="bottom-footer py-3 px-md-5">
        <Row className="align-items-center">
          <Col md={3} sm={6} className="mb-2 mb-md-0"><i className="bi bi-book me-2"></i>Submit a Recipe</Col>
          <Col md={2} sm={6} className="mb-2 mb-md-0"><i className="bi bi-bullhorn me-2"></i>Advertise</Col>
          <Col md={2} sm={6} className="mb-2 mb-md-0"><i className="bi bi-gift me-2"></i>Gift Subscriptions</Col>
          <Col md={2} sm={6} className="mb-2 mb-md-0"><i className="bi bi-question-circle me-2"></i>Help Center</Col>
          <Col md={3} className="text-md-end mt-2 mt-md-0">
            <div>© 2025 <span className="text-warning">RecipeBook.com</span></div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default RecipeBookFooter;
