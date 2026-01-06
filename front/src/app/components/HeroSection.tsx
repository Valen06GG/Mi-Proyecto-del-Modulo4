import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-[#fff6f6] rounded-2xl p-10 shadow-md mt-6">
      <div className="md:w-1/2 space-y-5">
        <p className="text-sm text-red-500 font-semibold">Escucha lo que amas</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Roco Wireless Headphone
        </h1>
        <p className="text-gray-600 max-w-md">
          Sonido envolvente y conexión inalámbrica superior. Disfrutá de tu música favorita con la mejor calidad y comodidad.
        </p>
      </div>
      <div className="md:w-1/2 flex justify-center md:mt-0">
        <img
          src="https://etrade-delta.vercel.app/_next/image?url=%2Fimages%2Fproduct%2Fproduct-38.png&w=1920&q=75"
          alt="Auriculares Roco"
          className="w-[300px] md:w-[400px] drop-shadow-2xl"
        />
      </div>
    </section>
  );
};

export default HeroSection;