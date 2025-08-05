import imageDesktop from "../../assets/images/banner-horizontal-barberia-realista_Desktop.png";
import imageMobile from "../../assets/images/imgMobile.png";

const Home = () => {
  return (
    <section className="relative w-full h-auto object-cover">
      <picture>
        <source media="(max-width:640px)" srcSet={imageMobile} />
        <source media="(min-width:641px)" srcSet={imageDesktop} />
        <img
          src={imageDesktop}
          alt="Articulo principal imagen"
          className="w-screen h-[78vh] object-cover object-center"
        />
      </picture>
    </section>
  );
};

export default Home;
