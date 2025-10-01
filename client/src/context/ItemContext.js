import React, { createContext, useState, useContext, useEffect } from 'react';

const itemContext = createContext();

export const ItemProvider = ({ children }) => {
  // Load cart items from localStorage on startup
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });
  const [products] = useState([
    {
      id: 1,
      name: "Dragon Blood Potion",
      price: 2000,
      image: "dragons bloodjpg.jpg",
      type: "potion"
    },
    {
      id: 2,
      name: "Enchanted Dagger",
      price: 200,
      image: "enchanted dagger.jpg",
      type: "weapon"
    },
    {
      id: 3,
      name: "Fire Scroll",
      price: 1000,
      image: "firescroll.jpg",
      type: "scroll"
    },
    {
      id: 4,
      name: "Magic Septer",
      price: 300,
      image: "woodenStaff.jpg",
      type: "staff"
    },
    {
      id: 5,
      name: "Health Potion",
      price: 500,
      image: "potion.jpg",
      type: "potion"
    },
    {
      id: 6,
      name: "Crystall Ball",
      price: 1500,
      image: "crystalBall.jpg",
      type: "accessories"
    },
    {
      id: 7,
      name: "Beast Summoning Scroll",
      price: 800,
      image: "spell+scroll.png",
      type: "scroll"
    }
  ]);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const addToCart = (item) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const updateItem = (itemId, updatedItem) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, ...updatedItem } : item
    ));
  };

  // Calculate items in cart and total price
  const itemsInCart = items.reduce((total, item) => total + (item.quantity || 1), 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2);

  return (
    <itemContext.Provider value={{ 
      items, 
      products, 
      addToCart, 
      removeFromCart, 
      updateItem,
      itemsInCart,
      totalPrice 
    }}>
      {children}
    </itemContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(itemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
};

export { itemContext }; 