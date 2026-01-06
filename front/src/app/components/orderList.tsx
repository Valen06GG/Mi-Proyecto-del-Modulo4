'use client';

import { useEffect, useState } from "react";
import { Order } from "../interfaces/ordersInterface";
import { useAuth } from "../context/authContext";
import { getAllOrders } from "../Services/orderService";

function OrderList() {
  const { dataUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!dataUser?.token) {
        setOrders([]);
        return;
      }
      setIsLoading(true);
      setError(null);

      try {
        const ordersResponse = await getAllOrders(dataUser?.token);
        setOrders(ordersResponse);
      } catch (error) {
        console.error("Este es el error:", error);
        setError(`${error}`);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [dataUser?.token]);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center border-b border-gray-700 pb-2">
        Mis Órdenes
      </h2>

      {error && (
        <div className="bg-red-800 text-white p-3 rounded-md mb-4">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md"
          >
            Reintentar
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="text-center text-gray-300">
          <p>Cargando tus órdenes...</p>
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-700 text-gray-100 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Productos</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-750">
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">
                    {order.products?.length || 0} productos
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-200 text-green-900 rounded-full text-xs font-medium">
                      {order.status || "Procesada"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(order.date || Date.now()).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-4">
          <p>No hay órdenes disponibles.</p>
        </div>
      )}
    </div>
  );
}

export default OrderList;