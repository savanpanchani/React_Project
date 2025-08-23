import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductAsync, deleteProductAsync } from "../Services/Actions/productAction";
import { Container, Card, Button, Badge, Spinner } from "react-bootstrap";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products = [], isLoading: loading } = useSelector(
    (state) => state.product || {}
  );

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!products.length) {
      dispatch(getAllProductAsync());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    const found = products.find((p) => String(p.id) === id);
    setProduct(found || null);
  }, [products, id]);

  const handleDelete = () => {
    dispatch(deleteProductAsync(id));
    navigate("/");
  };

  const handleEdit = () => {
    navigate(`/edit-product/${id}`);
  };

  if (loading || !product) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow border-0">
        <Card.Img
          variant="top"
          src={product.image}
          height={300}
          style={{ objectFit: "contain", backgroundColor: "#f8f9fa" }}
        />
        <Card.Body>
          <Card.Title className="fw-bold">{product.title}</Card.Title>
          <Card.Text className="text-muted">{product.desc}</Card.Text>

          <Badge bg="warning" text="dark" className="mb-3">
            {product.category}
          </Badge>

          <div className="fw-bold fs-5 mb-2">₹ {product.price}</div>
          <div className="text-muted mb-3">
            Unit: <strong>{product.unit || "1 kg"}</strong>
          </div>

          <div className="d-flex gap-2">
            <Button variant="success" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Back
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetails;
