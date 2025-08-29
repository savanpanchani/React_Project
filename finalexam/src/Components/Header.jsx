import { Navbar, Container, FormControl, Nav, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { FiUser, FiLogOut } from "react-icons/fi";
import { PiBookOpenLight } from "react-icons/pi"; 
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/images/recipe-logo.png"; 
import "./Header.css"; 

// Category Images
import indian from "../assets/images/indian.png";
import italian from "../assets/images/italian.png";
import mexican from "../assets/images/mexican.png";
import dessert from "../assets/images/dessert.png";
import drinks from "../assets/images/drinks.png";

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);

  const categories = [
    { img: indian, label: "Indian" },
    { img: italian, label: "Italian" },
    { img: mexican, label: "Mexican" },
    { img: dessert, label: "Desserts" },
    { img: drinks, label: "Drinks" },
  ];

  const handleLogout = () => {
    // dispatch(logOutAsync());
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* 🔹 Main Navbar */}
      <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm border-bottom py-2">
        <Container className="d-flex align-items-center justify-content-between header-container">
          
          {/* Logo + Title */}
          <div className="d-flex align-items-center">
            <Link to="/" className="text-decoration-none d-flex align-items-center me-4">
              <img src={logo} alt="RecipeBook" height={45} />
            </Link>
            <div>
              <div className="fw-bold brand-title">Recipe Book</div>
              <div className="brand-subtitle">
                Explore & Share Recipes 🍲
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="header-search flex-grow-1 mx-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <FaSearch className="text-muted" />
              </span>
              <FormControl
                type="search"
                placeholder='Search "Paneer Tikka"'
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section */}
          <Nav className="align-items-center gap-4">
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <span className="fw-semibold">{user.email}</span>
                <Button
                  variant="danger"
                  size="sm"
                  className="d-flex align-items-center gap-2 rounded-pill"
                  onClick={handleLogout}
                >
                  <FiLogOut /> Logout
                </Button>
              </div>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-dark fw-semibold">
                <FiUser className="me-1" /> Login
              </Nav.Link>
            )}

            <Nav.Link as={Link} to="/add-recipe">
              <Button className="header-btn d-flex align-items-center justify-content-center gap-2">
                <PiBookOpenLight style={{ height: "24px", width: "24px" }} />
                Add Recipe
              </Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* 🔹 Categories Scroll Bar */}
      <div className="bg-white border-bottom py-3">
        <Container className="d-flex gap-4 justify-content-center flex-wrap category-container">
          {categories.map((cat, index) => (
            <div key={index} className="recipe-category-card text-center shadow-sm">
              <img src={cat.img} alt={cat.label} className="category-img" />
              <span className="fw-semibold mt-2 d-block">{cat.label}</span>
            </div>
          ))}
        </Container>
      </div>
    </>
  );
};

export default Header;
