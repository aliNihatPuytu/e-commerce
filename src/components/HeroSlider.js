import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import heroImg from "../assets/images/hero-image.jpg";

export default function HeroSlider() {
  return (
    <div className="flex w-full">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        className="w-full"
      >
        <SwiperSlide>
          <div className="flex w-full items-center justify-center px-4 pb-10 pt-6">
            <div className="relative flex w-full max-w-6xl overflow-hidden rounded-3xl bg-linear-to-r from-[#96E9FB] to-[#ABECD6]">
              <div className="flex w-full flex-col items-start justify-center gap-4 px-8 py-10 lg:w-1/2 lg:px-14">
                <div className="text-xs font-bold tracking-widest text-[#252B42]">
                  SUMMER 2020
                </div>
                <div className="text-4xl font-bold leading-tight text-[#252B42] sm:text-5xl">
                  NEW
                  <br />
                  COLLECTION
                </div>
                <div className="max-w-sm text-sm text-[#737373]">
                  We know how large objects will act, but things on a small scale.
                </div>
                <button
                  type="button"
                  className="rounded bg-[#23A6F0] px-8 py-3 text-sm font-bold text-white"
                >
                  SHOP NOW
                </button>
              </div>

              <div className="relative flex w-full items-center justify-center lg:w-1/2">
                <div className="absolute -right-30 -top-30 h-72 w-72 rounded-full bg-white/90 sm:h-80 sm:w-80 lg:h-96 lg:w-96" />
                <div className="absolute right-20 top-10 h-4 w-4 rounded-full bg-white/90" />
                <div className="absolute right-10 top-40 h-2 w-2 rounded-full bg-[#977DF4]" />
                <img
                  src={heroImg}
                  alt="hero"
                  className="relative z-10 h-72 w-full object-contain sm:h-80 lg:h-105"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
