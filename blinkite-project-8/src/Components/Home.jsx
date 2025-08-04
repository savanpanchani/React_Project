import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductAsync,
} from "../Services/Actions/productAction";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Form,
} from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router";
import banner from "../assets/banner.jpg";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.productReducer);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleEdit = (id) => navigate(`/edit-product/${id}`);
  const handleDelete = (id) => dispatch(deleteProduct(id));

  useEffect(() => {
    dispatch(getAllProductAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = () => {
    const lowerSearch = search.toLowerCase();
    const filtered = products.filter(
      (prod) =>
        prod.title.toLowerCase().includes(lowerSearch) ||
        prod.category.toLowerCase().includes(lowerSearch) ||
        String(prod.price).includes(lowerSearch)
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="success" />
        </div>
      ) : (
        <>
          <Container fluid className="p-0">
            <img
              src={banner}
              alt="banner"
              className="banner-img w-100"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </Container>

          <Container className="mt-4">
            <Form
              className="d-flex justify-content-center mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <div className="search-wrapper">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by title, category or price..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={handleSearch}
                >
                  <IoIosSearch />
                </button>
              </div>
            </Form>
          </Container>

          <Container className="mt-3">
            <Row className="g-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Card className="product-card h-100 shadow-sm">
                      <Card.Img
                        variant="top"
                        src={product.image}
                        className="p-3"
                        style={{ height: "200px", objectFit: "contain" }}
                      />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title
                          className="fs-6 text-truncate"
                          title={product.title}
                        >
                          {product.title}
                        </Card.Title>
                        <Card.Text className="small">{product.desc}</Card.Text>
                        <Card.Text>
                          <span className="fw-bold">₹{product.price}</span>
                        </Card.Text>
                        <Badge bg="info" className="mb-2 text-uppercase">
                          {product.category}
                        </Badge>
                        <div className="mt-auto d-flex justify-content-between">
                          <Button
                            className="blinkit-edit-btn"
                            size="sm"
                            onClick={() => handleEdit(product.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            className="blinkit-delete-btn"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <div className="text-center mt-4 fw-semibold fs-5 text-muted">
                  No products found.
                </div>
              )}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Home;
