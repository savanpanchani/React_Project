import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Alert, Card, Spinner, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInAsync, signInWithGoogleAsync } from "../../Services/Actions/userAction";
import "../../Styles/SignIn.css"; 

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error, isLoading } = useSelector((state) => state.userReducer || {});

  const initialState = { email: "", password: "" };
  const [inputForm, setInputForm] = useState(initialState);
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const emailOk = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(inputForm.email);
    if (!emailOk) return "Please enter a valid email address.";
    if (inputForm.password.length < 6) return "Password must be at least 6 characters long.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setValidationError(msg);
      return;
    }
    setValidationError("");
    dispatch(signInAsync(inputForm));
  };

  const handleGoogleLogin = () => {
    dispatch(signInWithGoogleAsync());
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="signin-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="signin-card shadow-lg p-4 rounded-4">
              <div className="brand text-center mb-3">
                <div className="logo-pill mx-auto mb-2">blinkit</div>
                <h3 className="fw-bold mb-1 text-dark">Welcome back</h3>
                <p className="text-muted m-0">Sign in to continue to <strong>Blinkit Cart</strong></p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-3">
                  {String(error)}
                </Alert>
              )}
              {validationError && (
                <Alert variant="warning" className="mb-3">
                  {validationError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="fw-semibold">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    name="email"
                    value={inputForm.email}
                    onChange={handleChanged}
                    required
                    className="field"
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formPassword">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      name="password"
                      value={inputForm.password}
                      onChange={handleChanged}
                      required
                      className="field"
                    />
                    <Button
                      type="button"
                      variant="outline-secondary"
                      className="toggle-eye"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </Button>
                  </InputGroup>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check type="checkbox" id="remember" label="Remember me" />
                  <Link to="/forgot-password" className="link-dark text-decoration-none small">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  variant="success"
                  type="submit"
                  className="w-100 py-2 fw-semibold shadow-sm btn-blinkit"
                  disabled={!!isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" /> Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Form>

              <div className="divider my-3"><span>or</span></div>

              <Button
                variant="light"
                onClick={handleGoogleLogin}
                className="w-100 py-2 fw-semibold shadow-sm btn-google"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48" className="me-2">
                  <path d="M44.5 20H24v8.5h11.9C34.9 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 1.1 8.2 3l6-6C34.7 4.5 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                  <path d="M6.3 14.7l7 5.1C15.3 16.2 19.3 14 24 14c3.1 0 6 1.1 8.2 3l6-6C34.7 4.5 29.6 2 24 2 16.1 2 9.2 6.5 6.3 14.7z"/>
                  <path d="M24 46c6 0 11.1-2 14.8-5.5l-6.8-5.6C29.9 36 27.2 37 24 37c-6 0-10.9-3.9-12.7-9.2l-7 5.4C7.1 40.8 14.9 46 24 46z"/>
                  <path d="M44.5 20H24v8.5h11.9c-1 3.3-3.1 5.9-5.9 7.4l.1.1 6.8 5.6c-.5.4 8.1-5.9 8.1-17.6 0-1.3-.2-2.7-.5-4z" fillOpacity=".1"/>
                </svg>
                Continue with Google
              </Button>

              <div className="text-center mt-3">
                <span className="text-muted">Don't have an account? </span>
                <Link to="/signup" className="fw-semibold link-dark text-decoration-none">
                  Create one
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
