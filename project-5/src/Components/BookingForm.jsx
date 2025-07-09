import React from 'react';
import phoneIcon from '../assets/img/online-call.png'; 

const BookingForm = ({ form, onChange, onSubmit }) => {
  return (
    <section className="booking-form-section py-5">
      <div className="container">
        <div className="row align-items-center">
          
          <div className="col-md-6 mb-5">
            <h4 className="booking-subtitle">Fresh From Pizzon</h4>
            <h2 className="booking-title">BOOK ONLINE</h2>
            <p className="booking-desc">
              Sit amet, consectetur adipiscing elit quisque eget maximus velit, non eleifend libero curabitur
              dapibus mauris sed leo cursus aliquet cras suscipit. Sit amet, consectetur adipiscing elit quisque
              eget maximus velit, non eleifend libero curabitur
            </p>
            <div className="booking-phone-box d-flex align-items-center mt-4">
              <img src={phoneIcon} alt="Phone Icon" className="me-3" width="40" />
              <span className="booking-phone-text">+ 91 123 456 789 0</span>
            </div>
          </div>

          
          <div className="col-md-6">
            <h3 className="form-title mb-4">BOOK A TABLE</h3>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="name"
                className="form-control mb-3"
                placeholder="Name"
                value={form.name}
                onChange={onChange}
                required
              />
              <input
                type="email"
                name="email"
                className="form-control mb-3"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
                required
              />
              <select
                name="persons"
                className="form-control mb-3"
                value={form.persons}
                onChange={onChange}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    Person {i + 1}
                  </option>
                ))}
              </select>
              <input
                type="date"
                name="date"
                className="form-control mb-4"
                value={form.date}
                onChange={onChange}
                required
              />
              <button type="submit" className="btn booking-btn px-5 py-2">
                BOOK NOW
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
