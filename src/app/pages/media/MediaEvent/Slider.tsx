import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Avatar, Image } from "@mantine/core";
type Props = {
  images: { id?: number; file?: string }[];
};

const Slider = ({ images }: Props) => {
  return (
    <div className="p-20 flex justify-center items-center">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        pagination={{ clickable: true }}
        navigation={{ enabled: true }}
      >
        {images.length ? (
          images.map((image) => {
            return (
              <SwiperSlide>
                <OneSlide
                  imageLink={
                    image.file ||
                    "https://shop.australiansportscamps.com.au/wp-content/uploads/2016/12/Benefits-Of-Team-Sports-For-Kids.jpg"
                  }
                />
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide>
            <div className="bg-perfOfWhite p-10 h-60 text-center font-bold text-3xl flex justify-center items-center">
              <h1>No Media Here</h1>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Slider;

const OneSlide = ({ imageLink }: { imageLink: string }) => {
  return (
    <div className="w-3/5 h-96 mx-auto">
      <Image className="w-full full object-cover" src={imageLink} />
    </div>
  );
};
