import HeroSection from "./components/HeroSection";
import Card from "./components/Card";
import { getAllProducts } from "./ProductsPage/page";

export default async function Home() {

  const allProducts = await getAllProducts()

  return (
    <div className="flex flex-col items-center min-h-screen bg-zinc-50 font-sans ">
      <main style={{ padding: "2rem", textAlign: "center", color: "#222222" }}>
        <h1>Bienvenido a <span className="text-blue-600">TechStore</span></h1>
      <HeroSection />
        <p className="mt-15">Explora nuestros productos y descubre las mejores ofertas.</p>
      </main>

      <div className="grid grid-cols-1 gap-x-8 p-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allProducts.map((product) => {
          return <Card key = {product.name} product = {product} />
        })}
      </div>
    </div>
  );
}
