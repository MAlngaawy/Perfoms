import { useState, ReactNode, useEffect } from "react";
import { Modal, Button, Group, Input } from "@mantine/core";
import AppIcons from "../../../core/AppIcons";
import { useForm } from "react-hook-form";
import cn from "classnames";
import SubmitButton from "../../SubmitButton";
import { Sport } from "~/app/store/types/parent-types";
import { showNotification } from "@mantine/notifications";
import { axiosInstance } from "~/app/configs/dataService";
import {
  useAdminClubQuery,
  useAdminSportsQuery,
} from "~/app/store/clubManager/clubManagerApi";

type Props = {
  sportData: Partial<Sport>;
};

const EditSport = ({ sportData }: Props) => {
  const [opened, setOpened] = useState(false);
  const [playerImage, setPlayerImage] = useState<string | unknown>("");
  const [playerImagePreview, setPlayerImagePreview] = useState<string>();
  const { data: adminClub } = useAdminClubQuery({});
  const { refetch } = useAdminSportsQuery({});
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Submit Form Function
  const onSubmitFunction = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    // if there is no image added .. remove epty icon
    if (!playerImagePreview) formData.delete("icon");

    if (adminClub?.id) {
      formData.append("club", JSON.stringify(adminClub?.id));
    }
    axiosInstance
      .patch(`/club-manager/sports/${sportData.id}/update/`, formData)
      .then(() => {
        showNotification({
          message: "Successfully Added Sport",
          color: "green",
          title: "Done",
          styles: {
            root: {
              backgroundColor: "#27AE60",
              borderColor: "#27AE60",
              "&::before": { backgroundColor: "#fff" },
            },

            title: { color: "#fff" },
            description: { color: "#fff" },
            closeButton: {
              color: "#fff",
            },
          },
        });
        setOpened(false);
        setLoading(false);
        refetch();
      })
      .catch((err) => {
        console.log(err);

        showNotification({
          message: err.response.data.message,
          color: "red",
          title: "Wrong",
          styles: {
            root: {
              backgroundColor: "#EB5757",
              borderColor: "#EB5757",
              "&::before": { backgroundColor: "#fff" },
            },

            title: { color: "#fff" },
            description: { color: "#fff" },
            closeButton: {
              color: "#fff",
            },
          },
        });
        setLoading(false);
      });
  };

  // function to access file uploaded then convert to base64 then add it to the data state
  const uploadImage = async (e: any) => {
    try {
      const file = e.target.files[0];
      setPlayerImage(file);
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
          title={`Edit (${sportData.name}) Sport `}
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
                    " absolute rounded-lg w-full h-full object-cover left-0 top-0"
                  )}
                  src={playerImage ? playerImagePreview : sportData.icon_url}
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
            </div>

            <Input.Wrapper
              id="name"
              withAsterisk
              // label="Name"
              error={errors.name && (errors.name.message as ReactNode)}
            >
              <Input
                placeholder="Name"
                defaultValue={sportData.name}
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
            <SubmitButton isLoading={loading} text="Edit Sport" />
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

export default EditSport;
