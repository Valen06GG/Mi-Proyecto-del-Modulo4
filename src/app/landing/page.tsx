"use client";

function LandingPage() {
  const featured = [
    {
      icon: "📱",
      title: "Smartphones",
      desc: "Los últimos modelos con tecnología 5G y pantallas OLED.",
    },
    {
      icon: "💻",
      title: "Componentes",
      desc: "Arma tu PC con los mejores procesadores y placas gráficas.",
    },
    {
      icon: "🎧",
      title: "Accesorios",
      desc: "Auriculares, teclados y periféricos gamer de alta calidad.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          Tecnología que impulsa tu mundo 🚀
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mb-8">
          Descubrí los mejores productos en smartphones, componentes y gadgets.
        </p>
        <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg transition">
          <a href="/">
          🛒 Comprar ahora
          </a>
        </button>
      </section>

      <section className="py-20 px-6">
        <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Categorías Destacadas
        </h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {featured.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;