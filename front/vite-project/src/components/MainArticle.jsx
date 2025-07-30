import imageDesktop from "../assets/images/banner-horizontal-barberia-realista_Desktop.png";

const MainArticle = () => {
  return (
    <section className="relative w-full h-auto">
      <picture>
        <source media="(max-width:640px)" srcSet={imageDesktop} />
        <source media="(min-width:641px)" srcSet={imageDesktop} />
        <img
          src={imageDesktop}
          alt="Articulo principal imagen"
          className="w-screen h-auto"
        />
      </picture>
      <button className="absolute border border-white  text-[14px] bottom-1/4 left-1/10 bg-black hover:bg-white hover:text-black text-white py-2 px-4">
        RESERVA AQUÍ
      </button>
    </section>
  );
};

export default MainArticle;
