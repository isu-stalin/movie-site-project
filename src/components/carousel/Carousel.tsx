import React, { useState } from "react";
import { useMovie } from "@/api/hooks/useMovie";
import { IMAGE_URL } from "@/const";
import type { IMovie } from "@/types";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay, Navigation } from "swiper/modules";

import "swiper/swiper-bundle.css";
// import "swiper/css/thumbs";
// import "swiper/css/navigation";

const Carousel = () => {
  const navigate = useNavigate();
  const { getMovies } = useMovie();
  const { data } = getMovies({ page: 1 });
  const movies: IMovie[] = data?.results?.slice(0, 5) || [];
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="container mx-auto overflow-hidden py-4 mb-10">
      <Swiper
        modules={[Thumbs, Autoplay, Navigation]}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop
        className="mb-4"
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="relative cursor-pointer rounded-lg overflow-hidden"
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              <img
                src={IMAGE_URL + movie.backdrop_path}
                alt={movie.title}
                className="w-full max-h-[400px] object-cover"
              />
              <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full p-4 text-white">
                <h2 className="text-2xl font-bold">{movie.title}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev !text-red-500 !w-10 !h-10 !left-2" />
        <div className="swiper-button-next !text-red-500 !w-10 !h-10 !right-2" />
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        spaceBetween={10}
        className="w-[600px]"
        watchSlidesProgress
        modules={[Thumbs]}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative">
              <img
                src={IMAGE_URL + movie.backdrop_path}
                alt={movie.title}
                className="rounded-md cursor-pointer object-cover max-h-20 w-full"
              />
              <div className="absolute inset-0 border-2 border-transparent swiper-slide-thumb-active:border-red-500 rounded-md pointer-events-none" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(Carousel);
