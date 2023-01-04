import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, PasswordInput } from "@mantine/core";
import SubmitButton from "~/@main/components/SubmitButton";
import { useResetPasswordMutation } from "~/app/store/user/userApi";
import { ResetPassword } from "~/app/store/types/user-types";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {};

const ResetPasswordComp = (props: Props) => {
  const [param] = useSearchParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();

  const schema = yup.object().shape({
    mobile: yup.string(),
    new_password: yup.string().required().min(8).max(36),
    new_password_confirm: yup
      .string()
      .oneOf([yup.ref("new_password"), null], "Passwords must match"),
  });
  const mobile = "+" + param.get("usermobile");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobile: mobile,
      new_password: "",
      new_password_confirm: "",
    },
    resolver: yupResolver(schema),
  });

  const submitFun = (data: ResetPassword) => {
    resetPassword(data);
  };

  useEffect(() => {
    console.log("Effect");

    if (isSuccess) {
      navigate(`/sign-in`);
      AppUtils.showNotificationFun(
        "Success",
        "Done",
        "Password changed successfully"
      );
    }
    if (isError) {
      console.log(error);
      AppUtils.showNotificationFun(
        "Error",
        "Something went wrong",
        "Try again later"
      );
    }
  }, [isError, isSuccess]);

  return (
    <div className="signIn bg-perfOfWhite flex justify-center min-h-screen items-stretch">
      <div className=" relative leftImage h-screen hidden md:block md:basis-1/2 self-stretch">
        <div className="absolute left-4 top-4  bg-white/60 rounded-2xl p-4">
          <img
            className="w-20 h-20"
            src="/assets/images/logo/logo.png"
            alt="logo"
          />
        </div>
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }}
          className=" text-perfBlue p-2 absolute right-4 bottom-4 text-xl"
        >
          Maximize Players Full Potential.
        </div>
        <img
          className="object-cover h-full w-full max-h-full min-h-0"
          src="/assets/forget-pass.png"
          alt="Sign in"
        />
      </div>
      <div className="form md:basis-1/2 px-4 flex justify-center items-center">
        <form onSubmit={handleSubmit(submitFun)} className="md:w-96 ">
          <div className="title text-left mb-4">
            <h2 className="text-canter text-loginBlue text-3xl font-medium mb-2">
              New Password
            </h2>
            <p className="text-perfGray text-base">Enter your New Password</p>
          </div>
          <div className="flex w-72 flex-col gap-2 items-center justify-center">
            <Input
              sx={{
                ".mantine-Input-input	": {
                  border: 0,
                  padding: 0,
                  borderBottom: 1,
                  background: "none",
                  borderStyle: "solid",
                  borderRadius: 0,
                },
              }}
              disabled
              className="border-b w-full"
              {...register("mobile")}
              id="mobile"
              type={"string"}
            />
            <PasswordInput
              sx={{
                ".mantine-PasswordInput-input": {
                  border: 0,
                  padding: 0,
                  borderBottom: 1,
                  background: "none",
                  borderStyle: "solid",
                  borderRadius: 0,
                },
                ".mantine-PasswordInput-innerInput": {
                  padding: 0,
                },
              }}
              className="w-full"
              label="New Password"
              withAsterisk
              {...register("new_password")}
            />

            <PasswordInput
              sx={{
                ".mantine-PasswordInput-input": {
                  border: 0,
                  padding: 0,
                  borderBottom: 1,
                  background: "none",
                  borderStyle: "solid",
                  borderRadius: 0,
                },
                ".mantine-PasswordInput-innerInput": {
                  padding: 0,
                },
              }}
              className="w-full"
              label="New Password Confirm"
              withAsterisk
              error={errors.new_password_confirm?.message}
              {...register("new_password_confirm")}
            />
            <SubmitButton isLoading={isLoading} text="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordComp;
