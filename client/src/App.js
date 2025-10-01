// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Header from './components/Header';
import Checkout from './components/Checkout';
import './App.css';
import { ItemProvider } from './context/ItemContext';

const App = () => {
    return (
        <Router>
            <ItemProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </ItemProvider>
        </Router>
    );
};

export default App;

