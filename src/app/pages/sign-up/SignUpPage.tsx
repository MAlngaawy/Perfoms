import { Input, Grid, MultiSelect, Loader } from "@mantine/core";
import { useForm } from "react-hook-form";
// import { useSigninMutation } from "~/app/store/user/userApi";
import { PasswordInput } from "@mantine/core";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { State } from "country-state-city";
import PerfSelect, { Option } from "~/@main/components/Select";
import { Controller } from "react-hook-form";
import { usePublicClubsQuery, useTeamsQuery } from "~/app/store/core/coreApi";
import { useSignupMutation } from "~/app/store/user/userApi";
import SubmitButton from "~/@main/components/SubmitButton";

type Props = {};

const schema = yup.object().shape({
  userRole: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string(),
  country: yup.string().required(),
  city: yup.string(),
  club: yup.number().required(),
  countryCode: yup.string().required(),
  phoneNumber: yup.number().required(),
  password: yup.string().min(8).max(24).required(),
  teams: yup.array().required(),
});

const SignUpPage = (props: Props) => {
  const [signupHandler, { isLoading }] = useSignupMutation();
  const { data: AllClubs } = usePublicClubsQuery(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      userRole: "",
      firstName: "",
      lastName: "",
      country: "EG",
      club: 1,
      countryCode: "+20",
      phoneNumber: "",
      password: "",
      city: "",
      teams: [],
    },
    resolver: yupResolver(schema),
  });
  const country = watch("country");
  const userRole = watch("userRole");
  const { data: teamsData } = useTeamsQuery(null, {
    skip: userRole !== "Coach",
  });

  useEffect(() => {
    setValue("city", "");
    setValue("teams", []);
  }, [country, setValue, userRole]);

  const submitFun = (data: any) => {
    // handle The request body schema
    const requestData = {
      user_type: data.userRole,
      first_name: data.firstName,
      last_name: data.lastName,
      country: data.country,
      club: data.club,
      mobile: data.countryCode + data.phoneNumber,
      password: data.password,
      city: data.city,
      teams: data.teams,
    };
    signupHandler(requestData);
  };

  return (
    <div className="">
      <Grid className="signIn bg-perfOfWhite max-w-full">
        <Grid.Col span={6} className="relative leftImagehidden hidden md:block">
          <div className="absolute left-4 top-4  bg-white/60 rounded-2xl p-4">
            <img
              className="w-20 h-20"
              src="/assets/images/logo/logo.png"
              alt="logo"
            />
          </div>
          <div className=" text-perfBlue p-2 absolute right-4 bottom-4 bg-slate-200 text-xl">
            Maximize Players Full Potential.
          </div>
          <img
            className="object-cover  h-full w-full"
            src="/assets/images/performs_signup.jpg"
            alt="Sign up"
          />
        </Grid.Col>
        <Grid.Col
          span={12}
          md={6}
          className="form p-10 flex justify-center items-center"
        >
          {/* <OTPComponent /> */}
          <form
            className="md:w-96 "
            onSubmit={handleSubmit((data: any) => submitFun(data))}
          >
            <div className="title text-left mb-4">
              <h2 className="text-canter text-perfBlue text-3xl font-medium">
                Join us.
              </h2>
              <p className="text-perfGray text-base">Keep an eye on players.</p>
            </div>
            <div className="inputs mb-10 gap-4 flex w-full flex-col justify-center items-center">
              {/* Select Role Input */}
              <PerfSelect
                id="userRole"
                required
                error={errors.userRole && "Please select your Role"}
                className="w-full"
                label="Who are you"
                data={[
                  {
                    value: "Parent",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/437/437501.png",
                    label: "Parent",
                  },
                  {
                    value: "Coach",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3564/3564504.png",
                    label: "Coach",
                  },
                ]}
                name="userRole"
                control={control}
              />

              {/* [First and Last Name] */}
              <div className="flex gap-2 w-full">
                {/* FirstName Input */}
                <Input.Wrapper
                  className="w-full"
                  id="firstName"
                  withAsterisk
                  label="Name"
                  error={errors.firstName && "Please add your Name"}
                >
                  <Input
                    sx={{
                      ".mantine-Input-input	": {
                        border: 0,
                        padding: 0,
                        borderBottom: 1,
                        borderStyle: "solid",
                        borderRadius: 0,

                        minHeight: 20,
                      },
                    }}
                    className="border-b"
                    {...register("firstName")}
                    id="firstName"
                  />
                </Input.Wrapper>

                {/* Last Name Input */}
                <Input.Wrapper
                  className="w-full"
                  id="lastName"
                  label="Last Name"
                  error={errors.lastName && "Please add your Name"}
                >
                  <Input
                    sx={{
                      ".mantine-Input-input	": {
                        border: 0,
                        padding: 0,
                        borderBottom: 1,
                        borderStyle: "solid",
                        borderRadius: 0,

                        minHeight: 20,
                      },
                    }}
                    className="border-b"
                    {...register("lastName")}
                    id="lastName"
                  />
                </Input.Wrapper>
              </div>

              {/* Select country and city */}
              <div className="flex gap-2 w-full">
                <PerfSelect
                  id="country"
                  required
                  error={errors.country && "Please select your country"}
                  className="w-full"
                  label="Country"
                  name="country"
                  control={control}
                  data={[
                    {
                      label: "🇪🇬 Egypt",
                      value: "EG",
                    },
                    {
                      label: "🇦🇪 United Arab Emirates",
                      value: "AE",
                    },
                    {
                      label: "🇸🇦 Saudi Arabia",
                      value: "SA",
                    },
                    {
                      label: "🇰🇷 South Korea",
                      value: "KR",
                    },
                    {
                      label: "🇯🇴 Jordan",
                      value: "JO",
                    },
                  ]}
                />
                <PerfSelect
                  id="city"
                  required
                  error={errors.city && "Please select your City"}
                  className="w-full"
                  label="City"
                  name="city"
                  control={control}
                  data={State.getStatesOfCountry(country).map(
                    (item: { name: string }) => {
                      return { label: item.name, value: item.name };
                    }
                  )}
                />
              </div>

              {/* Select Club */}
              {AllClubs && (
                <PerfSelect
                  id="club"
                  required
                  error={errors.club && "Please select your Club"}
                  className="w-full"
                  label="Club"
                  name="club"
                  control={control}
                  data={
                    AllClubs?.data?.map((i: any) => ({
                      label: i.name,
                      value: i.id,
                    })) as unknown as Option[]
                  }
                />
              )}

              {/* Select Teams */}
              {userRole === "Coach" && teamsData && (
                <Controller
                  {...register("teams")}
                  render={({ field }) => (
                    <MultiSelect
                      className="w-full"
                      sx={{
                        ".mantine-MultiSelect-input": {
                          background: "none",
                          border: 0,
                          borderBottom: "1px solid",
                          borderRadius: 0,
                        },
                      }}
                      data={teamsData.data.map(
                        (team: { name: string; id: number }) => ({
                          label: team.name,
                          value: team.id,
                        })
                      )}
                      label="Select Your Teams"
                      {...field}
                      error={errors.teams ? errors.teams.message : undefined}
                    />
                  )}
                  control={control}
                />
              )}

              <Grid grow gutter="sm" className="w-full">
                {/* Select Country code Input */}

                <Grid.Col span={3} className="px-0">
                  <PerfSelect
                    id="countryCode"
                    required
                    error={
                      errors.countryCode && "Please select your country code"
                    }
                    className=""
                    label="code"
                    name="countryCode"
                    control={control}
                    data={[
                      { value: "🇪🇬 +20", label: "🇪🇬 +20" },
                      { value: "🇦🇪 +971", label: "🇦🇪 +971" },
                      { value: "🇸🇦 +966", label: "🇸🇦 +966" },
                      { value: "🇰🇷 +82", label: "🇰🇷 +82" },
                      { value: "🇯🇴 +962", label: "🇯🇴 +962" },
                    ]}
                  />
                </Grid.Col>

                {/* Mobile Number Input */}
                <Grid.Col span={9} className="pr-0">
                  <Input.Wrapper
                    id="phoneNumber"
                    withAsterisk
                    label="phone number"
                    error={errors.phoneNumber && "Please add your mobile"}
                  >
                    <Input
                      sx={{
                        ".mantine-Input-input	": {
                          border: 0,
                          padding: 0,
                          borderBottom: 1,
                          borderStyle: "solid",
                          borderRadius: 0,
                          minHeight: 20,
                        },
                      }}
                      className="border-b"
                      {...register("phoneNumber")}
                      id="phoneNumber"
                    />
                  </Input.Wrapper>
                </Grid.Col>
              </Grid>
              {/* Password Input */}
              <PasswordInput
                sx={{
                  ".mantine-PasswordInput-input": {
                    border: 0,
                    padding: 0,
                    borderBottom: 1,
                    borderStyle: "solid",
                    borderRadius: 0,
                    minHeight: 20,
                    background: "transparent",
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
                  "Password must be more than 8 characture and les than 24 character"
                }
                {...register("password")}
              />
            </div>
            <SubmitButton isLoading={isLoading} text="Create Account" />
            <p className="text-perfGray text-center text-base">
              Already have an account?
              <Link to="/sign-in">
                <span className="text-blue-500 cursor-pointer mx-1">
                  Sign in
                </span>
              </Link>
            </p>
          </form>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default SignUpPage;
