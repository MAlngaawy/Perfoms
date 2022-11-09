import { Input, PasswordInput } from "@mantine/core";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "~/@main/components/SubmitButton";
import { useState } from "react";

type Props = {};

const schema = yup.object().shape({
  oldPassword: yup.string().min(8).max(24).required(),
  newPassword: yup.string().min(8).max(24),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const Settings = (props: Props) => {
  // This will change when we cal the handler function
  const [isLoading, setIsloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const submitFun = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center py-20 md:pt-14">
      <div className="content flex flex-col justify-center items-center gap-2 bg-white rounded-3xl p-6 w-11/12 sm:w-auto">
        <h3>Settings</h3>
        <form
          className="flex flex-col justify-center items-center gap-4 w-80 max-w-full"
          onSubmit={handleSubmit((data: any) => submitFun(data))}
        >
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
          <PasswordInput
            className="w-full"
            {...register("confirmNewPassword")}
            label="Confirm New password"
            error={errors.confirmNewPassword?.message}
          />
          <SubmitButton isLoading={isLoading} text="Save" />
        </form>
      </div>
    </div>
  );
};

export default Settings;
