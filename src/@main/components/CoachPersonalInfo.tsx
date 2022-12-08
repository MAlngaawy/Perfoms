import React, { useState, ReactNode } from "react";
import {
  Grid,
  Button,
  Modal,
  Group,
  Input,
  Textarea,
  MultiSelect,
  Avatar,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import AppIcons from "../core/AppIcons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Resizer from "react-image-file-resizer";
import cn from "classnames";
import SubmitButton from "~/@main/components/SubmitButton";
import { useUserQuery } from "~/app/store/user/userApi";
import { usePlayerCoachQuery } from "~/app/store/parent/parentApi";
import { useParams } from "react-router-dom";

// Props Types
type Props = {
  id: number;
  role?: "Coach" | "Supervisor";
  photo?: string;
  name: string;
  sport?: string;
  bio?: string;
  teams: string[];
  education: {
    from?: string;
    to?: string;
    degree: string;
    universty?: string;
  }[];
  editMode?: boolean;
};

const CoachPersonalInfo = (props: Props) => {
  const [data, setData] = useState();

  const { data: user } = useUserQuery(null);
  console.log(user);

  const { id } = useParams();

  const { data: coachData } = usePlayerCoachQuery(
    { id: (id !== undefined && +id) || 1 },
    { skip: !id }
  );

  return (
    <div className="bg-white flex flex-col gap-4 h-full rounded-lg md:rounded-2xl p-4">
      <h3 className="text-base font-medium text-center">
        {props.role ? props.role : "Coach"}
      </h3>
      <div className="flex md:flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center">
          <Avatar
            className="w-32 h-32 object-cover transition-all delay-75 rounded-lg group-hover:border border-white box-border"
            src={
              user?.user_type !== "Parent" ? user?.avatar : coachData?.avatar
            }
            alt="Profile_Picture"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-xl ">
            {user?.user_type !== "Parent"
              ? user?.first_name + " " + user?.last_name
              : coachData?.first_name + " " + coachData?.last_name}
          </h2>
          <h4 className="text-perfBlue group-hover:text-white text-xs">
            {props.sport} Coach
          </h4>
          <Button className=" border border-perfBlue rounded-lg font-normal text-perfBlue hover:text-white">
            Send Message
          </Button>
        </div>
      </div>
      <div className="profile text-left">
        <h3 className="text-base font-medium text-perfLightBlack">Profile</h3>
        <p className="font-normal text-perfGray3 text-sm">
          {props.bio ? props.bio : "No Bio"}
        </p>
      </div>
      <div className="teams  text-left">
        <h3 className="text-base font-medium text-perfLightBlack">Teams</h3>
        <Grid gutter={5}>
          {props.teams.map((team) => (
            <Grid.Col className="font-normal text-perfGray3 text-sm" span={6}>
              <li>{team}</li>
            </Grid.Col>
          ))}
        </Grid>
      </div>
      <div className="education text-left">
        <h3 className="text-base font-medium text-perfLightBlack">Education</h3>
        {props.education.map((education) => (
          <div className="my-2">
            <p className="date text-xs font-normal text-perfGray3">
              {education.from || "-/--/----"} - {education.from || "-/--/----"}
            </p>
            <h2>{education.degree}</h2>
            <p className="date text-xs font-normal text-perfGray3">
              {education.universty}
            </p>
          </div>
        ))}
      </div>

      {props.editMode && <EditCoachData />}
    </div>
  );
};

export default CoachPersonalInfo;

// Edit Coach Personal Data Modal
function EditCoachData() {
  const [opened, setOpened] = useState(false);
  const [playerImage, setPlayerImage] = React.useState<string | unknown>("");
  const [playerImagePreview, setPlayerImagePreview] = React.useState("null");

  // Form Schema
  const schema = yup.object().shape({
    // image: yup.mixed().required("File is required"),
    name: yup.string().required("Your child name is Required!"),
    bio: yup.string(),
    teams: yup.array().required(),
    universty: yup.string(),
    degree: yup.string(),
    startYear: yup.date(),
    endYear: yup.date(),
  });

  // use Form Config
  const {
    register,
    handleSubmit,
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
    setPlayerImage(null);
    reset({
      image: "",
      name: "",
      bio: "",
      teams: [],
      universty: "",
      degree: "",
      startYear: "",
      endYear: "",
    });
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
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form
          className="flex flex-col gap-4 "
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
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e: any) => {
                  console.log(e.target.files[0]);
                  setPlayerImagePreview(URL.createObjectURL(e.target.files[0]));
                  uploadImage(e);
                }}
              />
            </Button>
            {errors.image && (
              <p className="text-red text-xs text-left">File is required!</p>
            )}
          </div>

          {/*Name Input  */}
          <Input.Wrapper
            error={errors.name && (errors.name.message as ReactNode)}
          >
            <Input placeholder="Add Your Name" {...register("name")} />
          </Input.Wrapper>

          {/* Bio Input */}
          <Textarea
            placeholder="Your Bio"
            withAsterisk
            error={errors.bio && (errors.bio.message as ReactNode)}
            {...register("bio")}
          />

          {/* Select Team MultiSelect Component */}
          <Controller
            {...register("teams")}
            render={({ field }) => (
              <MultiSelect
                // className="w-full"
                data={[
                  { value: "1", label: "Tea One" },
                  { value: "2", label: "Tea Two" },
                ]}
                placeholder="Select Your Teams"
                {...field}
                error={errors.teams && (errors.teams.message as ReactNode)}
              />
            )}
            control={control}
          />

          {/*Degree Input  */}
          <Input.Wrapper
            error={errors.degree && (errors.degree.message as ReactNode)}
          >
            <Input placeholder="Degree" {...register("degree")} />
          </Input.Wrapper>

          {/*Universty Input  */}
          <Input.Wrapper
            error={errors.universty && (errors.universty.message as ReactNode)}
          >
            <Input placeholder="Universty Name" {...register("universty")} />
          </Input.Wrapper>

          {/* Start And End Year */}
          <Controller
            {...register("startYear")}
            render={({ field }) => (
              <DatePicker {...field} placeholder="Pick Start date" />
            )}
            control={control}
          />
          <Controller
            {...register("endYear")}
            render={({ field }) => (
              <DatePicker {...field} placeholder="Pick End date" />
            )}
            control={control}
          />

          <SubmitButton isLoading={false} text="Send" />
        </form>
      </Modal>

      <Group position="center">
        <button
          onClick={() => setOpened(true)}
          className="text-sm flex gap-2 xl:text-base p-2 transform hover:scale-105 duration-100 bg-white border border-perfGray3 rounded-lg text-perfGray3"
        >
          <AppIcons
            className="w-5 h-5 text-perfGray3"
            icon="PencilSquareIcon:outline"
          />{" "}
          <span>Edit Coach Data</span>
        </button>
      </Group>
    </>
  );
}
