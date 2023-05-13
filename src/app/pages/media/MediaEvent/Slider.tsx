import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactPlayer from "react-player/youtube";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Avatar, Image, Skeleton } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import {
  useDeleteEventFileMutation,
  useDeleteEventVideoMutation,
  useGetEventFilesQuery,
  useGetEventVideoQuery,
  useRemoveEventVideoMutation,
} from "~/app/store/user/userApi";
import AppUtils from "~/@main/utils/AppUtils";
import { useParams } from "react-router-dom";

type Props = {
  images: { id?: number; file?: string }[];
  isLoading: boolean;
  eventId: number | string | undefined;
  // video_url?: string;
};

const Slider = ({ images, isLoading, eventId }: Props) => {
  const { data: eventVideos } = useGetEventVideoQuery(
    { event_id: eventId },
    { skip: !eventId }
  );

  console.log("eventVideos", eventVideos);

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
          {eventVideos &&
            eventVideos.event_videos.map((vid) => {
              return (
                <div className="relative">
                  <SwiperSlide>
                    <div className=" relative flex justify-center items-center w-40 h-40 xs:w-3/5 xs:h-96 mx-auto">
                      <DeleteVideoButton video_id={vid.id} />
                      <ReactPlayer
                        width={"100%"}
                        height={"100%"}
                        controls={true}
                        url={vid.video}
                      />
                    </div>
                  </SwiperSlide>
                </div>
              );
            })}
          {images.length ? (
            images.map((image) => {
              return (
                <SwiperSlide key={image.id}>
                  <OneSlide
                    id={image.id}
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

const OneSlide = ({
  imageLink,
  id,
}: {
  imageLink: string;
  id: number | undefined;
}) => {
  const [deleteImage] = useDeleteEventFileMutation();
  return (
    <div className=" flex justify-center relative items-center w-11/12 sm:w-3/5 h-96 mx-auto">
      <div className="absolute z-10 top-5 right-5 bg-white p-1 rounded-full shadow-lg">
        <DeleteButton
          type="Image"
          name=""
          deleteFun={() => {
            deleteImage({ file_id: id })
              .then((res) =>
                AppUtils.showNotificationFun(
                  "Success",
                  "Done",
                  "Image deleted Successfully"
                )
              )
              .catch((err) =>
                AppUtils.showNotificationFun(
                  "Error",
                  "Sorry",
                  "Try again later"
                )
              );
          }}
        />
      </div>
      <Image className="w-full full object-cover" src={imageLink} />
    </div>
  );
};

const DeleteVideoButton = ({ video_id }: { video_id: number }) => {
  const [removeVideo] = useDeleteEventVideoMutation();

  const deleteFun = () => {
    removeVideo({ video_id: video_id })
      .then((res) => {
        AppUtils.showNotificationFun("Success", "Done", "Video Deleted");
      })
      .catch((err) => {
        AppUtils.showNotificationFun(
          "Error",
          "Sorry",
          "Can't delete video now"
        );
      });
  };

  return (
    <div className=" absolute right-5 top-5 bg-white p-1 rounded-full">
      <DeleteButton deleteFun={deleteFun} name="event" type="video" />
    </div>
  );
};
