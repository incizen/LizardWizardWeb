// client/src/components/ProductList.js

import React,
{
    useContext,
    useEffect,
    useState
} from 'react';
import ProductItem from './ProductItem';
import { itemContext } from '../context/ItemContext';

const ProductList = () => {
    const { products } = useContext(itemContext);
    const [sortedProducts, setSortedProducts] = useState([...products]);

    useEffect(() => {
        setSortedProducts([...products])
    }, [products])

    return (
        <div className='prdt-list-container'>
            <div className="welcome-message">
                <h1>Welcome to The Lizard Wizard's Shop</h1>
                <p>Anything and everything a sorcerer needs... Gandalf the White approved!</p>
            </div>
            <div className='prdt-list'>
                <ul className='item-card'>
                    {sortedProducts.map((product) => (
                        <ProductItem key={product.id}
                            product={product} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductList;
