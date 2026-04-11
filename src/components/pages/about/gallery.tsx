//import Swiper from "swiper";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import imageOne from "../../../assets/img/pages/about/gallery/1.png";
import imageTwo from "../../../assets/img/pages/about/gallery/2.png";
import imageThree from "../../../assets/img/pages/about/gallery/3.jpg";
import imageFour from "../../../assets/img/pages/about/gallery/4.png";
import imageFive from "../../../assets/img/pages/about/gallery/5.png";

export const Gallery = () => {
  return (
    <Swiper
      /*spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      */
      /*effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}*/
      slidesPerView={3}
      spaceBetween={30}
      /* pagination={{
        clickable: true,
      }}*/
      centeredSlides={true}
      initialSlide={1}
      modules={[Pagination]}
      loop={true}
      grabCursor={true}
      slideToClickedSlide={true}
    >
      <SwiperSlide>
        <img
          src={imageOne.src}
          className="h-[400px] w-full rounded-[3rem] object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={imageTwo.src}
          className="h-[400px] w-full rounded-[3rem] object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={imageThree.src}
          className="h-[400px] w-full rounded-[3rem] object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={imageFour.src}
          className="h-[400px] w-full rounded-[3rem] object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={imageFive.src}
          className="h-[400px] w-full rounded-[3rem] object-cover"
        />
      </SwiperSlide>
    </Swiper>
  );
};
