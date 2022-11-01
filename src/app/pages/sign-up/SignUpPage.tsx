import { Select, Input, Grid } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
// import { useSigninMutation } from "app/store/user/userApi";
import { PasswordInput } from "@mantine/core";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "app/configs/dataService";

type Props = {};

const schema = yup.object().shape({
  userRole: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string(),
  country: yup.string().required(),
  city: yup.string(),
  club: yup.string().required(),
  countryCode: yup.string().required(),
  phoneNumber: yup.number().required(),
  password: yup.string().min(8).max(24).required(),
});

const SignUpPage = (props: Props) => {
  // const [signinHandler, {}] = useSigninMutation();
  const [clubs, setClubs] = useState([]);

  // User Effect to fetch our clubs
  useEffect(() => {
    fetch(`${BASE_URL}/core/clubs/`)
      .then((res) => res.json())
      .then(({ data }) => {
        const newClubs = data.map((club: { name: string; id: number }) => {
          return { label: club.name, value: club.id };
        });
        setClubs(newClubs);
      })
      .catch((err) => console.log(err));
  }, []);

  // local schema
  yup.setLocale({
    // use constant translation keys for messages without values
    mixed: {
      default: "field_invalid",
    },
    // use functions to generate an error object that includes the value from the schema
    number: {
      min: ({ min }) => ({ key: "field_too_short", values: { min } }),
      max: ({ max }) => ({ key: "field_too_big", values: { max } }),
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitFun = (data: any) => {
    console.log(data);
    // const newData = {
    //   mobile: data.countryCode + data.phoneNumber,
    //   password: data.password,
    // };
    // signinHandler(newData);
  };

  return (
    <div className="signIn min-h-screen flex items-center justify-center">
      <div className="leftImage hidden md:block md:w-1/2 h-full">
        <img
          className="w-full h-full object-cover "
          src="/assets/images/performs_signup.jpg"
          alt="Sign in"
        />
      </div>
      <div className="form py-10 md:w-1/2 px-4 flex justify-center items-center">
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
            <Controller
              render={({ field }) => (
                <Select
                  id="userRole"
                  withAsterisk
                  error={errors.userRole && "Please select your Role"}
                  sx={{
                    ".mantine-Input-input": {
                      border: 0,
                      padding: 0,
                      borderBottom: 1,
                      borderStyle: "solid",
                      borderRadius: 0,
                    },
                  }}
                  className="w-full"
                  label="Who are you"
                  data={[
                    { value: "Parent", label: "Parent" },
                    { value: "Coach", label: "Coach" },
                  ]}
                  {...field}
                />
              )}
              name="userRole"
              control={control}
              defaultValue=""
            />

            {/* [First and Last Name] */}
            <div className="flex gap-2">
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
                    },
                  }}
                  className="border-b"
                  {...register("lastName")}
                  id="lastName"
                />
              </Input.Wrapper>
            </div>

            {/* Select country and city */}
            <div className="flex gap-2">
              <Controller
                render={({ field }) => (
                  <Select
                    id="country"
                    withAsterisk
                    error={errors.country && "Please select your Country"}
                    sx={{
                      ".mantine-Input-input": {
                        border: 0,
                        padding: 0,
                        borderBottom: 1,
                        borderStyle: "solid",
                        borderRadius: 0,
                      },
                    }}
                    className="w-full"
                    label="Country"
                    data={[
                      {
                        label: "Egypt",
                        value: "EG",
                        country: "egypt",
                      },
                      {
                        label: "United Arab Emirates",
                        value: "AE",
                        country: "United Arab Emirates",
                      },
                      {
                        label: "Saudi Arabia",
                        value: "SA",
                        country: "Saudi Arabia",
                      },
                      {
                        label: "South Korea",
                        value: "KR",
                        country: "South Korea",
                      },
                      {
                        label: "Jordan",
                        value: "JO",
                        country: "Jordan",
                      },
                    ]}
                    {...field}
                  />
                )}
                name="country"
                control={control}
                defaultValue=""
              />

              <Controller
                render={({ field }) => (
                  <Select
                    id="city"
                    error={errors.city && "Please select your City"}
                    sx={{
                      ".mantine-Input-input": {
                        border: 0,
                        padding: 0,
                        borderBottom: 1,
                        borderStyle: "solid",
                        borderRadius: 0,
                      },
                    }}
                    className="w-full"
                    label="City"
                    data={[
                      {
                        label: "Egypt",
                        value: "EG",
                        country: "egypt",
                      },
                      {
                        label: "United Arab Emirates",
                        value: "AE",
                        country: "United Arab Emirates",
                      },
                    ]}
                    {...field}
                  />
                )}
                name="city"
                control={control}
                defaultValue=""
              />
            </div>

            {/* Select Club */}
            <Controller
              render={({ field }) => (
                <Select
                  id="club"
                  withAsterisk
                  error={errors.club && "Please select your Club"}
                  sx={{
                    ".mantine-Input-input": {
                      border: 0,
                      padding: 0,
                      borderBottom: 1,
                      borderStyle: "solid",
                      borderRadius: 0,
                    },
                  }}
                  className="w-full"
                  label="Club"
                  data={clubs}
                  // data={clubs.map((oneClub): object =>  {label: "LOL", value: })}
                  {...field}
                />
              )}
              name="club"
              control={control}
              defaultValue=""
            />

            <Grid grow gutter="sm">
              {/* Select Country code Input */}
              <Grid.Col span={3}>
                <Controller
                  render={({ field }) => (
                    <Select
                      id="select-code"
                      withAsterisk
                      error={
                        errors.countryCode && "Please select your country code"
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
                    />
                  )}
                  name="countryCode"
                  control={control}
                  defaultValue=""
                />
              </Grid.Col>

              {/* Mobile Number Input */}
              <Grid.Col span={9}>
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
          <button
            type="submit"
            className="mx-auto block w-full bg-perfBlue rounded-lg text-white p-4 mt-10 mb-2"
          >
            Create Account
          </button>
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
