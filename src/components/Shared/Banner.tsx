import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "../../styles.css";

import { Autoplay } from "swiper/modules";
const Banner = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide
        style={{
          backgroundImage:
            "url('https://motto-spin.myshopify.com/cdn/shop/files/11.jpg?v=1729594515&width=1400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold sm:text-6xl md:text-8xl">
            Explore the Outdoors
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl">
            Discover new adventures with our top-quality bicycles built for
            every terrain.
          </p>
        </div>
      </SwiperSlide>

      <SwiperSlide
        style={{
          backgroundImage:
            "url('https://motto-spin.myshopify.com/cdn/shop/files/2.jpg?v=1729514278&width=3840')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold sm:text-6xl md:text-8xl">
            Ride with Confidence
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl">
            Experience smooth and safe cycling with our cutting-edge bike
            technology.
          </p>
        </div>
      </SwiperSlide>

      <SwiperSlide
        style={{
          backgroundImage:
            "url('https://motto-spin.myshopify.com/cdn/shop/files/3.jpg?v=1729514278&width=3840')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold sm:text-6xl md:text-8xl">
            Adventure Awaits
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl">
            Join the cycling revolution and explore new paths with our premium
            bikes.
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
