import Marquee from "react-fast-marquee";
import amazon from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_2 from "../../../assets/brands/start_people.png";
const brands = [amazon, casio, moonstar, randstad, star, start_2];
const BrandsMarquee = () => {
  return (
    <section className="py-4 md:py-12 lg:py-16 bg-white">
      <div className="px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-[#03373D]">
          We've helped thousands of sales teams
        </h2>

        <Marquee speed={100} gradient={false} pauseOnHover>
          <div className="flex items-center gap-8">
            {brands.map((brand, index) => (
              <img
                key={index}
                src={brand}
                alt={`Brand ${index + 1}`}
                className="h-6 md:h-7 w-auto object-contain"
              />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default BrandsMarquee;
