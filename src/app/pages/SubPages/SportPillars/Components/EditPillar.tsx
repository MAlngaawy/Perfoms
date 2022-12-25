import { useState, ReactNode } from "react";
import { Modal, Button, Group, Input } from "@mantine/core";
import AppIcons from "../../../../../@main/core/AppIcons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Resizer from "react-image-file-resizer";
import cn from "classnames";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { Pillar } from "~/app/store/types/supervisor-types";
import { axiosInstance } from "~/app/configs/dataService";

type Props = {
  pillarData: Pillar;
};

const EditPillar = ({ pillarData }: Props) => {
  console.log(pillarData);

  const [opened, setOpened] = useState(false);
  const [playerImage, setPlayerImage] = useState<string | unknown>(
    pillarData.icon
  );
  const [playerImagePreview, setPlayerImagePreview] =
    useState<string | undefined>();

  const {
    register,
    formState: { errors },
    reset,
  } = useForm({});

  // Submit Form Function
  const onSubmitFunction = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // axiosInstance.patch();
    setOpened(false);
  };

  // Image Functions
  // Resize the image size
  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        100,
        100,
        "JPEG",
        100,
        0,
        (uri: any) => {
          resolve(uri);
        },
        "base64"
      );
    });

  // function to access file uploaded then convert to base64 then add it to the data state
  const uploadImage = async (e: any) => {
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      console.log(image);
      setPlayerImage(image);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <>
        <Modal
          opened={opened}
          onClose={() => {
            setOpened(false);
          }}
          title={`Edit ${pillarData.name} pillar `}
        >
          <form className="flex flex-col gap-4" onSubmit={onSubmitFunction}>
            {/* Image Upload */}
            <div className=" relative my-2 bg-gray-300 overflow-hidden flex justify-center  items-center  mx-auto w-28  h-28 rounded-lg ">
              <Button
                {...register("image")}
                className="w-full h-full hover:bg-perfGray3"
                component="label"
              >
                <img
                  className={cn("", {
                    hidden: playerImage,
                  })}
                  src="/assets/images/Vector.png"
                  alt="upload icon"
                />
                <img
                  className={cn(
                    " absolute rounded-lg w-full -h-full max-w-full max-h-full object-cover left-0 top-0",
                    {
                      hidden: !playerImage,
                    }
                  )}
                  src={
                    (playerImagePreview && playerImagePreview) ||
                    (playerImage as string)
                  }
                  alt="upload icon"
                />
                <Input
                  hidden
                  accept="image/*"
                  {...register("icon")}
                  name="icon"
                  multiple
                  type="file"
                  // error={errors.image && (errors.image.message as ReactNode)}
                  onChange={(e: any) => {
                    setPlayerImagePreview(
                      URL.createObjectURL(e.target.files[0])
                    );
                    uploadImage(e);
                  }}
                />
              </Button>
              {/* {errors.image && (
                <p className="text-red text-xs text-left">File is required!</p>
              )} */}
            </div>

            <Input.Wrapper
              id="name"
              withAsterisk
              // label="Name"
              error={errors.name && (errors.name.message as ReactNode)}
            >
              <Input
                defaultValue={pillarData.name}
                placeholder="Name"
                sx={{
                  ".mantine-Input-input	": {
                    border: 0,
                    padding: 0,
                    borderBottom: 1,
                    borderStyle: "solid",
                    borderRadius: 0,
                    minHeight: 20,
                  },
                }}
                className="border-b"
                {...register("name")}
                id="name"
              />
            </Input.Wrapper>
            <SubmitButton isLoading={false} text="Edit Kpi" />
          </form>
        </Modal>

        <Group position="center">
          <button
            className="transform hover:scale-150"
            onClick={() => setOpened(true)}
          >
            <AppIcons
              className="w-4 h-4 text-perfGray3"
              icon="PencilSquareIcon:outline"
            />
          </button>
        </Group>
      </>
    </div>
  );
};

export default EditPillar;
