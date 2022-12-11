import React, { forwardRef, useEffect } from "react";
import PerfSelect from "~/@main/components/Select";
import { Controller, useForm } from "react-hook-form";
import { number } from "yup/lib/locale";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SubmitButton from "~/@main/components/SubmitButton";
import CustomBreadCrumbs from "~/@main/components/BreadCrumbs";
import {
  useCoachGenerateCertificateMutation,
  useCoachGetAllMyPlayersQuery,
  useMyClubQuery,
} from "~/app/store/coach/coachApi";
import { Avatar, Group, Select, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

type Props = {};

const schema = yup.object().shape({
  // by: yup.string().required(),
  player: yup.string().required(),
  // team: yup.string(),
  // type: yup.string().required(),
});

const Certificate = (props: Props) => {
  const { data: allTeamsPlayers } = useCoachGetAllMyPlayersQuery({});

  console.log(allTeamsPlayers);

  let inputData: any = allTeamsPlayers?.results.map((player) => {
    return {
      image: player.icon,
      label: player.name,
      value: player.id,
      id: player.id,
    };
  });

  // useEffect(() => {
  //   inputData = allTeamsPlayers?.results.map((player) => {
  //     return {
  //       image: player.icon,
  //       label: player.name,
  //       value: player.id,
  //     };
  //   });
  // }, [allTeamsPlayers]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: myClub } = useMyClubQuery({});
  const [sendCertification, { isLoading }] =
    useCoachGenerateCertificateMutation();

  const sendCertificate = (data: any) => {
    console.log({
      player: +data.player,
      club: myClub ? myClub?.id : 0,
      team: 1,
    });

    sendCertification({
      player: +data.player,
      club: myClub ? myClub?.id : 0,
      team: 1, // This Team ID Need to change (call Ali)
    })
      .then(() => {
        showNotification({
          title: "Done",
          color: "green",
          message: "Certificate Sent",
        });
        reset({ player: "" });
      })
      .catch((err) => {
        showNotification({
          title: "Sorry",
          message: "Something Went Wrong",
          color: "red",
        });
      });
    // console.log({ ...data, club: myClub && myClub.id });
  };

  // const by = watch("by");

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

          {/* {by === "6 Player" && ( */}

          <Controller
            control={control}
            {...register("player")}
            render={({ field }) => (
              <Select
                sx={{
                  width: "100%",
                }}
                {...field}
                id={"player"}
                name="player"
                // label="Select Player to send Certification"
                placeholder="Select Player"
                itemComponent={SelectItem}
                data={inputData ? inputData : []}
                searchable
                maxDropdownHeight={300}
                nothingFound="Nobody here"
                // filter={(value, item) =>
                //   item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                //   item.description.toLowerCase().includes(value.toLowerCase().trim())
                // }
              />
            )}
          />

          {/* )} */}
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

          <SubmitButton isLoading={isLoading} text="Send Certificate" />
        </form>
      </div>
    </div>
  );
};

export default Certificate;

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar radius={"xl"} src={image} />
        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
);
