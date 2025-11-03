"use client";

import Link from "next/link";
import { useAuth } from "../context/authContext";

function Navbar() {
  const { dataUser, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center shrink-0">
            <span className="text-blue-600">TechStore</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link href="/landing" className="hover:text-gray-200">
              Landing
            </Link>
            <Link href="/dashboard" className="hover:text-gray-200">
              Dashboard
            </Link>
            <Link href="/cart" className="hover:text-gray-200">
              <img className="w-7.5" src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="carrito" />
            </Link>
            <Link href="/Register" className="hover:text-gray-200">
              Register
            </Link>

            {dataUser ? (
              <div className="flex items-center space-x-4">
                <span>{dataUser.user.name}</span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/Login" className="hover:text-gray-200">
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;