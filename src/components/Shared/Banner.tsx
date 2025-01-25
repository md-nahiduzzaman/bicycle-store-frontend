// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper-bundle.css";

import "../../styles.css";

// import required modules
import { Autoplay } from "swiper/modules";
import { Button } from "../ui/button";

const Banner = () => {
  return (
    <>
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
              "url('https://motto-spin.myshopify.com/cdn/shop/files/1_953db9b2-4f47-4461-b7b7-0c57b9cf63f0.jpg?v=1729514278&width=3840')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {
            <div className="">
              <h1 className="">Explore the Outdoors</h1>
              <p className="mt-4 text-lg text-white">
                Discover new adventures with our top-quality bicycles built for
                every terrain.
              </p>
              <Button className="mt-6">Shop Now</Button>
            </div>
          }
        </SwiperSlide>

        <SwiperSlide
          style={{
            backgroundImage:
              "url('https://motto-spin.myshopify.com/cdn/shop/files/1_953db9b2-4f47-4461-b7b7-0c57b9cf63f0.jpg?v=1729514278&width=3840')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          Slide 2
        </SwiperSlide>

        <SwiperSlide
          style={{
            backgroundImage:
              "url('https://motto-spin.myshopify.com/cdn/shop/files/1_953db9b2-4f47-4461-b7b7-0c57b9cf63f0.jpg?v=1729514278&width=3840')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          Slide 3
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
