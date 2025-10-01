import React from 'react';
import { useItems } from '../context/ItemContext';
import './Checkout.css';

const Checkout = () => {
    const { items, totalPrice } = useItems();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Order submitted!');
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <div className="checkout-content">
                <div className="checkout-form">
                    <h2>Shipping Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea id="address" rows="3" required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" required />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="state">State</label>
                                <input type="text" id="state" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="zip">ZIP Code</label>
                                <input type="text" id="zip" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="card">Card Number</label>
                            <input type="text" id="card" required />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="expiry">Expiry Date</label>
                                <input type="text" id="expiry" placeholder="MM/YY" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input type="text" id="cvv" required />
                            </div>
                        </div>
                        <button type="submit" className="place-order-btn">Place Order</button>
                    </form>
                </div>

                <div className="order-summary">
                    <h2>Order Summary</h2>
                    {items.length === 0 ? (
                        <div className="summary-items">
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        <>
                            <div className="summary-items">
                                {items.map(item => (
                                    <div key={item.id} className="summary-item">
                                        <img src={item.image} alt={item.name} />
                                        <div className="item-info">
                                            <h3>{item.name}</h3>
                                            <p>Quantity: {item.quantity || 1}</p>
                                            <p>₹{item.price * (item.quantity || 1)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="summary-total">
                                <h3>Total Amount</h3>
                                <p>₹{totalPrice}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout; 