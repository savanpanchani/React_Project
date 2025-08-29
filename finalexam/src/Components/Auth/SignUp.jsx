import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Alert, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerAsync } from "../../Services/Actions/userAction";
import logo from "../../assets/images/recipe-logo.png"; 
import "./Auth.css";  // ✅ shared with SignIn

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, isCreated } = useSelector((state) => state.userReducer);

  const initialState = {
    email: "",
    password: "",
    cpass: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [validationError, setValidationError] = useState("");

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputForm.password.length < 6) {
      setValidationError("Password must be at least 6 characters long.");
      return;
    }
    if (inputForm.password !== inputForm.cpass) {
      setValidationError("Passwords do not match.");
      return;
    }

    setValidationError("");
    dispatch(registerAsync(inputForm));
  };

  useEffect(() => {
    if (isCreated) {
      navigate("/signin");
    }
  }, [isCreated, navigate]);

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

              <h3 className="text-center mb-2 fw-bold text-dark">Create Your Account</h3>
              <p className="text-center text-muted mb-4">
                Join <strong>Recipe Book</strong> and start sharing your recipes 🍲
              </p>

              {/* Alerts */}
              {error && <Alert variant="danger">{error}</Alert>}
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
                    autoComplete="new-password"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formConfirmPassword">
                  <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Re-enter password"
                    name="cpass"
                    value={inputForm.cpass}
                    onChange={handleChanged}
                    required
                    autoComplete="new-password"
                  />
                </Form.Group>

                <Button
                  variant="success"
                  type="submit"
                  className="w-100 py-2 fw-semibold shadow-sm auth-btn"
                >
                  Sign Up
                </Button>
              </Form>

              {/* Bottom link */}
              <div className="text-center mt-3">
                <span className="text-muted">Already have an account? </span>
                <Link to="/signin" className="fw-bold text-decoration-none text-success">
                  Sign In
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
