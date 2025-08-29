import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add-recipe" element={<RecipeForm />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
