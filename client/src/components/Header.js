// client/src/components/Header.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useItems } from '../context/ItemContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Navbar = () => {
    const { items, removeFromCart, totalPrice } = useItems();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <nav className='navbar'>
            <div className='navbar-brand'>
                <h1 className='ecom' onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    The Lizard Wizard's Shop
                </h1>
            </div>
            <div className='navbar-items'>
                <div className='cart-container'>
                    <div className='cart-num' onClick={toggleCart}>
                        <FontAwesomeIcon
                            icon={faCartShopping}
                            size="2x"
                            className='cart-icon'
                        />
                        <div className='cart-count'>
                            {items.length}
                        </div>
                    </div>
                    
                    {isCartOpen && (
                        <div className="cart-dropdown">
                            <h2>Shopping Cart</h2>
                            {items.length === 0 ? (
                                <p>Your cart is empty</p>
                            ) : (
                                <>
                                    <div className="cart-items-list">
                                        {items.map(item => (
                                            <div key={item.id} className="cart-item">
                                                <img src={item.image} alt={item.name} />
                                                <div className="item-details">
                                                    <h3>{item.name}</h3>
                                                    <p>{item.price} Rs</p>
                                                </div>
                                                <button className="remove-item" onClick={() => removeFromCart(item.id)}>×</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cart-summary">
                                        <h3>Total: {totalPrice} Rs</h3>
                                        <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;



