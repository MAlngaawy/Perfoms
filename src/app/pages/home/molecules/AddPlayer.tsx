import React, { useEffect, useRef, useState } from "react";
import AppIcons from "~/@main/core/AppIcons/AppIcons";
import { Modal, TextInput, Select, Alert, Avatar } from "@mantine/core";
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
import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

type Props = {};

const schema = yup.object().shape({
  name: yup
    .string()
    .max(20, "Name Can't be more than 20 character")
    .required("Player Name is required"),
  dob: yup.string(),
  sport: yup
    .number()
    .required("You Must select a sport")
    .typeError("You Have to select a sport"),
  team: yup
    .number()
    .required("You  Must select a team")
    .typeError("You Have to select a team"),
  weight: yup
    .number()
    .max(999)
    .min(0, "weight can't be negative value!")
    .typeError("weight must be a number"),
  height: yup
    .number()
    .max(999)
    .min(0, "height can't be negative value!")
    .typeError("height must be a number"),
  phoneNumber: yup
    .string()
    .length(11, "phone number must be 11 characters long")
    .matches(/^\d+$/, "phone number must only contain numbers"),
});

const formInputsDefaultValue = {
  name: "",
  dob: "",
  sport: "",
  team: "",
  weight: "",
  height: "",
  phoneNumber: "",
};

const AddPlayer = (props: Props) => {
  const { refetch } = useMyPlayersQuery({});
  const [open, setOpen] = useState<boolean>(false);
  const [formInputsData, setFormInputsData] = useState(formInputsDefaultValue);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: userData } = useUserQuery(null);
  const [teams, setTeams] = React.useState<any>([]);
  const [sports, setSports] = React.useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSport, setSelectedSport] = useState<number>(0);
  const [errors, setErrors] = useState<{
    name?: string;
    dob?: string;
    sport?: string;
    team?: string;
    weight?: string;
    height?: string;
    phoneNumber?: string;
  }>({});
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
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
  useEffect(() => {
    setTeams([]);

    if (clubSports && clubSports.results) {
      setSports(clubSports.results);
    }
    if (sportTeams && sportTeams.results.length > 0) {
      setTeams(sportTeams.results);
    } else {
      setTeams([]);
      setFormInputsData({
        ...formInputsData,
        team: "",
      });
      setSelectedTeam(null);
    }
  }, [clubSports, sportTeams, selectedSport]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (name: string, value: string | number) => {
    setFormInputsData({
      ...formInputsData,
      [name]: value,
    });
  };

  const onSubmitFun = async (e: any) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    try {
      await schema.validate(formInputsData, { abortEarly: false });
      console.log("Await Passed", formInputsData);
      //@ts-ignore
      if (userAvatar) {
        const image = await AppUtils.resizeImage(userAvatar);
        formData.append("icon", image as string);
      }
      try {
        setIsLoading(true);
        axiosInstance
          .post("parent/add-player/", formData)
          .then((res) => {
            setIsLoading(false);
            setOpen(false);
            setUserAvatar(null);
            refetch();
            setFormInputsData(formInputsDefaultValue);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err.response.statusText);
          });
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log(error);

      const validationErrors = {};
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((error) => {
          //@ts-ignore
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
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
        onClose={() => {
          setOpen(false);
          setErrors({});
          setFormInputsData(formInputsDefaultValue);
        }}
        transition="slide-up"
        transitionDuration={300}
        transitionTimingFunction="ease"
        shadow="xl"
        radius="xl"
      >
        <form onSubmit={onSubmitFun} className="rounded-3xl">
          {/* add img  */}
          <div className="w-full flex justify-center items-center">
            <div className="relative photo place-self-center w-28 h-28">
              <Avatar
                className="object-cover w-full h-full rounded-lg"
                src={userAvatar && URL.createObjectURL(userAvatar)}
                alt="player-avatar"
              />
              <div
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              >
                <AppIcons
                  className="w-5 h-5 absolute top-2 cursor-pointer right-2 text-perfGray3 hover:text-perfGray1"
                  icon="PencilSquareIcon:outline"
                />
              </div>
              <input
                ref={fileInputRef}
                onChange={(e) =>
                  setUserAvatar(e?.currentTarget?.files?.[0] as File)
                }
                type="file"
                accept={"image/png,image/jpeg,image/jpg"}
                className="hidden"
                id={"avatar"}
              />
            </div>
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
                  error={errors.name}
                  onChange={(e) => handleChange("name", e.target.value)}
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
                  maxDate={new Date()}
                  inputFormat="YYYY-MM-DD"
                  error={errors.dob}
                  onChange={(val) =>
                    handleChange("dob", AppUtils.formatDate(val) as string)
                  }
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
                error={errors.sport}
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
                onChange={(e) => {
                  e && setSelectedSport(+e);
                  if (e) {
                    handleChange("sport", +e);
                  }
                }}
              />
            </div>

            <div className="w-1/2">
              <Select
                id="team"
                error={errors.team}
                required
                className="w-full"
                label="Team"
                name="team"
                value={selectedTeam}
                onChange={(e) => {
                  if (e) {
                    setSelectedTeam(e);
                    handleChange("team", +e);
                  }
                }}
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
                error={errors.weight}
                name="weight"
                onChange={(e) => handleChange("weight", e.target.value)}
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
                name="height"
                error={errors.height}
                onChange={(e) => handleChange("height", e.target.value)}
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
              name="phone"
              error={errors.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
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
