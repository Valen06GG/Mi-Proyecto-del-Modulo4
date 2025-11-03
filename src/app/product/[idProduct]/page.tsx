import React from "react";
import Image from "next/image";
import { IProduct } from "../../interfaces/products.Interfaces";
import { getProductsById } from "@/app/ProductsPage/page";
import { notFound } from "next/navigation";
import AddCartButton from "@/app/components/AddCartButton";

interface ProductDetailProps {
  params: { idProduct: string };
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { idProduct } = await params;

  let product: IProduct;

  try {
    product = await getProductsById(idProduct);
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-xl object-contain"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-sm uppercase text-gray-500">Reebok</h2>
            <h1 className="text-3xl font-semibold text-gray-900">
              {product.name}
            </h1>
            <div className="flex items-center mt-2">
              <div className="text-yellow-400 text-lg">★★★★☆</div>
              <span className="ml-2 text-sm text-gray-500">42 reviews</span>
            </div>
          </div>

          <p className="text-3xl font-semibold text-gray-900">
            ${product.price}
          </p>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          
          <AddCartButton product = {product} />

          <p className="text-sm text-gray-500">
            Free delivery on orders over $30.00
          </p>
        </div>
      </div>
    </div>
  );
}