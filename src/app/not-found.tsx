import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        textAlign: "center",
        padding: "5rem 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem" }}>Página no encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe o fue movida.</p>
      <Link
        href="/"
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#111",
          color: "#fff",
          borderRadius: "0.5rem",
          textDecoration: "none",
        }}
      >
        Volver al inicio
      </Link>
    </main>
  );
}