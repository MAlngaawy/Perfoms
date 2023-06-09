import { Select, Input, Grid, Loader } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { useSigninMutation } from "~/app/store/user/userApi";
import { PasswordInput } from "@mantine/core";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";
import SubmitButton from "~/@main/components/SubmitButton";

type Props = {};

const SignInPage = (props: Props) => {
  const [signinHandler, { isLoading }] = useSigninMutation();

  // Yup schema
  const schema = yup.object().shape({
    countryCode: yup.string().required(),
    phoneNumber: yup.string().required(),
    password: yup.string().min(8).max(24).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: { countryCode: "+20", phoneNumber: "", password: "" },
    resolver: yupResolver(schema),
  });

  const submitFun = (data: any) => {
    const newData = {
      mobile: data.countryCode + data.phoneNumber,
      password: data.password,
    };
    signinHandler(newData);
  };

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
          src="/assets/images/loginImage.png"
          alt="Sign in"
        />
      </div>
      <div className="form md:basis-1/2 px-4 flex justify-center items-center">
        <form
          className="md:w-96 "
          onSubmit={handleSubmit((data: any) => submitFun(data))}
        >
          <div className="title text-left mb-4">
            <h2 className="text-canter text-perfBlue text-3xl font-medium">
              Sign in.
            </h2>
            <p className="text-perfGray text-base">Welcome back.</p>
          </div>
          <div className="inputs gap-4 flex w-full flex-col justify-center items-center">
            {/* <Grid grow gutter="sm" className="w-full"> */}
            {/* Select Country code Input */}
            {/* <Grid.Col span={3}>
                <Controller
                  render={({ field }) => (
                    <Select
                      id="select-code"
                      withAsterisk
                      error={
                        errors?.countryCode &&
                        (errors.countryCode.message as ReactNode)
                      }
                      sx={{
                        ".mantine-Input-input": {
                          border: 0,
                          padding: 0,
                          borderBottom: 1,
                          borderStyle: "solid",
                          borderRadius: 0,
                        },
                      }}
                      label="code"
                      data={[
                        { value: "+20", label: "+20" },
                        { value: "+971", label: "+971" },
                        { value: "+966", label: "+966" },
                        { value: "+82", label: "+82" },
                        { value: "+962", label: "+962" },
                      ]}
                      {...field}
                      defaultValue="+20"
                    />
                  )}
                  name="countryCode"
                  control={control}
                  defaultValue=""
                />
              </Grid.Col> */}

            {/* Mobile Number Input */}
            {/* <Grid.Col span={9}> */}
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
            {/* </Grid.Col>
            </Grid> */}

            {/* Password Input */}
            <div className="w-full">
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
                label="Password"
                withAsterisk
                error={
                  errors.password &&
                  "Password must be more than 8 character and less than 24 character"
                }
                {...register("password")}
              />
              <Link
                to={"forgot-pass"}
                className="forgot-pass mt-4 text-xs text-perfGray3"
              >
                Forget password
              </Link>
            </div>
          </div>
          <SubmitButton isLoading={isLoading} text="Sign in" />
          <p className="text-perfGray text-center text-base">
            You don't have an account?
            <Link to="/sign-up">
              <span className="text-blue-500 cursor-pointer mx-1">Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
