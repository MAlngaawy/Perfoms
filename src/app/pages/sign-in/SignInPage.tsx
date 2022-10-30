import { TextInput, Button } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useSigninMutation } from "app/store/user/userApi";
import PerfInput from "@main/components/Input";
import { PasswordInput } from "@mantine/core";
import PerfSelect from "@main/components/Select";

type Props = {};

const SignInPage = (props: Props) => {
  const [signinHandler] = useSigninMutation();
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm({});

  const submitFun = (data: object) => {
    console.log(data);
  };

  return (
    <div className="signIn h-screen flex">
      <div className="leftImage w-1/2">
        <img
          className="w-full h-full object-cover "
          src="/assets/images/performs_login.jpg"
          alt="Sign in"
        />
      </div>
      <div className="form w-1/2 flex justify-center items-center">
        <form
          className="w-96 "
          onSubmit={handleSubmit((data: any) => submitFun(data))}
        >
          <div className="title text-left mb-4">
            <h2 className="text-canter text-perfBlue text-3xl font-medium">
              Sign in.
            </h2>
            <p className="text-perfGray text-base">Wlcome back.</p>
          </div>
          <div className="inputs mb-10 gap-4 flex w-full flex-col justify-center items-center">
            <PerfInput
              type="text"
              label="Phone number"
              required
              placeHolder="Mobile Number"
              register={register}
            />
            <PasswordInput
              sx={{
                ".mantine-PasswordInput-input	": {
                  border: 0,
                  padding: 0,
                },
              }}
              className="border-b"
              placeholder="Password"
              label="Password"
              description="Password must include at least one letter, number and special character"
              withAsterisk
              {...register("password")}
            />
          </div>
          <button
            type="submit"
            className="mx-auto block w-full bg-perfBlue rounded-lg text-white p-4 mt-10 mb-2"
          >
            Sign in
          </button>
          <p className="text-perfGray text-center text-base">
            You don't have an account?
            <span className="text-blue-500 cursor-pointer mx-1">Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
