'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { IProduct } from "../interfaces/products.Interfaces";
import { AuthContext, useAuth } from "./authContext";

interface CartContextProps {
    cartItem: IProduct[];
    addToCart: (product: IProduct) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getIdItems: () => number[];
    getItemsCount: () => number;
}

const CartContext = createContext<CartContextProps> ({
    cartItem: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    getTotal: () => 0,
    getIdItems: () => [],
    getItemsCount: () => 0,
})

interface CartProvider {
    children: React.ReactElement;
}

export const CartProvider: React.FC<CartProvider> = ({ children }) => {
    const [cartItem, setCartItem] = useState<IProduct[]>([]);
    const { dataUser } = useAuth();

    useEffect(() => {
        if (cartItem.length > 0){
            localStorage.setItem('cart', JSON.stringify(cartItem))
        }
    }, [cartItem]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const dataFormLocalStorage = localStorage.getItem('cart');
            if (dataFormLocalStorage) {
                setCartItem(JSON.parse(dataFormLocalStorage));
            }
        }
    }, []);

    const addToCart = (product: IProduct) => {
        if(!dataUser){
            alert("Debes iniciar sesion para poder agregar productos al carro de compras");
            return;
        };
        const productExist = cartItem.some((item) => item.id === product.id);
        if(productExist){
            alert("Solo se puede agregar una unidad por persona");
            return;
        }
        setCartItem((prevItems) => [...prevItems, product]);
    };

    const removeFromCart = (productId: number) => {
       const newCart = cartItem.filter((item) => item.id !== productId);

       setCartItem(newCart);

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newCart));
  }
    };

    const clearCart = () => {
        setCartItem([]);
        if (typeof window !== 'undefined' && window.localStorage){
        localStorage.removeItem('cart');
      }
    };

    const getTotal = () => {
        return cartItem.reduce((total, item) => total + item.price, 0); 
    };    
    
    const getIdItems = () => {
        return cartItem.map((item) => item.id);
    };

    const getItemsCount = () => {
        return cartItem.length;
    };

    return(
        <CartContext.Provider value={{cartItem, addToCart, removeFromCart, clearCart, getTotal, getIdItems, getItemsCount}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);