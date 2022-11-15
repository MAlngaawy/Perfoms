import { useState, ReactNode } from "react";
import { Modal, Button, Group, Input } from "@mantine/core";
import AppIcons from "./../../../../../@main/core/AppIcons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Resizer from "react-image-file-resizer";
import cn from "classnames";
import SubmitButton from "./../../../../../@main/components/SubmitButton";
import PerfSelect from "./../../../../../@main/components/Select";

type Props = {};

const AddTeamCardForm = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const [playerImage, setPlayerImage] = useState<string | unknown>("");
  const [playerImagePreview, setPlayerImagePreview] = useState("null");

  const schema = yup.object().shape({
    image: yup.mixed(),
    ratingSchedule: yup.string().required("please chose the rating schedule"),
    name: yup.string().required("please add the team name"),
    sport: yup.string().required("please choose the sport"),
    maxPlayersNumber: yup.number(),
    fromAge: yup.number(),
    toAge: yup.number(),
  });

  const resetFields = () => {
    setPlayerImage(null);
    reset({
      image: "",
      ratingSchedule: "",
      name: "",
      sport: "",
      maxPlayersNumber: "",
      fromAge: "",
      toAge: "",
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit Form Function
  const onSubmitFunction = (data: any) => {
    console.log({ ...data, icon: playerImage });
    setOpened(false);
    resetFields();
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
            resetFields();
            setOpened(false);
          }}
          title="Add Team"
        >
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmitFunction)}
          >
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
                  src={playerImagePreview && playerImagePreview}
                  alt="upload icon"
                />
                <Input
                  hidden
                  accept="image/*"
                  {...register("image")}
                  name="image"
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

            <PerfSelect
              control={control}
              placeholder="Rating Schedule"
              data={[
                { label: "Every Week", value: "Every Week" },
                { label: "Every 2 Week", value: "Every 2 Week" },
                { label: "Every 1 Month", value: "Every 1 Month" },
              ]}
              name="ratingSchedule"
              error={
                errors.ratingSchedule &&
                (errors.ratingSchedule.message as ReactNode)
              }
            />

            <Input.Wrapper
              id="name"
              withAsterisk
              // label="Name"
              error={errors.name && (errors.name.message as ReactNode)}
            >
              <Input
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

            <PerfSelect
              control={control}
              placeholder="Select Sport"
              data={[
                { label: "Sport One", value: "Sport One" },
                { label: "Sport Two", value: "Sport Two" },
                { label: "Sport Three", value: "Sport Three" },
              ]}
              name="sport"
              error={errors.sport && (errors.sport.message as ReactNode)}
            />

            <Input.Wrapper
              id="maxPlayersNumber"
              withAsterisk
              // label="Name"
              error={
                errors.maxPlayersNumber &&
                (errors.maxPlayersNumber.message as ReactNode)
              }
            >
              <Input
                placeholder="Max Players Number"
                type="number"
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
                {...register("maxPlayersNumber")}
                id="maxPlayersNumber"
              />
            </Input.Wrapper>

            <Input.Wrapper
              id="fromAge"
              withAsterisk
              // label="Name"
              error={errors.fromAge && (errors.fromAge.message as ReactNode)}
            >
              <Input
                placeholder="From Age"
                type="number"
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
                {...register("fromAge")}
                id="fromAge"
              />
            </Input.Wrapper>

            <Input.Wrapper
              id="toAge"
              withAsterisk
              // label="Name"
              error={errors.fromAge && (errors.fromAge.message as ReactNode)}
            >
              <Input
                placeholder="To Age"
                type="number"
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
                {...register("toAge")}
                id="toAge"
              />
            </Input.Wrapper>

            <SubmitButton isLoading={false} text="Add Team" />
          </form>
        </Modal>

        <Group position="center" className="h-full">
          <div
            onClick={() => setOpened(true)}
            className="team-card h-full group hover:bg-white cursor-pointer  relative w-full xs:w-72 bg-slate-300 p-8 rounded-xl flex flex-col justify-center items-center gap-4"
          >
            <AppIcons
              className="text-perfGray2 w-16 h-16 group-hover:text-perfBlue"
              icon="PlusIcon:outline"
            />
            <span className="text-perfGray2 text-xl group-hover:text-perfBlue">
              Add Team
            </span>
          </div>
        </Group>
      </>
    </div>
  );
};

export default AddTeamCardForm;
