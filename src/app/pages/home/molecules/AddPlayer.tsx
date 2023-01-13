import React, { useEffect, useRef, useState } from "react";
import AppIcons from "~/@main/core/AppIcons/AppIcons";
import { Modal, Button, TextInput, Select, Input, Alert } from "@mantine/core";
import * as yup from "yup";
import cn from "classnames";
import SubmitButton from "~/@main/components/SubmitButton";
import { useUserQuery } from "~/app/store/user/userApi";
import { PlayerSport, SportTeam } from "~/app/store/types/parent-types";
import { axiosInstance } from "../../../configs/dataService";
import {
  useClubSportsQuery,
  useMyPlayersQuery,
  useSportTeamsQuery,
} from "~/app/store/parent/parentApi";
import { DatePicker } from "@mantine/dates";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {};

const AddPlayer = (props: Props) => {
  const { refetch } = useMyPlayersQuery({});
  const [open, setOpen] = React.useState(false);
  const [playerImage, setPlayerImage] = React.useState<any>();
  const [playerImagePreview, setPlayerImagePreview] = React.useState("null");
  const { data: userData } = useUserQuery(null);
  const [teams, setTeams] = React.useState<any>([]);
  const [sports, setSports] = React.useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSport, setSelectedSport] = useState<number>(0);
  const [error, setError] = useState(false);
  // fetch club sports
  const { data: clubSports } = useClubSportsQuery(
    { club_id: userData ? userData?.club && userData.club : 1 },
    { skip: !userData?.club }
  );

  // fetch sport Teams data
  const { data: sportTeams } = useSportTeamsQuery(
    { sport_id: selectedSport },
    { skip: !selectedSport }
  );

  // function to access file uploaded then convert to base64 then add it to the data state
  const uploadImage = async (e: any) => {
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("fileToUpload", file);
      setPlayerImage(formData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTeams([]);

    if (clubSports && clubSports.results) {
      setSports(clubSports.results);
    }
    if (sportTeams && sportTeams.results) {
      setTeams(sportTeams.results);
    }
  }, [clubSports, sportTeams, selectedSport]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onSubmitFun = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const image = await AppUtils.resizeImage(formData.get("icon"));
    if (image) {
      formData.set("icon", image as string);
    }
    setError(false);

    try {
      setIsLoading(true);
      axiosInstance
        .post("parent/add-player/", formData)
        .then((res) => {
          setIsLoading(false);
          setOpen(false);
          console.log(res);
          setPlayerImage(null);
          refetch();
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          setError(true);
        });
    } catch (err) {}
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
        <form onSubmit={onSubmitFun} className="rounded-3xl">
          {error && (
            <Alert title="Wrong Data" color="red">
              Name and Team is a required files
            </Alert>
          )}

          {/* add img  */}
          <div className=" relative group my-2 bg-gray-300 overflow-hidden hover:bg-gray-300 flex justify-center  items-center  mx-auto w-28  h-28 rounded-lg ">
            <Button className="w-full h-full" component="label">
              <AppIcons
                className="w-10 h-10 text-perfGray1 group-hover:text-white  "
                icon="PhotoIcon:outline"
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
                type="file"
                name="icon"
                onChange={(e: any) => {
                  setPlayerImagePreview(URL.createObjectURL(e.target.files[0]));
                  uploadImage(e);
                }}
              />
            </Button>
          </div>

          <div className="flex flex-col my-4 justify-center items-center gap-2">
            {/* Name and Date of birth */}

            <div className="flex gap-4 w-full">
              <div className="w-1/2">
                <TextInput
                  id="name"
                  name="name"
                  label="Name"
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
                />
              </div>
              <div className="w-1/2">
                <DatePicker
                  label="Date of birth"
                  name="dob"
                  inputFormat="YYYY-MM-DD"
                  sx={{
                    ".mantine-DatePicker-input": {
                      background: "none",
                      border: 0,
                      borderBottom: "1px solid",
                      borderRadius: 0,
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Sport and team */}
          <div className="flex gap-4 w-full my-4">
            <div className="w-1/2">
              <Select
                id="sport"
                required
                className="w-full"
                label="Sport"
                name="sport"
                sx={{
                  ".mantine-Select-input": {
                    background: "none",
                    border: 0,
                    borderBottom: "1px solid",
                    borderRadius: 0,
                    width: "100%",
                  },
                }}
                data={sports?.map((item: Partial<PlayerSport>) => {
                  return { value: item.id, label: item.name };
                })}
                onChange={(e) => e && setSelectedSport(+e)}
              />
            </div>

            <div className="w-1/2">
              <Select
                id="team"
                required
                className="w-full"
                label="Team"
                name="team"
                sx={{
                  ".mantine-Select-input": {
                    background: "none",
                    border: 0,
                    borderBottom: "1px solid",
                    borderRadius: 0,
                    width: "100%",
                  },
                }}
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

          <SubmitButton isLoading={isLoading} text="Add Player" />
        </form>
      </Modal>
    </div>
  );
};

export default AddPlayer;
