import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactPlayer from "react-player/youtube";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Avatar, Image, Skeleton } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";

type Props = {
  images: { id?: number; file?: string }[];
  isLoading: boolean;
  video_url?: string;
};

const Slider = ({ images, isLoading, video_url }: Props) => {
  return (
    <div className=" flex justify-center items-center">
      {isLoading ? (
        <Skeleton height={300} radius="xl" />
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          pagination={{ clickable: true }}
          // wrapperClass="flex items-center"
          navigation={{
            enabled: true,
          }}
        >
          {video_url && (
            <SwiperSlide>
              <div className=" flex justify-center items-center w-40 h-40 xs:w-3/5 xs:h-96 mx-auto">
                <ReactPlayer
                  width={"100%"}
                  height={"100%"}
                  controls={true}
                  url={
                    video_url || "https://www.youtube.com/watch?v=cz7cctS3eHQ"
                  }
                />
              </div>
            </SwiperSlide>
          )}
          {images.length ? (
            images.map((image) => {
              return (
                <SwiperSlide key={image.id}>
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
              <div className="bg-perfOfWhite p-10 h-full w-full  sm:w-8/12 mx-auto text-center font-semibold text-3xl rounded-xl text-perfGray3 flex flex-col justify-center items-center">
                <AppIcons className="w-32 " icon="FolderOpenIcon:outline" />
                <h2>No Media Here Yet !</h2>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      )}
    </div>
  );
};

export default Slider;

const OneSlide = ({ imageLink }: { imageLink: string }) => {
  return (
    <div className=" flex justify-center items-center w-11/12 sm:w-3/5 h-96 mx-auto">
      <Image className="w-full full object-cover" src={imageLink} />
    </div>
  );
};
