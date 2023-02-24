import React, { forwardRef, useEffect, useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
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
import __ from "lodash";
import {
  CertificateTypes,
  PlayerCertificate,
} from "~/app/store/types/parent-types";

type Props = {};

const schema = yup.object().shape({
  player: yup.string().required(),
  type: yup.string().required(),
});

const Certificate = (props: Props) => {
  const { data: allTeamsPlayers } = useCoachGetAllMyPlayersQuery({});
  const [certificate, setCertificate] = useState<Partial<PlayerCertificate>>(
    {}
  );
  const canvasRef = useRef(null);

  let inputData: any = allTeamsPlayers?.results.map((player) => {
    return {
      image: player.icon,
      label: player.name,
      value: player.id,
      id: player.id,
    };
  });

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

  const watchedPlayer = watch("player");
  const watchedType = watch("type");

  const { data: myClub } = useMyClubQuery({});
  const [sendCertification, { isLoading }] =
    useCoachGenerateCertificateMutation();

  const sendCertificate = (data: any) => {
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
    // Get Player Name
    const playerName: string =
      __.find(allTeamsPlayers?.results, {
        id: watchedPlayer,
      })?.name || "No Player";

    // set The stat
    setCertificate({
      created_at: new Date(),
      player: {
        name: playerName,
      },
      type: watchedType as CertificateTypes,
    });
  }, [watchedPlayer, watchedType]);

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
                data={["Performance", "Congratulations", "Encouragement"]}
                searchable
                maxDropdownHeight={300}
                nothingFound="Nobody here"
              />
            )}
          />

          <SubmitButton isLoading={isLoading} text="Send Certificate" />
        </form>
        {watchedPlayer && watchedType ? (
          <div className="flex flex-col bg-black justify-center items-center overflow-auto max-w-full">
            {watchedType === "Encouragement" ? (
              <EncourageCertificate certificate={certificate} ref={canvasRef} />
            ) : watchedType === "Congratulations" ? (
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
