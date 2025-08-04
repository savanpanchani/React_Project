import { useEffect, useState } from "react";
import { getStorageData, setStorageData} from "../Services/storageData";
import {Badge,Button,Card,Container,Form,Row,Col,Pagination,} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router";
import "./Home.css";

const Home = () => {

  const [productData, setProductData] = useState([]);
  const [sortData, setSortData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("search");

  const handleEdit = (id) => navigate(`/edit-product/${id}`);

  const handleDelete = (id) => {
    const data = getStorageData();
    const updateData = data.filter((product) => product.id !== id);
    setStorageData(updateData);
    setProductData(updateData);
  };

  const handleClear = () => {
    const data = getStorageData();
    setProductData(data);
    setCurrentPage(1);
  };
 
  const handleSorting = () => {
    const data = getStorageData();
    const [field, type] = sortData.split(",");
    let updateData;

    if (type === "asc" && field !== "price") {
      updateData = data.sort((a, b) => a[field].localeCompare(b[field]));
    } else if (type === "asc" && field === "price") {
      updateData = data.sort((a, b) => a[field] - b[field]);
    } else if (type === "desc" && field !== "price") {
      updateData = data.sort((a, b) => b[field].localeCompare(a[field]));
    } else if (type === "desc" && field === "price") {
      updateData = data.sort((a, b) => b[field] - a[field]);
    }

    setProductData([...updateData]);
    setCurrentPage(1);
  };

  useEffect(() => {
    const data = getStorageData();
    if (searchParam) {
      const updateData = data.filter(
        (prod) =>
          prod.title.toLowerCase().includes(searchParam.toLowerCase()) ||
          prod.price.toString() === searchParam ||
          prod.category.toLowerCase().includes(searchParam.toLowerCase())
      );
      setProductData(updateData);
    } else {
      setProductData(data);
    }
  }, [searchParam]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productData.length / itemsPerPage);

  const handlePageChange = (number) => setCurrentPage(number);

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)} 
        >
          {number}
        </Pagination.Item>  
      );
    }
    return <Pagination>{items}</Pagination>; 
  };

  return (
    <Container fluid className="bg-light py-4 min-vh-100">
      <div className="px-5">
        <h2 className="text-primary mb-4">Explore Products</h2>
        <Row className="mb-4 g-2 align-items-center">
          <Col md={3}>
            <Form.Select onChange={(e) => setSortData(e.target.value)}>
              <option>Select Sorting</option>
              <option value="title,asc">Name: A to Z</option>
              <option value="title,desc">Name: Z to A</option>
              <option value="price,asc">Price: Low to High</option>
              <option value="price,desc">Price: High to Low</option>
              <option value="category,asc">Category: A to Z</option>
              <option value="category,desc">Category: Z to A</option>
            </Form.Select>
          </Col>
          <Col md="auto">
            <Button variant="success" onClick={handleSorting}>
              Sort
            </Button>
          </Col>
          <Col md="auto">
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
          </Col>
        </Row>

        <Row className="g-4">
          {currentItems.map((product) => (
            <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card className="product-card h-100 shadow-sm">
                <Card.Img  variant="top" src={product.image} className="p-3" style={{ height: "200px", objectFit: "contain" }}/>
                <Card.Body>
                  <Card.Title className="fs-6 text-truncate" title={product.title}>
                    {product.title}
                  </Card.Title>
                  <Card.Text className="small">{product.desc}</Card.Text>
                  <Card.Text>
                    <span className="fw-bold">₹{product.price}</span>
                  </Card.Text>
                  <Badge bg="info" className="mb-2 text-uppercase">
                    {product.category}
                  </Badge>
                  <div className="d-flex justify-content-between">
                    <Button className="btn-edit" size="sm" onClick={() => handleEdit(product.id)}>
                      Edit
                    </Button>
                    <Button className="btn-delete" size="sm" onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center mt-4">{renderPagination()}</div>
      </div>
    </Container>
  );
};

export default Home;
