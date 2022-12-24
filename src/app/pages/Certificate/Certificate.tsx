import React, { forwardRef, useEffect, useState, useRef } from "react";
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
import EncourageCertificate from "../player-certificate/components/EncourageCertificateImage";
import CongratsCertificate from "../player-certificate/components/CongratsCertificateImage";
import CertificateImage from "../player-certificate/components/CertificateImage";

type Props = {};

const schema = yup.object().shape({
  // by: yup.string().required(),
  player: yup.string().required(),
  type: yup.string().required(),
  // team: yup.string(),
  // type: yup.string().required(),
});

const Certificate = (props: Props) => {
  const { data: allTeamsPlayers } = useCoachGetAllMyPlayersQuery({});
  const [certificate, setCertificate] = useState({
    created_at: new Date(),
    player: {
      name: "",
    },
    type: "",
  });
  const canvasRef = useRef(null);

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
    // console.log({
    //   player: +data.player,
    //   club: myClub ? myClub?.id : 0,
    //   team: 1,
    // });

    sendCertification({
      player: +data.player,
      type: data.type,
      club: myClub ? myClub?.id : 0,
      team: 1, // This Team ID Need to change (call Ali)
    })
      .then(() => {
        showNotification({
          title: "Done",
          color: "green",
          message: "Certificate Sent",
        });
        reset({ player: "", type: "" });
      })
      .catch((err) => {
        showNotification({
          title: "Sorry",
          message: "Something Went Wrong",
          color: "red",
        });
      });

    setCertificate({
      created_at: new Date(),
      player: {
        name: "",
      },
      type: "",
    });
  };

  useEffect(() => {
    if (watch().type !== "" && watch().player !== "") {
      let playerName = "";
      if (!allTeamsPlayers) return;
      for (let i = 0; i < allTeamsPlayers.results?.length; i++) {
        if (allTeamsPlayers.results[i].id === watch().player) {
          playerName = allTeamsPlayers.results[i].name;
          break;
        }
      }
      setCertificate({
        created_at: new Date(),
        player: {
          name: playerName,
        },
        type: watch().type,
      });
    }
  }, [watch()]);

  // const by = watch("by");

  return (
    <div className="m-4">
      <CustomBreadCrumbs
        items={[
          { title: "Home", href: "/coach-home" },
          { title: "Certificate", href: "" },
        ]}
      />
      <div className="flex flex-col justify-center items-center">
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
                placeholder="Select Player"
                itemComponent={SelectItem}
                data={inputData ? inputData : []}
                searchable
                maxDropdownHeight={300}
                nothingFound="Nobody here"
              />
            )}
          />

          <Controller
            control={control}
            {...register("type")}
            render={({ field }) => (
              <Select
                sx={{
                  width: "100%",
                }}
                {...field}
                id={"type"}
                name="type"
                placeholder="Certificate Type"
                data={[
                  "Performance",
                  "Congratulations",
                  "Encouragement",
                  "Other",
                ]}
                searchable
                maxDropdownHeight={300}
                nothingFound="Nobody here"
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
        {watch().player && watch().type ? (
          <div className="flex flex-col bg-black justify-center items-center overflow-auto max-w-full">
            {watch().type === "Encouragement" ? (
              <EncourageCertificate certificate={certificate} ref={canvasRef} />
            ) : watch().type === "Congratulations" ? (
              <CongratsCertificate certificate={certificate} ref={canvasRef} />
            ) : (
              <CertificateImage certificate={certificate} ref={canvasRef} />
            )}
          </div>
        ) : null}
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
