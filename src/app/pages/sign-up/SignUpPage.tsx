import { Input, Grid, MultiSelect, Loader } from "@mantine/core";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { State } from "country-state-city";
import PerfSelect, { Option } from "~/@main/components/Select";
import { Controller } from "react-hook-form";
import { usePublicClubsQuery, useTeamsQuery } from "~/app/store/core/coreApi";
import {
  useClubTeamsQuery,
  useSendOtpMutation,
  useSignupMutation,
} from "~/app/store/user/userApi";
import SubmitButton from "~/@main/components/SubmitButton";
import AppUtils from "~/@main/utils/AppUtils";

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
  const [signupHandler, { data, isLoading, isSuccess }] = useSignupMutation();
  const navigator = useNavigate();
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
  const selectedClub = watch("club");
  const { data: teamsData } = useClubTeamsQuery(
    { club_id: selectedClub },
    {
      skip: userRole !== "Coach" || !selectedClub,
    }
  );

  useEffect(() => {
    setValue("city", "");
    setValue("teams", []);
    console.log(selectedClub);
    console.log(teamsData);
  }, [country, setValue, userRole, teamsData, selectedClub]);

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
    signupHandler(requestData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isSuccess && data) {
      console.log("Data", data);

      //! We Stoped the OTP for now, and will be work later
      // navigator(
      //   `/verify-otp?usermobile=${data.data.mobile}&type=new&role=${userRole}`
      // );

      AppUtils.showNotificationFun(
        "Success",
        "Registered Successfully",
        "Please Sign in"
      );

      //* Now we will redirect the user to login
      navigator("/sign-in");
    }
  }, [isSuccess, data]);

  return (
    <div className="flex h-screen overflow-hidden overflow-x-auto justify-center items-center">
      <div className="h-full w-1/2 relative hidden md:block">
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
          src="/assets/images/performs_signup.jpg"
          className="w-full h-full max-w-full max-h-full object-cover"
        />
      </div>
      <div className="mx-auto w-full md:w-1/2 flex justify-center">
        {/* <OTPComponent /> */}
        <form
          className=" mx-4 md:w-96 overflow-hidden overflow-y-auto"
          onSubmit={handleSubmit((data: any) => submitFun(data))}
        >
          <div className="title text-left mb-4">
            <h2 className="text-canter text-perfBlue text-3xl font-medium">
              Join us.
            </h2>
            <p className="text-perfGray text-base">Keep an eye on players.</p>
          </div>
          <div className="inputs gap-4 flex w-full flex-col justify-center items-center">
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
                  label: "👨‍👩‍👦 Parent",
                },
                {
                  value: "Coach",
                  image:
                    "https://cdn-icons-png.flaticon.com/512/3564/3564504.png",
                  label: "🏋️ Coach",
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
                sx={{
                  ".mantine-InputWrapper-label": {
                    fontSize: 10,
                  },
                }}
              >
                <Input
                  sx={{
                    ".mantine-Input-input	": {
                      border: 0,
                      padding: 0,
                      borderBottom: 1,
                      borderStyle: "solid",
                      borderRadius: 0,
                      minHeight: 10,
                      maxHeight: 15,
                      fontSize: 12,
                    },
                  }}
                  className="border-b"
                  {...register("firstName")}
                  id="firstName"
                  pattern="[a-zA-z]{1,100}"
                  title="first name should only contains letters e.g:Ali"
                />
              </Input.Wrapper>

              {/* Last Name Input */}
              <Input.Wrapper
                className="w-full"
                id="lastName"
                label="Last Name"
                error={errors.lastName && "Please add your Name"}
                sx={{
                  ".mantine-InputWrapper-label": {
                    fontSize: 10,
                  },
                }}
              >
                <Input
                  sx={{
                    ".mantine-Input-input	": {
                      border: 0,
                      padding: 0,
                      borderBottom: 1,
                      borderStyle: "solid",
                      borderRadius: 0,
                      minHeight: 10,
                      maxHeight: 15,
                      fontSize: 12,
                    },
                  }}
                  className="border-b"
                  {...register("lastName")}
                  id="lastName"
                  pattern="[a-zA-z]{1,100}"
                  title="last name should only contains letters e.g:Ali"
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
                searchable
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
                        minHeight: 10,
                        fontSize: 12,
                      },
                      ".mantine-MultiSelect-label": {
                        fontSize: 10,
                      },
                    }}
                    //@ts-ignore
                    data={teamsData.results.map(
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
                  sx={{
                    ".mantine-InputWrapper-label": {
                      fontSize: 10,
                    },
                  }}
                >
                  <Input
                    type={"number"}
                    sx={{
                      ".mantine-Input-input	": {
                        border: 0,
                        padding: 0,
                        borderBottom: 1,
                        borderStyle: "solid",
                        borderRadius: 0,
                        minHeight: 10,
                        maxHeight: 15,
                        fontSize: 12,
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
                  minHeight: 10,
                  maxHeight: 15,
                  fontSize: 12,
                  background: "transparent",
                },
                ".mantine-PasswordInput-innerInput": {
                  paddingLeft: 0,
                  paddingBottom: 20,
                },
                ".mantine-PasswordInput-label": {
                  fontSize: 10,
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
              <span className="text-blue-500 cursor-pointer mx-1">Sign in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
