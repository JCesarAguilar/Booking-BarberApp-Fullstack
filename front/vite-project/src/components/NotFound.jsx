const NotFound = () => {
  return (
    <div
      className="flex flex-col 
                    items-center justify-center h-screen text-center"
    >
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-6">Página no encontrada</p>
      <a href="/" className="text-blue-500 underline">
        Volver al inicio
      </a>
    </div>
  );
};

export default NotFound;
