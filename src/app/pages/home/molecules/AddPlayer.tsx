import React, { useEffect } from "react";
import AppIcons from "~/@main/core/AppIcons/AppIcons";
import { Modal, Button, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cn from "classnames";
import axios from "axios";

import Resizer from "react-image-file-resizer";
import PerfSelect from "~/@main/components/Select";
import {
  useAddPlayerMutation,
  useClubSportsQuery,
  useSportTeamsQuery,
} from "~/app/store/parent/parentApi";
import SubmitButton from "~/@main/components/SubmitButton";
import { useUserQuery } from "~/app/store/user/userApi";
import { PlayerSport, SportTeam } from "~/app/store/types/parent-types";
import { BASE_URL } from "~/app/configs/dataService";
import Cookies from "js-cookie";

type Props = {};

const schema = yup.object().shape({
  image: yup.mixed().required("File is required"),
  name: yup.string().required("Your child name is Required!"),
  dob: yup.date().required("Your child Birthday is Required!"),
  sport: yup.number(),
  team: yup.number().required("please select your child team"),
  weight: yup.number().required("please add your child weight"),
  height: yup.number().required("please add your child height"),
  phoneNumber: yup.string(),
});

const AddPlayer = (props: Props) => {
  const [addPlayerHandler, { isLoading, isSuccess, isError, error }] =
    useAddPlayerMutation();
  const [open, setOpen] = React.useState(false);
  const [playerImage, setPlayerImage] = React.useState<any>();
  const [playerImagePreview, setPlayerImagePreview] = React.useState("null");
  const { data: userData } = useUserQuery(null);
  const [teams, setTeams] = React.useState<any>([]);
  const [sports, setSports] = React.useState<any>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // fetch club sports
  const { data: clubSports } = useClubSportsQuery(
    { club_id: userData ? userData?.club && userData.club : 1 },
    { skip: !userData?.club }
  );

  const selectedSport = watch("sport");

  // fetch sport Teams data
  const { data: sportTeams } = useSportTeamsQuery(
    { sport_id: selectedSport },
    { skip: !selectedSport }
  );

  useEffect(() => {
    // reset({ team: "" });
    if (clubSports && clubSports.results) {
      setSports(clubSports.results);
    }
    if (sportTeams && sportTeams.results) {
      setTeams(sportTeams.results);
    }
  }, [clubSports, sportTeams, selectedSport]);

  const handleClickOpen = () => {
    console.log("Open");
    setOpen(true);
  };

  function formatDate(date: unknown) {
    if (date instanceof Date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }
  }

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

  const onSubmit = (data: any) => {
    const bodyParameters = {
      name: data.name,
      dob: formatDate(data.dob),
      team: data.team,
      weight: data.weight,
      height: data.height,
      phone: data.phoneNumber,
      icon: playerImage,
    };

    console.log(bodyParameters, Cookies.get("token"));

    axios.post(`${BASE_URL}/parent/add-player/`, {
      data: bodyParameters,
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    // addPlayerHandler(bodyParameters);
    // setPlayerImage(null);
    // reset({
    //   name: "",
    //   dob: "",
    //   team: "",
    //   weight: "",
    //   height: "",
    //   phoneNumber: "",
    //   image: "",
    // });
  };

  // function to access file uploaded then convert to base64 then add it to the data state
  const uploadImage = async (e: any) => {
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("fileToUpload", file);
      setPlayerImage(formData);
      // console.log(formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="addPlayer cursor-pointer transform hover:scale-105 p-3 xs:px-5 flex justify-between items-center bg-white rounded-full opacity-60 hover:opacity-100 h-full"
      >
        <span>
          <AppIcons icon="UserPlusIcon:outline" className="w-5 h-5" />
        </span>
        <h2 className="hidden xs:block pl-2 text-base text-perfGray2">
          Add Player
        </h2>
      </button>
      <Modal
        opened={open}
        withCloseButton
        onClose={() => setOpen(false)}
        transition="slide-up"
        transitionDuration={300}
        transitionTimingFunction="ease"
        shadow="xl"
        radius="xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl">
          {/* add img  */}
          <div className=" relative my-2 bg-gray-300 overflow-hidden hover:bg-gray-300 flex justify-center  items-center  mx-auto w-28  h-28 rounded-lg ">
            <Button
              {...register("image")}
              className="w-full h-full"
              component="label"
            >
              <img
                className={cn("", { hidden: playerImage })}
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

          <div className="flex flex-col my-4 justify-center items-center gap-2">
            {/* Name and Date of birth */}

            <div className="flex gap-4 w-full">
              <div className="w-1/2">
                <TextInput
                  id="name"
                  label="Name"
                  {...register("name")}
                  withAsterisk
                  sx={{
                    ".mantine-TextInput-input": {
                      background: "none",
                      border: 0,
                      borderBottom: "1px solid",
                      borderRadius: 0,
                      width: "100%",
                    },
                  }}
                  error={errors.name && "Your child name is Required!"}
                />
              </div>
              <div className="w-1/2">
                <TextInput
                  id="dob"
                  label="Date of birth"
                  placeholder="yyyy-mm-dd"
                  type={"date"}
                  withAsterisk
                  {...register("dob")}
                  sx={{
                    ".mantine-TextInput-input": {
                      background: "none",
                      border: 0,
                      borderBottom: "1px solid",
                      borderRadius: 0,
                    },
                  }}
                  error={errors.dob && "Your child Birthday is Required!"}
                />
              </div>
            </div>
          </div>

          {/* Sport and team */}
          <div className="flex gap-4 w-full my-4">
            <div className="w-1/2">
              <PerfSelect
                {...register("sport")}
                id="sport"
                required
                error={errors.city && "please select your child sport"}
                className="w-full"
                label="Sport"
                name="sport"
                control={control}
                data={sports?.map((item: Partial<PlayerSport>) => {
                  return { label: item.name, value: item.id };
                })}
              />
            </div>

            <div className="w-1/2">
              <PerfSelect
                {...register("team")}
                id="team"
                required
                error={errors.city && "please select your child team"}
                className="w-full"
                label="Team"
                name="team"
                control={control}
                data={teams?.map((item: Partial<SportTeam>) => {
                  return { label: item.name, value: item.id };
                })}
              />
            </div>
          </div>

          {/* Weight & Height */}
          <div className="flex gap-4 my-4">
            <div className="w-1/2">
              <TextInput
                id="weight"
                label="Weight"
                {...register("weight")}
                withAsterisk
                error={errors.weight && "please add your child weight"}
                sx={{
                  ".mantine-TextInput-input": {
                    background: "none",
                    border: 0,
                    borderBottom: "1px solid",
                    borderRadius: 0,
                  },
                }}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                id="height"
                label="Height"
                {...register("height")}
                withAsterisk
                error={errors.height && "please add your child height"}
                sx={{
                  ".mantine-TextInput-input": {
                    background: "none",
                    border: 0,
                    borderBottom: "1px solid",
                    borderRadius: 0,
                  },
                }}
              />
            </div>
          </div>

          {/* Phone number  */}
          <div className="w-full my-4">
            <TextInput
              id="phoneNumber"
              label="phone number"
              {...register("phoneNumber")}
              sx={{
                ".mantine-TextInput-input": {
                  background: "none",
                  border: 0,
                  borderBottom: "1px solid",
                  borderRadius: 0,
                },
              }}
              error={errors.phoneNumber && "please enter your mobile number!"}
            />
          </div>

          <SubmitButton isLoading={isLoading} text="Add Player" />
        </form>
      </Modal>
    </div>
  );
};

export default AddPlayer;
