import { useState, createContext, useContext, useEffect } from "react";

import products from "../products.json";

import { initiateCheckout } from "../lib/payments.js";

const STORAGE_KEY = "spacejelly_cart";

const defaultCart = {
  products: {},
};

export const CartContext = createContext();
export function useCartState() {
  const [cart, setCart] = useState(defaultCart);

  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem(STORAGE_KEY);
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      setCart(data);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem(STORAGE_KEY, data);
  }, [cart]);

  const cartItems = Object.keys(cart.products).map((key) => {
    const product = products.find(({ id }) => id === key);
    return {
      ...cart.products[key],
      pricePerItem: product.price,
    };
  });

  const subtotal = cartItems.reduce((acc, { pricePerItem, quantity }) => {
    return acc + pricePerItem * quantity;
  }, 0);

  const totalItems = cartItems.reduce((acc, { quantity }) => {
    return acc + quantity;
  }, 0);

  function addToCart({ id } = {}) {
    setCart((prev) => {
      let cartState = { ...prev };
      if (cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1;
      } else {
        cartState.products[id] = {
          id,
          quantity: 1,
        };
      }
      return cartState;
    });
  }

  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map((item) => {
        return {
          price: item.id,
          quantity: item.quantity,
        };
      }),
    });
  }

  return {
    subtotal,
    totalItems,
    addToCart,
    checkout,
    cartItems,
  };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
