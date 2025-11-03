'use client'

import Link from 'next/link';
import { IProduct } from "../interfaces/products.Interfaces";

interface CardProps {
  product: IProduct;
}

function Card({ product }: CardProps) {

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(`Agregando ${product.name} al carrito. ¡ID: ${product.id}!`);
  };

  return (
    <Link 
      href={`/product/${product.id}`}
    >
      <div 
        key={product.name} 
        className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden p-4 flex flex-col cursor-pointer"
      >
        <div className="flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden h-48 mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-40 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h3 className="text-base font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-500 text-sm flex-grow1">
          {product.description.length > 80
            ? product.description.slice(0, 70) + "..."
            : product.description}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-semibold text-gray-900">
            ${product.price}
          </span>
        </div>
        <button
          onClick={handleAddToCart} 
          className="mt-3 bg-black text-white text-sm font-semibold py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Agregar al carrito
        </button>
      </div>
    </Link>
  );
}

export default Card;