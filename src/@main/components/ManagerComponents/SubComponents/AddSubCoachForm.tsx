import { useDisclosure } from "@mantine/hooks";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Group,
  Select,
  TextInput,
  PasswordInput,
  MultiSelect,
} from "@mantine/core";
import SubmitButton from "../../SubmitButton";
import AppUtils from "~/@main/utils/AppUtils";
import * as yup from "yup";
import { useUserQuery } from "~/app/store/user/userApi";
import {
  useAdminAddSubCoachMutation,
  useAdminSportsQuery,
  useAdminSubCoachQuery,
  useAdminTeamsStatisticsQuery,
} from "~/app/store/clubManager/clubManagerApi";
// import SelectTeamsFromSportInputs from "../../shared/SelectTeamsFromSportInputs";
import { PlayerSport, SportTeam } from "~/app/store/types/parent-types";

type Props = {};

const schema = yup.object().shape({
  mobile: yup
    .string()
    .required("Phone number is required")
    .length(11, "phone number must be 11 characters long")
    .matches(/^\d+$/, "phone number must only contain numbers"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  sport: yup
    .number()
    .required("You Must select a sport")
    .typeError("You Have to select a sport"),
  teams: yup.array().of(yup.number()).min(1, "At least on team is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const formInputsDefaultValue = {
  first_name: "",
  last_name: "",
  sport: "",
  teams: [],
  password: "",
  confirmPassword: "",
  mobile: "",
};

const AddSubCoachForm = (props: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: user } = useUserQuery(null);
  const [formInputsData, setFormInputsData] = useState(formInputsDefaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [errors, setErrors] = useState<{
    first_name?: string;
    last_name?: string;
    sport?: string;
    teams?: string;
    password?: string;
    confirmPassword?: string;
    mobile?: string;
  }>({});
  const { refetch } = useAdminSubCoachQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );
  const handleChange = (name: string, value: string | number | any[]) => {
    setFormInputsData({
      ...formInputsData,
      [name]: value,
    });
  };

  const [sports, setSports] = useState<any>([]);
  const [teams, setTeams] = React.useState<any>([]);
  const [selectedSport, setSelectedSport] = useState<number>(0);

  // Handle fetching club Sport Teams to select wich teams will be added
  // fetch club sports
  const { data: clubSports } = useAdminSportsQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );
  // fetch sport Teams data
  const { data: sportTeams } = useAdminTeamsStatisticsQuery(
    { sport_id: selectedSport },
    { skip: !selectedSport }
  );

  useEffect(() => {
    if (clubSports && clubSports.results) {
      setSports(clubSports.results);
    }
    if (sportTeams && sportTeams.results.length > 0) {
      setTeams(sportTeams.results);
    } else {
      setTeams([]);
      setFormInputsData({
        ...formInputsData,
        teams: [],
      });
      setSelectedTeam(null);
    }
  }, [clubSports, sportTeams, selectedSport]);

  const [createSubCoach] = useAdminAddSubCoachMutation();

  const onSubmitFun = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const newData = {
      mobile: "+2" + formInputsData.mobile,
      first_name: formInputsData.first_name,
      last_name: formInputsData.last_name,
      password: formInputsData.password,
      teams: formInputsData.teams,
    };

    try {
      setIsLoading(true);
      await schema.validate(formInputsData, { abortEarly: false });
      createSubCoach(newData)
        .then(() => {
          setIsLoading(false);
          close();
          refetch();
          setFormInputsData(formInputsDefaultValue);
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Attendance Modeartor Added Successfully"
          );
        })
        .catch((err) => {
          setIsLoading(false);
          console.log();
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            err.response.statusText
          );
        });
    } catch (error) {
      setIsLoading(false);
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
    <>
      <Modal opened={opened} onClose={close} title="Add Att Moderator">
        <form
          onSubmit={onSubmitFun}
          className="rounded-xl py-4 flex flex-col gap-4 justify-between"
        >
          <TextInput
            id="mobile"
            name="mobile"
            label="Mobile"
            withAsterisk
            error={errors.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
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
          <div className="flex gap-2">
            <TextInput
              id="first_name"
              name="first_name"
              label="First Name"
              withAsterisk
              error={errors.first_name}
              onChange={(e) => handleChange("first_name", e.target.value)}
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

            <TextInput
              autoComplete="off"
              id="last_name"
              name="last_name"
              label="Last Name"
              withAsterisk
              error={errors.last_name}
              onChange={(e) => handleChange("last_name", e.target.value)}
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

          {/* Sport and teams */}
          <div className="flex flex-col gap-4 w-full my-4">
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

            <MultiSelect
              id="teams"
              error={errors.teams}
              required
              className="w-full"
              label="Teams"
              name="teams"
              value={selectedTeam}
              onChange={(e) => {
                console.log(e);

                if (e) {
                  setSelectedTeam(e);
                  handleChange("teams", e);
                }
              }}
              sx={{
                ".mantine-MultiSelect-input": {
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

          {/* <SelectTeamsFromSportInputs
            errors={errors}
            formInputsData={formInputsData}
            handleChange={handleChange}
            selectedTeam={selectedTeam}
            setFormInputsData={setFormInputsData}
            setSelectedTeam={setSelectedTeam}
          /> */}

          <PasswordInput
            autoComplete="new-password"
            id="password"
            name="password"
            label="Password"
            error={errors.password}
            withAsterisk
            onChange={(e) => handleChange("password", e.target.value)}
            sx={{
              ".mantine-PasswordInput-input": {
                border: 0,
              },
              ".mantine-PasswordInput-innerInput": {
                background: "none",
                border: 0,
                borderBottom: "1px solid",
                borderRadius: 0,
                width: "100%",
              },
            }}
          />
          <PasswordInput
            autoComplete="new-password"
            id="confirmPassword"
            name="confirm Password"
            label="confirmPassword"
            error={errors.confirmPassword}
            withAsterisk
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            sx={{
              ".mantine-PasswordInput-input": {
                border: 0,
              },
              ".mantine-PasswordInput-innerInput": {
                background: "none",
                border: 0,
                borderBottom: "1px solid",
                borderRadius: 0,
                width: "100%",
              },
            }}
          />
          <SubmitButton isLoading={isLoading} text="Create Att Moderator" />
        </form>
      </Modal>

      <Group position="left">
        <>
          <button
            className="py-1 xs:hidden px-4 transform hover:scale-105 transition-all text-xs sm:text-base border border-perfGray3 text-perfGray3 rounded-3xl"
            onClick={open}
          >
            +
          </button>
          <button
            className="py-1 px-4 hidden xs:block transform hover:scale-105 transition-all text-xs border border-perfGray3 text-perfGray3 rounded-3xl"
            onClick={open}
          >
            + Add Attendance Moderator
          </button>
        </>
      </Group>
    </>
  );
};

export default AddSubCoachForm;
