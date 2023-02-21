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
  useGetEventFilesQuery,
  useRemoveEventVideoMutation,
} from "~/app/store/user/userApi";
import AppUtils from "~/@main/utils/AppUtils";
import { useParams } from "react-router-dom";

type Props = {
  images: { id?: number; file?: string }[];
  isLoading: boolean;
  eventId: number | string | undefined;
  video_url?: string;
};

const Slider = ({ images, isLoading, video_url, eventId }: Props) => {
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
            <div className="relative HHHHHHHHHHHHH">
              <SwiperSlide>
                <div className=" relative flex justify-center items-center w-40 h-40 xs:w-3/5 xs:h-96 mx-auto">
                  <DeleteVideoButton eventId={eventId} />
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
            </div>
          )}
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

const DeleteVideoButton = ({
  eventId,
}: {
  eventId: number | string | undefined;
}) => {
  const [removeVideo] = useRemoveEventVideoMutation();
  // const { album_id } = useParams();
  const { refetch } = useGetEventFilesQuery(
    { event_id: eventId },
    { skip: !eventId }
  );
  const deleteFun = () => {
    const data = {
      video_url: null,
    };
    removeVideo({ event_id: eventId, ...data })
      .then((res) => {
        AppUtils.showNotificationFun("Success", "Done", "Video Deleted");
        refetch();
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
