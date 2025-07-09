import React from 'react';

const MenuTabs = ({ categories, items }) => {
  return (
    <section className="menu-list pt-5">
      <div className="container">
        <ul className="nav nav-tabs mb-4" role="tablist">
          {categories.map((cat) => (
            <li className="nav-item" key={cat.id}>
              <button
                className={`nav-link${cat.id === 'all' ? ' active' : ''}`}
                data-bs-toggle="tab"
                data-bs-target={`#tab-${cat.id}`}
                type="button"
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="tab-content">
          {categories.map((cat) => (
            <div
              className={`tab-pane fade${cat.id === 'all' ? ' show active' : ''}`}
              id={`tab-${cat.id}`}
              key={cat.id}
            >
              <div className="row">
                {items
                  .filter((i) => cat.id === 'all' || i.categories.includes(cat.id))
                  .map((i) => (
                    <div className="col-md-4 mb-4" key={i.id}>
                      <div className="menu-card h-100">
                        <div className="image-wrapper">
                          <img src={i.img} alt={i.name} />
                        </div>
                        <h4 className="item-name">{i.name}</h4>
                        <div className="ingredients">
                          {i.ingredients.map((ing, idx) => (
                            <span key={idx}>
                              {ing}
                              {idx !== i.ingredients.length - 1 && ' / '}
                            </span>
                          ))}
                        </div>
                        <p className="description">{i.desc}</p>
                        <a href="#" className="order-now">Order Now</a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuTabs;
