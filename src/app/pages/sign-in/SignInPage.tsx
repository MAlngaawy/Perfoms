import { TextInput, Button } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useSigninMutation } from "app/store/user/userApi";

type Props = {};

const SignInPage = (props: Props) => {
  const [signinHandler] = useSigninMutation();
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm({});

  return (
    <form
      className="w-96"
      onSubmit={handleSubmit((data: any) => signinHandler(data))}
    >
      <TextInput
        label="Mobile"
        placeholder="Mobile Number"
        description="Plese Enter ur mobile number"
        inputWrapperOrder={["label", "error", "input", "description"]}
        {...register("mobile")}
      />
      <TextInput
        mt="xl"
        label="Password"
        placeholder="Password"
        type="password"
        description="Error and description are"
        inputWrapperOrder={["label", "input", "description", "error"]}
        {...register("password")}
      />
      <Button color="green" type="submit" variant="default">
        Submit
      </Button>
    </form>
  );
};

export default SignInPage;
