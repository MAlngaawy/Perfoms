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
import { useAdminPillarsQuery } from "~/app/store/clubManager/clubManagerApi";
import { useSuperPillarsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {
  pillarData: Pillar;
};

const EditPillar = ({ pillarData }: Props) => {
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const { data: user } = useUserQuery({});
  const { sport_id } = useParams();
  const [playerImage, setPlayerImage] = useState<string | unknown>("");
  const [playerImagePreview, setPlayerImagePreview] = useState("null");
  const { refetch: refetchAdminPillars } = useAdminPillarsQuery(
    { sport_id: sport_id },
    { skip: !sport_id }
  );
  const { refetch: refetchSuperPillars } = useSuperPillarsQuery(
    { sport_id: sport_id },
    { skip: !sport_id }
  );

  const {
    register,
    formState: { errors },
    reset,
  } = useForm({});

  // Submit Form Function
  const onSubmitFunction = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setIsLoading(true);
      axiosInstance
        .patch(
          user?.user_type === "Supervisor"
            ? `supervisor/sports/pillars/${pillarData.id}/update/`
            : `club-manager/sports/pillars/${pillarData.id}/update/`,
          formData
        )
        .then((res) => {
          setIsLoading(false);
          setOpened(false);
          if (user?.user_type === "Supervisor") {
            refetchSuperPillars();
          } else {
            refetchAdminPillars();
          }
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Pillar Updated Successfl"
          );
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.response.data.message);
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Can't Update Pillar Now"
          );
        });
    } catch (err) {
      setIsLoading(false);
      AppUtils.showNotificationFun("Error", "Sorry", "Can't Update Pillar Now");
    }

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
                  className={cn(
                    " absolute rounded-lg w-full -h-full max-w-full max-h-full object-cover left-0 top-0"
                  )}
                  src={playerImage ? playerImagePreview : pillarData.icon}
                  alt="upload icon"
                />
                <Input
                  hidden
                  accept="image/*"
                  {...register("image")}
                  name="icon"
                  multiple
                  type="file"
                  // error={errors.image && (errors.image.message as ReactNode)}
                  onChange={(e: any) => {
                    console.log(e.target.files[0]);
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
            <SubmitButton isLoading={isLoading} text="Edit Pillar" />
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
