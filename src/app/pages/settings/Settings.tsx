import { Input, PasswordInput } from "@mantine/core";
import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {};

const schema = yup.object().shape({
  fullName: yup.string(),
  phoneNumber: yup.string(),
  oldPassword: yup.string().min(8).max(24).required(),
  newPassword: yup.string().min(8).max(24),
});

const Settings = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "Mohammed Ali",
      phoneNumber: "+121212212",
      oldPassword: "",
      newPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const submitFun = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center pt-6 md:pt-14">
      <div className="content flex flex-col justify-center items-center gap-2 bg-white rounded-3xl p-6 w-11/12 md:w-auto md:py-12 md:px-24">
        <h3>Settings</h3>
        <form
          className="flex flex-col justify-center items-center gap-4"
          onSubmit={handleSubmit((data: any) => submitFun(data))}
        >
          <Input.Wrapper
            error={errors.fullName?.message}
            id="fullName"
            label="Full name"
          >
            <Input id="fullName" {...register("fullName")} />
          </Input.Wrapper>
          <Input.Wrapper
            error={errors.phoneNumber?.message}
            id="phoneNumber"
            label="Phone number"
          >
            <Input id="phoneNumber" {...register("phoneNumber")} />
          </Input.Wrapper>
          <PasswordInput
            className="w-full"
            {...register("oldPassword")}
            label="Old password"
            error={errors.oldPassword?.message}
            withAsterisk
          />
          <PasswordInput
            className="w-full"
            {...register("newPassword")}
            label="New password"
            error={errors.newPassword?.message}
          />
          <button
            type="submit"
            className=" w-full bg-perfBlue text-white font-medium py-3 mt-4 rounded-lg"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
