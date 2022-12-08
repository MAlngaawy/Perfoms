import { useState, ReactNode } from "react";
import { Modal, Button, Group, Input } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Resizer from "react-image-file-resizer";
import cn from "classnames";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import AppIcons from "../../../../../@main/core/AppIcons";
import { DatePicker } from "@mantine/dates";
import { useParams } from "react-router-dom";
import { useSuperClubQuery } from "~/app/store/supervisor/supervisorMainApi";
import AppUtils from "~/@main/utils/AppUtils";
import { axiosInstance } from "~/app/configs/dataService";
import { showNotification } from "@mantine/notifications";

type Props = {
  refetch: any;
};

const AddEventForm = ({ refetch }: Props) => {
  const [opened, setOpened] = useState(false);
  const [playerImage, setPlayerImage] = useState<string | unknown>();
  const [playerImagePreview, setPlayerImagePreview] = useState("null");
  const [value, setValue] = useState<any>();
  const { id: team_id } = useParams();
  const { data: clubData } = useSuperClubQuery({});

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

  // Submit Form Function
  const onSubmitFunction = (e: any) => {
    e.preventDefault();
    console.log(e.currentTarget);

    const paramData = {
      team: team_id,
      club: clubData?.id,
    };
    console.log(paramData);
    const formData = new FormData(e.currentTarget);
    formData.append("team", team_id || "0");
    formData.append("club", JSON.stringify(clubData?.id));

    axiosInstance
      .post("supervisor/add-event/", formData)
      .then(() => {
        showNotification({
          message: "Event Created",
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
        refetch();
        setOpened(false);
      })
      .catch((err) => {
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

    setPlayerImagePreview("null");
    reset({
      eventName: "",
      eventLocation: "",
    });
  };

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
                    " absolute rounded-lg w-full -h-full max-w-full max-h-full object-cover left-0 top-0",
                    {
                      hidden: !playerImage,
                    }
                  )}
                  src={playerImagePreview && playerImagePreview}
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
                {...register("name")}
                id="name"
                name="name"
              />
            </Input.Wrapper>

            <Controller
              {...register("date")}
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
                    error={
                      errors.eventDate &&
                      (errors.eventDate.message as ReactNode)
                    }
                    placeholder="Pick the event date"
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

            <SubmitButton isLoading={false} text="Add Event" />
          </form>
        </Modal>

        <Group position="left">
          <button
            className="px-6 py-2 my-2 bg-slate-300 text-perfGray3 rounded-3xl"
            onClick={() => setOpened(true)}
          >
            + Add Event
          </button>
        </Group>
      </>
    </div>
  );
};

export default AddEventForm;
