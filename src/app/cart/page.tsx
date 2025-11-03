'use client';

import { useState } from 'react'; 
import { useCart } from "../context/CartContext";
import { createOrder } from "../Services/orderService"; 

function CartPage() {
  const {
    cartItem,
    clearCart,
    getIdItems, 
    getItemsCount,
    getTotal,
    removeFromCart,
  } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    const sessionString = localStorage.getItem('userSession');
    let token: string | null = null; 

    if (sessionString) {
      try {
        const sessionData = JSON.parse(sessionString);
        token = sessionData.token;
      } catch (e) {
        console.error("Error al parsear userSession:", e);
      }
    }

    if (!token) {
      setError("Debes iniciar sesión para completar la compra.");
      setIsLoading(false);
      alert("Debes iniciar sesión para completar la compra.");
      return;
    }

    const productIds = getIdItems();
    if (productIds.length === 0) {
      setError("Tu carrito está vacío.");
      setIsLoading(false);
      return;
    }

    try {
      const order = await createOrder(productIds, token); 

      console.log("Orden creada con éxito:", order);
      alert("¡Pedido realizado con éxito! 🥳");
      
      clearCart(); 

    } catch (err: any) {
      console.error("Error al crear la orden:", err);
      const errorMessage = err.message || "Ocurrió un error al procesar el pago.";
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">🛒 Tu carrito de compras</h1>

      {cartItem.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center w-full max-w-md">
          <p className="text-gray-400 mb-4">Tu carrito está vacío 😢</p>
          <a
            href="/"
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Ver productos
          </a>
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
          <div className="flex justify-between border-b border-gray-700 pb-4">
            <p className="text-gray-300">
              Productos en carrito:{" "}
              <span className="font-bold text-white">
                {getItemsCount()}
              </span>
            </p>
          </div>

          {cartItem.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b border-gray-700 pb-4"
            >
              <div className="flex items-center gap-4">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                )}
                <div>
                  <h2 className="font-semibold text-lg">{product.name}</h2>
                  <p className="text-gray-400 text-sm">${product.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm font-semibold transition-all"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <h3 className="text-xl font-bold">Total:</h3>
            <p className="text-xl font-semibold text-green-400">
              ${getTotal().toFixed(2)}
            </p>
          </div>

          {error && (
            <p className="text-red-400 text-center font-semibold">{error}</p>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={clearCart}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50"
              disabled={isLoading} 
            >
              Vaciar carrito
            </button>

            <button
              onClick={handleCheckout}
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading} 
            >
              {isLoading ? "Procesando pago..." : "Proceder al pago"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;