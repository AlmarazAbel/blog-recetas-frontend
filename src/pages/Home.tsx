const Home = () => {
  return (
    <main className="container py-5">
      <div className="text-center">
        <h1 className="display-4 fw-bold">
          Blog de Recetas
        </h1>

        <p className="lead mt-3">
          Descubrí nuevas recetas, prepará tus platos favoritos
          y compartí tus propias creaciones.
        </p>

        <a href="/recetas" className="btn btn-primary mt-3">
          Ver recetas
        </a>
      </div>
    </main>
  );
};

export default Home;