import { IProduct } from "../interfaces/products.Interfaces";

export const getAllProducts = async () => {
    try {
      const res = await fetch("http://localhost:3001/products", {
        method: "GET",
      });
      const products: IProduct[] = await res.json();
      return products
    } catch (error: any) {
      throw new Error(error)
    }
}

export const getProductsById = async (id:string) => {
  try {
    const allProducts = await getAllProducts();
    const product = allProducts.find((product) => {return product.id === Number(id)});
    if(!product){
      throw new Error("No se encontro un producto con ese Id")
    }
    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}

