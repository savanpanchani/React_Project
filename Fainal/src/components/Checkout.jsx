import React, { useState } from "react";
import {
  Container, Row, Col, Card, Button, Badge,
  ListGroup, Alert, Image, Form
} from "react-bootstrap";
import {
  ArrowLeft, ShieldCheck, Clock, Gift
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RecipeCheckoutPage = () => {
  const navigate = useNavigate();
  const selectedRecipes = useSelector((state) => state.cart.selectedRecipes); // adapted
  const [mealType, setMealType] = useState("Breakfast");
  const [deliveryAddress, setDeliveryAddress] = useState("Home - 123 Main St, Apt 4B, NY");

  const calculateTotal = () => {
    return selectedRecipes.reduce((acc, item) =>
      acc + (Number(item.price) * (item.quantity || 1)), 0);
  };

  const deliveryCharge = calculateTotal() > 500 ? 0 : 40;

  return (
    <Container className="my-4 recipe-checkout-page">
      <Row className="mb-4">
        <Col>
          <Button variant="outline-primary" onClick={() => navigate(-1)}>
            <ArrowLeft className="me-2" /> Back to Recipes
          </Button>
          <h2 className="mt-3 fw-bold">Confirm Your Recipe Selection</h2>
          <p className="text-muted">Review your selected recipes and delivery options</p>
        </Col>
      </Row>

      <Row>
        {/* Recipe Summary */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <h5 className="mb-0 flex-grow-1">Recipe Summary</h5>
                <Badge bg="light" text="dark" className="fs-6">
                  {selectedRecipes.length} {selectedRecipes.length === 1 ? "Recipe" : "Recipes"}
                </Badge>
              </div>

              <ListGroup variant="flush">
                {selectedRecipes.map((item) => (
                  <ListGroup.Item key={item.id} className="px-0 py-3">
                    <div className="d-flex">
                      <div className="me-3" style={{ width: "80px" }}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          className="border p-1"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.name}</h6>
                        <p className="text-muted small mb-1">{item.desc}</p>
                        <div className="d-flex justify-content-between">
                          <span className="text-primary fw-bold">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <span className="text-muted small">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          {/* Meal Type / Delivery Option */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <Clock className="text-primary me-2" size={20} />
                <h5 className="mb-0">Meal Type</h5>
              </div>

              <Form.Select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </Form.Select>

              <Button variant="outline-primary" size="sm" className="mt-3">
                + Add Custom Meal
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Total */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm sticky-top" style={{ top: "20px" }}>
            <Card.Body>
              <h5 className="mb-3">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({selectedRecipes.length} items)</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Fee</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="text-success">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-3 fw-bold fs-5">
                <span>Total Payable</span>
                <span>₹{(calculateTotal() + deliveryCharge).toLocaleString()}</span>
              </div>

              <Button variant="success" className="w-100 mb-3" onClick={() => navigate("/order-confirmed")}>
                CONFIRM & PAY
              </Button>

              <Alert variant="light" className="small">
                <div className="d-flex mb-2">
                  <ShieldCheck className="text-success me-2" />
                  <span>Safe and Secure Payments</span>
                </div>
                <div className="d-flex mb-2">
                  <Clock className="text-success me-2" />
                  <span>Preparation within 3-5 business days</span>
                </div>
              </Alert>
            </Card.Body>
          </Card>

          {/* Continue Browsing Recipes Card */}
          <Card className="border-0 shadow-sm mt-4">
            <Card.Body className="text-center">
              <Gift className="text-warning mb-3" size={40} />
              <h5>Want More Recipes?</h5>
              <p className="text-muted small mb-3">
                Continue browsing for more recipes to add to your meal plan
              </p>
              <Button
                variant="outline-primary"
                className="w-100"
                onClick={() => navigate("/")}
              >
                CONTINUE BROWSING
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeCheckoutPage;
