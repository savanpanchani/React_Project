import "bootstrap/dist/css/bootstrap.min.css";
import "./Components/pizzon-menu.css";
import React, { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import banner from '../src/assets/img/banner.png';
import chef1 from '../src/assets/img/chef-1.jpg';
import icon from '../src/assets/img/header-logo.png';
import Header from '../src/Components/Header.jsx';
import Banner from './Components/Banner.jsx';
import MenuTabs from './Components/MenuTabs.jsx';
import ChefsSection from './Components/ChefsSection.jsx';
import BookingForm from './Components/BookingForm.jsx';
import Footer from './Components/Footer.jsx';
import './Components/pizzon-menu.css';
import './Components/Header.css';
import './Components/Banner.css';
import './Components/MenuTabs.css';
import './Components/ChefsSection.css';
import './Components/BookingForm.css';
import './Components/Footer.css';

const items = [
  {
    id: 1,
    name: 'Margherita Pizza',
    img: '../src/assets/img/list-1.jpg',
    desc: 'Classic delight with 100% real mozzarella cheese',
    ingredients: ['Cheese', 'Tomato', 'Basil'],
    categories: ['pizzas', 'all']
  },
  {
    id: 2,
    name: 'Fettucini',
    img: '../src/assets/img/list-10.jpg',
    desc: 'Crispy patty with fresh lettuce and sauce',
    ingredients: ['Lettuce', 'Tomato', 'Patty'],
    categories: ['burgers', 'all']
  },
  {
    id: 3,
    name: 'Veg Burger',
    img: '../src/assets/img/list-11.jpg',
    desc: 'Crispy patty with fresh lettuce and sauce',
    ingredients: ['Lettuce', 'Tomato', 'Patty'],
    categories: ['burgers', 'all']
  },
    {
    id: 4,
    name: 'Chicken Breast',
    img: '../src/assets/img/list-9.jpg',
    desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or',
    ingredients: ['Chicken', 'Olive', 'Oil Salt'],
    categories: ['burgers', 'all']
    },
    {
    id: 5,
    name: 'Gnocchi',
    img: '../src/assets/img/list-8.jpg',
    desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or',
    ingredients: ['Chicken', 'Olive', 'Oil Salt'],
    categories: ['burgers', 'all']
    },
        {
    id: 6,
    name: 'Triple crown',
    img: '../src/assets/img/list-7.jpg',
    desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or',
    ingredients: ['Chicken', 'Olive', 'Oil Salt'],
    categories: ['burgers', 'all']
    },
    {
    id: 7,
    name: 'Greek Pizza',
    img: '../src/assets/img/list-6.jpg',
    desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or',
    ingredients: ['Chicken', 'Olive', 'Oil Salt'],
    categories: ['burgers', 'all']
    },
        {
    id: 8,
    name: 'Chicken Breast',
    img: '../src/assets/img/list-1.jpg',
    desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or',
    ingredients: ['Chicken', 'Olive', 'Oil Salt'],
    categories: ['burgers', 'all']
    },
    {
    id: 9,
    name: 'Chicken Breast',
    img: '../src/assets/img/list-2.jpg',
    desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or',
    ingredients: ['Chicken', 'Olive', 'Oil Salt'],
    categories: ['burgers', 'all']
    },
];

const chefs = [
  { id: 1, name: 'John Doe', role: 'Head Chef', img: '../src/assets/img/chef-1.jpg' },
  { id: 2, name: 'Jane Smith', role: 'Sous Chef', img: '../src/assets/img/chef-2.jpg' }
];

const App = () => {
  const [form, setForm] = useState({ name: '', email: '', persons: '1', date: '' });

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'salads', label: 'Salads' },
    { id: 'pasta', label: 'Pasta' },
    { id: 'burgers', label: 'Burgers' },
    { id: 'deserts', label: 'Deserts' },
    { id: 'pizzas', label: 'Pizzas' }
  ];

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Booking:', form);
  };

  return (
    <>
      <Header icon={icon} />
      <Banner banner={banner} />
      <MenuTabs categories={categories} items={items} />
      <ChefsSection chefs={chefs} />
      <BookingForm form={form} onChange={onChange} onSubmit={onSubmit} />
      <Footer />
    </>
  );
};

export default App;
