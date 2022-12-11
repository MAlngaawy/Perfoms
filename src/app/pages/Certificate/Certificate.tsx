import React from "react";
import PerfSelect from "~/@main/components/Select";
import { useForm } from "react-hook-form";
import { number } from "yup/lib/locale";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SubmitButton from "~/@main/components/SubmitButton";
import CustomBreadCrumbs from "~/@main/components/BreadCrumbs";

type Props = {};

const schema = yup.object().shape({
  by: yup.string().required(),
  player: yup.string(),
  team: yup.string(),
  type: yup.string().required(),
});

const Certificate = (props: Props) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: { by: "By Player", team: "", player: "", type: "" },
    resolver: yupResolver(schema),
  });

  const sendCertificate = (data: any) => {
    console.log(data);
  };

  const by = watch("by");

  return (
    <div className="m-4">
      <CustomBreadCrumbs
        items={[
          { title: "Home", href: "/coach-home" },
          { title: "Certificate", href: "" },
        ]}
      />
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(sendCertificate)}
          className=" py-28 w-72 flex flex-col justify-center items-center gap-4"
        >
          {/* <PerfSelect
            {...register("by")}
            id="by"
            required
            error={errors.by && "please select this certificate by what"}
            className="w-full"
            label="By"
            name="by"
            control={control}
            data={[
              { label: "By Player", value: "By Player" },
              { label: "By Team", value: "By Team" },
            ]}
          /> */}

          {by === "By Player" && (
            <PerfSelect
              {...register("player")}
              id="player"
              required
              error={errors.by && "please select the player"}
              className="w-full"
              label="Player"
              searchable={true}
              name="player"
              control={control}
              data={[
                { label: "PLayer One", value: "PLayer One" },
                { label: "Player Two", value: "Player Two" },
              ]}
            />
          )}
          {/* 
          {by === "By Team" && (
            <PerfSelect
              {...register("team")}
              id="team"
              required
              error={errors.by && "please select the team"}
              className="w-full"
              label="Team"
              name="team"
              control={control}
              data={[
                { label: "Team One", value: "Team One" },
                { label: "Team Two", value: "Team Two" },
              ]}
            />
          )}

          <PerfSelect
            {...register("type")}
            id="type"
            required
            error={errors.by && "please select the type of certificate"}
            className="w-full"
            label="Type Of Certificate"
            name="type"
            control={control}
            data={[
              { label: "Performances", value: "Performances" },
              { label: "Attendances", value: "Attendances" },
            ]}
          /> */}

          <SubmitButton isLoading={false} text="Send Certificate" />
        </form>
      </div>
    </div>
  );
};

export default Certificate;
