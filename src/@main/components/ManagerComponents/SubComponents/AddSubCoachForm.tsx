import { useDisclosure } from "@mantine/hooks";
import React, { useState, forwardRef, useEffect } from "react";
import {
  Modal,
  Group,
  Avatar,
  Text,
  Select,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import SubmitButton from "../../SubmitButton";
import { DatePicker } from "@mantine/dates";
import AppUtils from "~/@main/utils/AppUtils";
import * as yup from "yup";
import { useUserQuery } from "~/app/store/user/userApi";
import { axiosInstance } from "~/app/configs/dataService";
import {
  useAdminClubParentsQuery,
  useAdminPlayersQuery,
  useAdminSubCoachQuery,
} from "~/app/store/clubManager/clubManagerApi";
import AvatarInput from "~/@main/components/shared/AvatarInput";
import SelectTeamsFromSportInputs from "../../shared/SelectTeamsFromSportInputs";

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
  team: yup
    .number()
    .required("You  Must select a team")
    .typeError("You Have to select a team"),
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
  team: "",
  password: "",
  confirmPassword: "",
  mobile: "",
};

const AddSubCoachForm = (props: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: user } = useUserQuery(null);
  const [formInputsData, setFormInputsData] = useState(formInputsDefaultValue);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [errors, setErrors] = useState<{
    first_name?: string;
    last_name?: string;
    sport?: string;
    team?: string;
    password?: string;
    confirmPassword?: string;
    mobile?: string;
  }>({});
  const { refetch } = useAdminSubCoachQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );
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
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await schema.validate(formInputsData, { abortEarly: false });
      formData.set("mobile", "+2" + formData.get("mobile"));
      //@ts-ignore
      if (userAvatar) {
        const image = await AppUtils.resizeImage(userAvatar);
        formData.append("icon", image as string);
      }
      try {
        setIsLoading(true);
        axiosInstance
          .post("club-manager/users/sub-coaches/add-sub-coach/", formData)
          .then((res) => {
            setIsLoading(false);
            close();
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
    <>
      <Modal opened={opened} onClose={close} title="Add Att Moderator">
        <form
          onSubmit={onSubmitFun}
          className="rounded-xl py-4 flex flex-col gap-4 justify-between"
        >
          <AvatarInput
            inputAlt="Player Photo"
            userAvatar={userAvatar}
            setUserAvatar={setUserAvatar}
          />
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

          <SelectTeamsFromSportInputs
            errors={errors}
            formInputsData={formInputsData}
            handleChange={handleChange}
            selectedTeam={selectedTeam}
            setFormInputsData={setFormInputsData}
            setSelectedTeam={setSelectedTeam}
          />

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
        <button
          className="py-1 px-4 transform hover:scale-105 transition-all text-sm sm:text-base border border-perfGray3 text-perfGray3 rounded-3xl"
          onClick={open}
        >
          +
        </button>
      </Group>
    </>
  );
};

export default AddSubCoachForm;
