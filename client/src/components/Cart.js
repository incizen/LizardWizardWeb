import React, { useState } from 'react';
import { useItems } from '../context/ItemContext';
import './Cart.css';

export default function Cart() {
  const { items, removeFromCart, totalPrice } = useItems();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="cart-container">
      <button className="cart-toggle" onClick={toggleCart}>
        🛒 Cart ({items.length})
      </button>
      
      {isOpen && (
        <div className="cart-dropdown">
          <h2>Shopping Cart</h2>
          {items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
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
                <button className="checkout-button">Proceed to Checkout</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
} 