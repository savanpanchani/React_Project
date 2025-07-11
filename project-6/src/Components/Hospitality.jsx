import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import './Hospitality.css';

const getLocalData = () => {
  const data = localStorage.getItem("patients");
  return data ? JSON.parse(data) : [];
};

const Hospitality = () => {
  const initialForm = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    marital: "",
    contact: "",
    disease: ""
  };

  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [patients, setPatients] = useState(getLocalData());
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    const { firstname, lastname, email, gender, marital, contact, disease } = formData;

    if (!firstname.trim()) errors.firstname = "First name is required";
    if (!lastname.trim()) errors.lastname = "Last name is required";
    if (!email.trim()) errors.email = "Email is required";
    if (!gender.trim()) errors.gender = "Gender is required";
    if (!marital.trim()) errors.marital = "Marital status is required";
    if (!contact.trim()) errors.contact = "Contact is required";
    if (!disease.trim()) errors.disease = "Disease description is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    if (isEdit) {
      const updated = patients.map((p) =>
        p.id === formData.id ? formData : p
      );
      setPatients(updated);
      setIsEdit(false);
    } else {
      const newEntry = { ...formData, id: Date.now().toString() };
      setPatients([...patients, newEntry]);
    }

    setFormData(initialForm);
  };

  const handleEdit = (id) => {
    const selected = patients.find((p) => p.id === id);
    setFormData(selected);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    const filtered = patients.filter((p) => p.id !== id);
    setPatients(filtered);
  };

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  return (
    <div className="hospital-wrapper">
      <div className="glass-container">
        <h2 className="form-heading">Patient Registration</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstname"
                placeholder="Enter First Name"
                value={formData.firstname}
                onChange={handleChange}
                isInvalid={!!formErrors.firstname}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.firstname}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastname"
                placeholder="Enter Last Name"
                value={formData.lastname}
                onChange={handleChange}
                isInvalid={!!formErrors.lastname}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.lastname}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!formErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                name="contact"
                placeholder="Enter Contact"
                value={formData.contact}
                onChange={handleChange}
                isInvalid={!!formErrors.contact}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.contact}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                isInvalid={!!formErrors.gender}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors.gender}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>Marital Status</Form.Label>
              <Form.Select
                name="marital"
                value={formData.marital}
                onChange={handleChange}
                isInvalid={!!formErrors.marital}
              >
                <option value="">Select</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors.marital}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Disease Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="disease"
                placeholder="Enter disease or reason"
                value={formData.disease}
                onChange={handleChange}
                isInvalid={!!formErrors.disease}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.disease}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Button type="submit" className="submit-btn">
            {isEdit ? "Update Patient" : "Register Patient"}
          </Button>
        </Form>
      </div>

      <div className="card-section">
        <h2 className="form-heading">Registered Patients</h2>
        <div className="cards-grid">
          {patients.map((p) => (
            <div className="glass-card" key={p.id}>
              <h5>
                {p.firstname} {p.lastname}
              </h5>
              <p><strong>Email:</strong> {p.email}</p>
              <p><strong>Contact:</strong> {p.contact}</p>
              <p><strong>Gender:</strong> {p.gender}</p>
              <p><strong>Marital:</strong> {p.marital}</p>
              <p><strong>Disease:</strong> {p.disease}</p>
              <div className="btn-group">
                <Button className="btn" onClick={() => handleEdit(p.id)}>Edit</Button>
                <Button className="btn" onClick={() => handleDelete(p.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hospitality;
