import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";

import imageOne from "../../../assets/img/pages/about/gallery/1.png";
import imageTwo from "../../../assets/img/pages/about/gallery/2.png";
import imageThree from "../../../assets/img/pages/about/gallery/3.jpg";
import imageFour from "../../../assets/img/pages/about/gallery/4.png";
import imageFive from "../../../assets/img/pages/about/gallery/5.png";

const images = [
  imageOne.src,
  imageTwo.src,
  imageThree.src,
  imageFour.src,
  imageFive.src,
];

export const Gallery = () => {
  const swiperRef = useRef(null);
  const lgRef = useRef(null);

  return (
    <LightGallery
      onInit={(detail) => {
        lgRef.current = detail.instance;
      }}
      dynamic={true}
      dynamicEl={images.map((src) => ({
        src,
        thumb: src,
      }))}
      onBeforeSlide={({ index }) => {
        if (swiperRef) swiperRef.current?.slideToLoop(index, 0);
      }}
      plugins={[lgThumbnail]}
      speed={500}
      elementClassNames="lg-wrapper"
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Pagination, Autoplay]}
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides
        breakpoints={{
          480: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        grabCursor
        slideToClickedSlide
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              onClick={() => {
                const swiper = swiperRef.current;

                if (!swiper) return;

                // Only allow fullscreen for active slides
                if (swiper.realIndex === index) {
                  lgRef.current?.openGallery(index);
                }
              }}
              className="h-[350px] w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </LightGallery>
  );
};
