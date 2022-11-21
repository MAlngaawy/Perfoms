import { Input, PasswordInput } from "@mantine/core";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "~/@main/components/SubmitButton";
import { useEffect, useState } from "react";
import { useChangePasswordMutation } from "~/app/store/user/userApi";
import { showNotification } from "@mantine/notifications";

type Props = {
  setChange: any;
};

const schema = yup.object().shape({
  old_password: yup.string().min(8).max(24).required(),
  new_password: yup.string().min(8).max(24),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Passwords must match"),
});

const ChangePass = ({ setChange }: Props) => {
  // This will change when we cal the handler function
  const [changePasswordHandler, { isLoading, isSuccess, isError, error }] =
    useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
      confirmNewPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const submitFun = (data: any) => {
    changePasswordHandler(data);
  };

  useEffect(() => {
    if (isSuccess) {
      reset({ old_password: "", new_password: "", confirmNewPassword: "" });
      showNotification({
        title: "Change Password",
        message: "Password Changed Successfulty!",
        color: "green",
      });
      setChange(null);
    }
    if (isError)
      showNotification({
        title: "Change Password",
        //@ts-ignore
        message: error?.data.message,
        color: "red",
      });
    console.log(error);
  }, [isSuccess, isError]);

  return (
    <div className="content flex flex-col justify-center items-center gap-2 bg-white rounded-3xl p-6 w-11/12 sm:w-auto">
      <form
        className="flex flex-col justify-center items-center gap-4 w-80 max-w-full"
        onSubmit={handleSubmit((data: any) => submitFun(data))}
      >
        <PasswordInput
          className="w-full"
          {...register("old_password")}
          label="Old password"
          error={errors.old_password?.message}
          withAsterisk
        />
        <PasswordInput
          className="w-full"
          {...register("new_password")}
          label="New password"
          error={errors.new_password?.message}
        />
        <PasswordInput
          className="w-full"
          {...register("confirmNewPassword")}
          label="Confirm New password"
          error={errors.confirmNewPassword?.message}
        />
        <SubmitButton isLoading={isLoading} text="Save" />
      </form>
    </div>
  );
};

export default ChangePass;
