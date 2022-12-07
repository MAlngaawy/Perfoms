import React, { useState, forwardRef, useEffect } from "react";
import { Modal, Group, Avatar, Text, Select } from "@mantine/core";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { Controller, useForm } from "react-hook-form";
import {
  useSuperAddTeamPlayerMutation,
  useSuperPlayersQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import { useParams } from "react-router-dom";
import { showNotification } from "@mantine/notifications";

// type Props = { teamPlayers: any[] };

const AddPlayer = async (props: Props) => {
  const [opened, setOpened] = useState(false);
  const [playersData, setPlayersData] = useState<any>([]);
  const { data: players } = useSuperPlayersQuery({});

  const { id: team_id } = useParams();

  let lol2: any[] = [];

  useEffect(() => {
    let test = players?.results.map((player) => {
      return {
        label: player.name,
        image: player.icon,
        value: player.id,
        id: player.id,
      };
    });

    console.log("test", test);
    console.log("teamPlayers", teamPlayers);

    setPlayersData(test);

    // for (let player of test || []) {
    //   for (let teamPlayer of teamPlayers) {
    //     if (teamPlayer.id === player.id) {
    //       lol2.push(player);
    //     }
    //   }
    // }

    // console.log(lol2);
  }, [players, teamPlayers, lol2]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const [addPlayer] = useSuperAddTeamPlayerMutation();

  const onSubmit = (data: any) => {
    addPlayer({
      team_id: team_id,
      player_id: data.player,
    })
      .then((res) => {
        showNotification({
          message: "Successfly Added Player",
          color: "green",
          title: "Done",
          styles: {
            root: {
              backgroundColor: "#27AE60",
              borderColor: "#27AE60",
              "&::before": { backgroundColor: "#fff" },
            },

            title: { color: "#fff" },
            description: { color: "#fff" },
            closeButton: {
              color: "#fff",
            },
          },
        });
      })
      .catch((err) => {
        showNotification({
          message: err.message,
          color: "ref",
          title: "Wrong",
          styles: {
            root: {
              backgroundColor: "#EB5757",
              borderColor: "#EB5757",
              "&::before": { backgroundColor: "#fff" },
            },

            title: { color: "#fff" },
            description: { color: "#fff" },
            closeButton: {
              color: "#fff",
            },
          },
        });
      });
    console.log(data);
    setOpened(false);
    reset({ player: "" });
  };

  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    image: string;
    label: string;
    id: string;
  }

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, id, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar radius={"xl"} size="sm" src={image} />
          <div>
            <Text size="sm">{label}</Text>
          </div>
        </Group>
      </div>
    )
  );

  return (
    <div>
      <>
        <Modal
          opened={opened}
          onClose={() => {
            setOpened(false);
            reset({ player: "" });
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="player"
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Pick one"
                  searchable
                  itemComponent={SelectItem}
                  maxDropdownHeight={400}
                  // {...register("coach")}
                  nothingFound="No options"
                  data={playersData}
                  filter={(value, item) =>
                    item.label
                      ?.toLowerCase()
                      .includes(value.toLowerCase().trim()) || false
                  }
                />
              )}
            />
            <SubmitButton isLoading={false} text="Add Player" />
          </form>
        </Modal>

        <Group position="left" className="w-full h-full">
          <button
            className="w-full h-full p-4 bg-slate-300 text-perfGray3 rounded-lg"
            onClick={() => setOpened(true)}
          >
            + Add Player
          </button>
        </Group>
      </>
    </div>
  );
};

export default AddPlayer;
