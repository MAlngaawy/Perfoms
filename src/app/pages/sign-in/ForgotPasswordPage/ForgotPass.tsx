import { Select, Input, Grid, Loader } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { useSendOtpMutation } from "~/app/store/user/userApi";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import SubmitButton from "~/@main/components/SubmitButton";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {};

const ForgotPass = (props: Props) => {
  const [sendOTP, { data, isLoading, isSuccess, isError, error }] =
    useSendOtpMutation();
  const navigator = useNavigate();

  // Yup schema
  const schema = yup.object().shape({
    countryCode: yup.string().required(),
    phoneNumber: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: { countryCode: "+20", phoneNumber: "" },
    resolver: yupResolver(schema),
  });

  const submitFun = (data: any) => {
    const mobile = data.countryCode + data.phoneNumber;
    navigator(`/verify-otp?usermobile=${mobile}`);
    // sendOTP({ mobile: mobile });
  };

  useEffect(() => {
    if (isSuccess && data) {
      navigator(`/verify-otp?usermobile=${data?.mobile}`);
    }
    if (isError) {
      AppUtils.showNotificationFun(
        "Error",
        "Sorry",
        //@ts-ignore
        error?.data?.message || "Enter a valid mobile number"
      );
    }
  }, [isSuccess, data, isError]);

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
        <form
          className="md:w-96 "
          onSubmit={handleSubmit((data: any) => submitFun(data))}
        >
          <div className="title text-left mb-4">
            <h2 className="text-canter text-loginBlue text-3xl font-medium mb-2">
              Forget password
            </h2>
            <p className="text-perfGray text-base">Enter your phone number</p>
          </div>
          <div className="inputs gap-1 flex w-full justify-center items-center">
            <Input.Wrapper
              sx={{
                width: 50,
              }}
              label="Code"
            >
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
                autoComplete="phone"
                className="border-b"
                disabled
                value="+20"
              />
            </Input.Wrapper>
            <Input.Wrapper
              id="phoneNumber"
              withAsterisk
              label="phone number"
              error={errors.phoneNumber && "Please add your mobile"}
              className="w-full"
            >
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
                autoComplete="phone"
                className="border-b"
                {...register("phoneNumber")}
                id="phoneNumber"
                type={"number"}
              />
            </Input.Wrapper>
          </div>
          <SubmitButton isLoading={isLoading} text="Send" />
          <p className="text-perfGray text-center text-base mt-10">
            You don't have an account?
            <Link to="/sign-up">
              <span className="text-loginBlue cursor-pointer mx-1">
                Sign Up
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
