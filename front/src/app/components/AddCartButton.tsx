'use client'

import React from "react";
import { useCart } from "../context/CartContext";
import { IProduct } from "../interfaces/products.Interfaces";

interface ButtonProps {
    product: IProduct;
}

const AddCartButton = ({product}: ButtonProps) => {
    const {addToCart} = useCart();
    return(
        <div>
          <button onClick={() => addToCart(product)} className=" cursor-pointer w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition">
            Agregar al carrito
          </button>
        </div>
    )
};

export default AddCartButton;