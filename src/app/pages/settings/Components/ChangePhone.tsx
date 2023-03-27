import { Grid, Input, PasswordInput } from "@mantine/core";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "~/@main/components/SubmitButton";
import { useEffect, useState } from "react";
import { useChangePasswordMutation } from "~/app/store/user/userApi";
import { showNotification } from "@mantine/notifications";
import PerfSelect from "~/@main/components/Select";

type Props = {
  setChange: any;
  mobile: string | undefined;
};

const schema = yup.object().shape({
  code: yup.string().required(),
  new_phone: yup.number().required(),
  password: yup.string().min(8).max(24).required(),
});

const ChangePhone = ({ setChange, mobile }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      code: "",
      new_phone: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 bg-white rounded-3xl p-6 w-11/12 sm:w-96">
      <h2>Change Phone number</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid.Col>
            <Input.Wrapper label="Phobe Number">
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
                placeholder={mobile}
                disabled
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={3}>
            <PerfSelect
              normalStyle
              id="code"
              required
              error={errors.code && errors.code.message}
              className=""
              label="code"
              name="code"
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
          <Grid.Col span={9}>
            <Input.Wrapper
              id="phoneNumber"
              withAsterisk
              label="new phone number"
              error={errors.new_phone && errors.new_phone.message}
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
                    minHeight: 20,
                  },
                }}
                className="border-b"
                {...register("new_phone")}
                id="phoneNumber"
              />
            </Input.Wrapper>
          </Grid.Col>
        </Grid>
        <PasswordInput
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
          className="w-full"
          {...register("password")}
          label="password"
          error={errors.password?.message}
          withAsterisk
        />
        <SubmitButton text="Next" isLoading={false} />
      </form>
    </div>
  );
};

export default ChangePhone;
