import { useState } from "react";
import { Modal, Input, FileInput } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import ReactPlayer from "react-player";
import SubmitButton from "~/@main/components/SubmitButton";
import { useParams } from "react-router-dom";
import AppUtils from "~/@main/utils/AppUtils";
import { axiosInstance } from "~/app/configs/dataService";
import { useAddEventVideoMutation } from "~/app/store/user/userApi";

type Props = {
  refetch: any;
  videoUrl: string | undefined;
};

const UploadMedia = ({ refetch, videoUrl }: Props) => {
  const [opened, setOpened] = useState(false);
  const [link, setLink] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { album_id, id } = useParams();
  const [images, setImages] = useState<any>(null);
  const [addEventVideo] = useAddEventVideoMutation();

  const upload = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    // Youtube link upload
    if (link) {
      addEventVideo({ event_id: album_id || id, video: link })
        .then((res) => {
          setIsLoading(false);
          setOpened(false);
          setLink("");
          AppUtils.showNotificationFun("Success", "Done", "Media Added");
        })
        .catch((err) => {
          AppUtils.showNotificationFun("Error", "Sorry", "Can't add Media now");
          setIsLoading(false);
        });
    }

    if (images) {
      // take these steps if there are an image to upload
      const formData = new FormData();
      const resizedImages = [];
      for (let img of images) {
        const resizer = await AppUtils.resizeImage(img);
        resizedImages.push(resizer);
        formData.append("file", resizer as string);
      }
      setIsLoading(true);
      let uploadFileUrl = `user-generals/add-event-files/${album_id || id}/`;

      try {
        axiosInstance
          .post(uploadFileUrl, formData)
          .then((res) => {
            setIsLoading(false);
            setOpened(false);
            setLink("");
            AppUtils.showNotificationFun("Success", "Done", "Media Added");
            setImages(null);
            refetch();
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            AppUtils.showNotificationFun(
              "Error",
              "Sorry",
              "Can't add Media now"
            );
          });
      } catch (err) {
        AppUtils.showNotificationFun("Error", "Sorry", "Can't add Media now");
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <div
        onClick={() => setOpened(true)}
        className="z-50 flex flex-col items-center justify-center transform transition-all hover:scale-105  fixed right-10 bottom-10 opacity-70 hover:opacity-100 w-10 h-10 rounded-full cursor-pointer bg-perfBlue text-white"
      >
        <AppIcons
          className="w-6 h-6 text-white"
          icon="ArrowUpTrayIcon:outline"
        />
        <span></span>
      </div>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Upload Media"
      >
        <div className="m-6">
          <ReactPlayer
            width={"100%"}
            height={"100%"}
            controls={true}
            url={link}
          />
        </div>

        <form onSubmit={upload} className="flex flex-col gap-4">
          <Input
            type="text"
            name="youtubeLink"
            placeholder="Add youtube Link"
            onChange={(v: any) => setLink(v.target.value)}
            sx={{
              ".mantine-Input-input": {
                borderColor: "rgb(47 128 237)",
                color: "rgb(47 128 237)",
              },
            }}
          />

          <FileInput
            multiple
            sx={{
              ".mantine-Input-input": {
                borderColor: "rgb(47 128 237)",
                color: "rgb(47 128 237)",
              },
            }}
            placeholder="Upload Images"
            onChange={(e) => {
              setImages(e);
            }}
            name="file"
            accept="image/png,image/jpeg"
            // multiple
          />

          <SubmitButton isLoading={isLoading} text="Upload" />
        </form>
      </Modal>
    </div>
  );
};

export default UploadMedia;
