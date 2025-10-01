// client/src/components/ProductItem.js
import React from 'react';
import { useItems } from '../context/ItemContext';

const ProductItem = ({ product }) => {
    const { addToCart } = useItems();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="product-card">
            <img className="product-image"
                src={product.image}
                alt={product.name} />
            <div className="product-details">
                <h3 style={{ fontWeight: "700" }}>
                    {product.name}
                </h3>
                <p style={{ fontWeight: "500" }}>
                    Price: {product.price} Rs
                </p>
                <button onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductItem;
