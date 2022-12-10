import React, { useState } from "react";
import { Modal, Button, Group, Input, FileInput } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import ReactPlayer from "react-player";
import SubmitButton from "~/@main/components/SubmitButton";
import { axiosInstance } from "../../../configs/dataService";
import { useParams } from "react-router-dom";

type Props = {
  refetch: any;
};

const UploadForm = ({ refetch }: Props) => {
  const [opened, setOpened] = useState(false);
  const [link, setLink] = useState<string>();
  const [isError, setIsErrror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { id } = useParams();
  const [images, setImages] = useState<any>();

  const upload = (e: any) => {
    e.preventDefault();

    // Youtube link upload
    if (link) {
      const formData = new FormData();
      formData.append("video_url", link);
      setIsLoading(true);

      try {
        axiosInstance
          .patch(`supervisor/events/${id}/update/`, formData)
          .then((res) => {
            setIsLoading(false);
            setOpened(false);
            setLink("");
            refetch();
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      } catch (err) {
        setIsErrror(true);
        setIsLoading(false);
      }
    }

    if (images) {
      // take these steps if there are an image to upload
      const formData = new FormData();
      formData.append("file", images);
      setIsLoading(true);

      try {
        axiosInstance
          .post(`supervisor/add-event-files/${id}/`, formData)
          .then((res) => {
            setIsLoading(false);
            setOpened(false);
            setLink("");
            refetch();
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      } catch (err) {
        setIsErrror(true);
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
            sx={{
              ".mantine-Input-input": {
                borderColor: "rgb(47 128 237)",
                color: "rgb(47 128 237)",
              },
            }}
            placeholder="Upload files"
            onChange={(e) => {
              console.log(e);
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

export default UploadForm;