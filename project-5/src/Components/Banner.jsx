import React from 'react';

const Banner = ({ banner }) => {
  return (
    <section id="top" className="page-banner">
      <img src={banner} alt="Banner" />
      <div className="container">
        <div className="row">
          <div className="col-12 text-center text-white py-5">
            <h1 className="page-headding">Food Menus</h1>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="/" className="text-white">Home</a>
              </li>
              <li className="list-inline-item text-white">/ Menu 1</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
