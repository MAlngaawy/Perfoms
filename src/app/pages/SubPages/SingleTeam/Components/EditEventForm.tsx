import { useState, ReactNode, useEffect } from "react";
import { Modal, Button, Group, Input } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Resizer from "react-image-file-resizer";
import cn from "classnames";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import AppIcons from "../../../../../@main/core/AppIcons";
import { DatePicker } from "@mantine/dates";
import AppUtils from "~/@main/utils/AppUtils";
import { axiosInstance } from "~/app/configs/dataService";
import { showNotification } from "@mantine/notifications";
import { useParams } from "react-router-dom";
import { useSuperClubQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminClubQuery } from "~/app/store/clubManager/clubManagerApi";
import { ParentClub } from "~/app/store/types/parent-types";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {
  event: {
    icon: string;
    name: string;
    date: string;
    address?: string;
    id: number;
  };
  refetch: any;
};

const EditEventForm = ({ event, refetch }: Props) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerImage, setPlayerImage] = useState<string | unknown>("");
  const [playerImagePreview, setPlayerImagePreview] = useState("null");
  const [clubData, setclubData] = useState<ParentClub>();
  const { team_id } = useParams();
  const { data: superClubData } = useSuperClubQuery({});
  const { data: adminClubData } = useAdminClubQuery({});
  const { data: user } = useUserQuery({});

  useEffect(() => {
    if (superClubData) setclubData(superClubData);
    if (adminClubData) setclubData(adminClubData);
  }, [superClubData, adminClubData]);

  const schema = yup.object().shape({
    eventName: yup.string().required("please add the Event name"),
    eventDate: yup.date().required("Please add the event date"),
    eventLocation: yup.string().required("please add the Event Location"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // function to access file uploaded then convert to base64 then add it to the data state
  const uploadImage = async (e: any) => {
    try {
      const file = e.target.files[0];
      const image = await AppUtils.resizeImage(file);
      setPlayerImage(image);
    } catch (err) {
      console.log(err);
    }
  };

  // Submit Form Function
  const onSubmitFunction = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const paramData = {
      team: team_id,
      club: clubData?.id,
    };
    console.log(paramData);
    const formData = new FormData(e.currentTarget);
    formData.append("team", team_id || "0");
    formData.append("club", JSON.stringify(clubData?.id));
    if (playerImage) {
      formData.set("icon", playerImage as string);
    }

    axiosInstance
      .patch(
        user?.user_type === "Supervisor"
          ? `supervisor/events/${event.id}/update/`
          : `club-manager/teams/events/${event.id}/update/`,
        formData
      )
      .then(() => {
        setLoading(false);
        refetch();
        setOpened(false);
        showNotification({
          message: "Event Updated",
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

        setPlayerImagePreview("null");
        reset({
          eventName: "",
          eventLocation: "",
        });
      })
      .catch((err) => {
        setLoading(false);
        setPlayerImagePreview("null");
        reset({
          eventName: "",
          eventLocation: "",
        });
        showNotification({
          message: "please try again",
          color: "ref",
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
      });
  };

  const [changed, setChanged] = useState(false);

  return (
    <div>
      <>
        <Modal opened={opened} onClose={() => setOpened(false)}>
          <form className="flex flex-col gap-4" onSubmit={onSubmitFunction}>
            {/* Image Upload */}
            <div className=" relative my-2 bg-gray-300 overflow-hidden flex justify-center  items-center  mx-auto w-28  h-28 rounded-lg ">
              <Button
                // {...register("image")}
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
                    " absolute rounded-lg w-full -h-full max-w-full max-h-full object-cover left-0 top-0"
                  )}
                  src={playerImage ? playerImagePreview : event.icon}
                  alt="upload icon"
                />
                <Input
                  hidden
                  accept="image/*"
                  // {...register("icon")}
                  name={changed ? "icon" : ""}
                  multiple
                  type="file"
                  // error={errors.image && (errors.image.message as ReactNode)}
                  onChange={(e: any) => {
                    setChanged(true);
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
              id="eventName"
              withAsterisk
              error={
                errors.eventName && (errors.eventName.message as ReactNode)
              }
            >
              <Input
                defaultValue={event.name}
                placeholder="Event Name"
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
                // {...register("name")}
                id="name"
                name="name"
              />
            </Input.Wrapper>

            <Controller
              {...register("eventDate")}
              control={control}
              render={({ field }) => {
                return (
                  <DatePicker
                    name="date"
                    inputFormat="YYYY-MM-DD"
                    sx={{
                      ".mantine-DatePicker-input": {
                        border: 0,
                        padding: 0,
                        borderBottom: 1,
                        borderStyle: "solid",
                        borderRadius: 0,
                        minHeight: 20,
                      },
                    }}
                    onChange={field.onChange}
                    defaultValue={new Date(event.date)}
                    error={
                      errors.eventDate &&
                      (errors.eventDate.message as ReactNode)
                    }
                    placeholder={"Add Event Date"}
                  />
                );
              }}
            />

            <Input.Wrapper
              id="eventLocation"
              withAsterisk
              error={
                errors.eventLocation &&
                (errors.eventLocation.message as ReactNode)
              }
            >
              <Input
                placeholder="Event Location"
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
                {...register("eventLocation")}
                id="eventLocation"
              />
            </Input.Wrapper>

            <SubmitButton isLoading={loading} text="Edit Event" />
          </form>
        </Modal>

        <Group position="center">
          <button
            className="transform hover:scale-125"
            onClick={() => setOpened(true)}
          >
            <AppIcons
              className="w-4 h-4 text-perfGray3 hover:text-blue-300"
              icon={"PencilSquareIcon:outline"}
            />
          </button>
        </Group>
      </>
    </div>
  );
};

export default EditEventForm;
