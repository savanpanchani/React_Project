import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Alert, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInAsync } from "../../Services/Actions/userAction";
import logo from "../../assets/images/recipe-logo.png"; 
import "./Auth.css";  // ✅ custom styles

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error: reduxError, isLoading } = useSelector((state) => state.userReducer);

  const initialState = { email: "", password: "" };
  const [inputForm, setInputForm] = useState(initialState);
  const [validationError, setValidationError] = useState("");
  const [localError, setLocalError] = useState("");

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (inputForm.password.length < 6) {
      setValidationError("Password must be at least 6 characters long.");
      return;
    }
    setValidationError("");

    try {
      dispatch(signInAsync(inputForm));
    } catch (err) {
      setLocalError("Failed to connect to server.");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="auth-page">
      <Container style={{ maxWidth: "500px" }}>
        <Row className="justify-content-center">
          <Col>
            <Card className="auth-card shadow-lg p-4 rounded-4">
              {/* Logo */}
              <div className="text-center mb-3">
                <img src={logo} alt="RecipeBook" height={60} />
              </div>

              <h3 className="text-center mb-2 fw-bold text-dark">Welcome Back!</h3>
              <p className="text-center text-muted mb-4">
                Sign in to continue to <strong>Recipe Book</strong>
              </p>

              {/* Alerts */}
              {localError && <Alert variant="danger">{localError}</Alert>}
              {reduxError && <Alert variant="danger">{reduxError}</Alert>}
              {validationError && <Alert variant="warning">{validationError}</Alert>}

              {/* Form */}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={inputForm.email}
                    onChange={handleChanged}
                    required
                    autoComplete="email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password (min 6 characters)"
                    name="password"
                    value={inputForm.password}
                    onChange={handleChanged}
                    required
                    autoComplete="current-password"
                  />
                </Form.Group>

                <Button
                  variant="success"
                  type="submit"
                  disabled={isLoading}
                  className="w-100 py-2 fw-semibold shadow-sm auth-btn"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </Form>

              {/* Bottom Links */}
              <div className="text-center mt-3">
                <span className="text-muted">Don't have an account? </span>
                <Link to="/signup" className="fw-bold text-decoration-none text-success">
                  Sign Up
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;
