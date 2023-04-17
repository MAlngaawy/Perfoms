import React, { useState, forwardRef, useEffect, useRef } from "react";
import { Modal, Group, Avatar, Text, Select, TextInput } from "@mantine/core";
import SubmitButton from "../../SubmitButton";
import { Controller, useForm } from "react-hook-form";
import {
  useClubSportsQuery,
  useMyPlayersQuery,
  useSportTeamsQuery,
} from "~/app/store/parent/parentApi";
import { DatePicker } from "@mantine/dates";
import AppUtils from "~/@main/utils/AppUtils";
import * as yup from "yup";
import { useUserQuery } from "~/app/store/user/userApi";
import { axiosInstance } from "~/app/configs/dataService";
import AppIcons from "~/@main/core/AppIcons";
import { PlayerSport, SportTeam } from "~/app/store/types/parent-types";
import {
  useAdminClubParentsQuery,
  useAdminPlayersQuery,
  useAdminSportsQuery,
  useAdminTeamsStatisticsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import AvatarInput from "~/@main/components/shared/AvatarInput";

type Props = {};

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  id: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, id, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar radius={"xl"} size="sm" src={image} />
        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
);

const schema = yup.object().shape({
  parent: yup
    .string()
    .required("You  have to select a parent")
    .typeError("It Must Be Number"),
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
  front_leg: yup.string(),
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
  front_leg: "",
  phoneNumber: "",
};

const AddPlayerForm = (props: Props) => {
  const { data: userData } = useUserQuery(null);
  const { refetch } = useAdminPlayersQuery(
    { club_id: userData?.club },
    { skip: !userData?.club }
  );
  const [open, setOpen] = useState<boolean>(false);
  const [formInputsData, setFormInputsData] = useState(formInputsDefaultValue);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [clubParentsData, setClubParentsData] = useState<
    {
      label: string;
      value: string;
      image: string;
    }[]
  >([
    {
      label: "",
      value: "",
      image: "",
    },
  ]);
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
    front_leg?: string;
    phoneNumber?: string;
    parent?: string;
  }>({});
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  const { data: clubParents } = useAdminClubParentsQuery(
    { club_id: userData?.club },
    { skip: !userData?.club }
  );

  // fetch club sports
  const { data: clubSports } = useAdminSportsQuery(
    { club_id: userData?.club },
    { skip: !userData?.club }
  );
  // fetch sport Teams data
  const { data: sportTeams } = useAdminTeamsStatisticsQuery(
    { sport_id: selectedSport },
    { skip: !selectedSport }
  );

  useEffect(() => {
    setTeams([]);

    if (clubParents) {
      const data = clubParents?.results.map((parent: any) => {
        return {
          label: parent.first_name + " " + parent.last_name,
          value: JSON.stringify(parent.id),
          image: parent.avatar,
        };
      });

      setClubParentsData(data);
    }

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
  }, [clubSports, sportTeams, selectedSport, clubParents]);

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
    console.log(formData.get("parent"));

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
          .post("club-manager/add-player/", formData)
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
      <>
        <Modal
          opened={open}
          onClose={() => {
            setOpen(false);
          }}
          title={`Create Player`}
        >
          <form onSubmit={onSubmitFun} className="rounded-3xl">
            {/* add img  */}
            <AvatarInput
              inputAlt="Player Photo"
              userAvatar={userAvatar}
              setUserAvatar={setUserAvatar}
            />

            <div className="flex flex-col my-4 justify-center items-center gap-2">
              <div className="w-full">
                <Select
                  id="parent"
                  name="parent"
                  data={clubParentsData}
                  error={errors.parent}
                  itemComponent={SelectItem}
                  label={"Parent"}
                  onChange={(e: string) => handleChange("parent", e)}
                  sx={{
                    ".mantine-Select-input": {
                      background: "none",
                      border: 0,
                      borderBottom: "1px solid",
                      borderRadius: 0,
                      width: "100%",
                    },
                  }}
                  rightSection={false}
                  className="m-0 p-0 h-fit border-0"
                />
              </div>
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

            <Select
              id="front_leg"
              error={errors.front_leg}
              required
              className="w-full"
              label="Front Leg"
              name="front_leg"
              sx={{
                ".mantine-Select-input": {
                  background: "none",
                  border: 0,
                  borderBottom: "1px solid",
                  borderRadius: 0,
                  width: "100%",
                },
              }}
              data={[
                { value: "LEFT", label: "Left" },
                { value: "RIGHT", label: "Right" },
                { value: "BOTH", label: "Both" },
              ]}
            />

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

        <Group position="left">
          <button
            className="py-1 px-4 transform hover:scale-105 transition-all text-xs sm:text-base border border-perfGray3 text-perfGray3 rounded-3xl"
            onClick={() => setOpen(true)}
          >
            + Create Player
          </button>
        </Group>
      </>
    </div>
  );
};

export default AddPlayerForm;
