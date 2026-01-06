'use client'

import OrderList from "../components/orderList";
import { useAuth } from "../context/authContext";

function DashboardPage() {
  const { dataUser } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 border-b border-gray-700 pb-3">
          Información del Usuario
        </h2>

        {dataUser ? (
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Nombre:</p>
              <p className="text-lg font-medium">{dataUser.user.name}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Email:</p>
              <p className="text-lg font-medium">{dataUser.user.email}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Dirección:</p>
              <p className="text-lg font-medium">{dataUser.user.address || "No especificada"}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Teléfono:</p>
              <p className="text-lg font-medium">{dataUser.user.phone || "No especificado"}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">
            No hay información del usuario.
          </p>
        )}
        <OrderList />
      </div>
    </div>
  );
}

export default DashboardPage;