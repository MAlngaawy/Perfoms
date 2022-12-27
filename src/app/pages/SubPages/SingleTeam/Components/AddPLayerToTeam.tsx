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
import __ from "lodash";
import { TeamPlayers } from "~/app/store/types/clubManager-types";
import {
  useAdminAddTeamPlayerMutation,
  useAdminPlayersQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { SuperVisorPlayers } from "~/app/store/types/supervisor-types";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {
  teamPlayers: TeamPlayers | undefined;
};

const AddPlayer = ({ teamPlayers }: Props) => {
  const [opened, setOpened] = useState(false);
  const [playersData, setPlayersData] = useState<any>([]);
  const [players, setPlayers] = useState<SuperVisorPlayers>();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: superPlayers } = useSuperPlayersQuery({});
  const { data: adminPlayers } = useAdminPlayersQuery({});
  const { data: user } = useUserQuery({});

  const { id: team_id } = useParams();

  useEffect(() => {
    if (superPlayers) setPlayers(superPlayers);
    if (adminPlayers) setPlayers(adminPlayers);

    // Filter the team players vs all club players
    //to show only the not team member players in the select input
    const allPlayers = players?.results;
    const teamPlayersData = teamPlayers?.results;
    const filterdPlayers = __.xorBy(allPlayers, teamPlayersData, "id");

    let test = filterdPlayers.map((player) => {
      return {
        label: player.name,
        image: player.icon,
        value: player.id,
        id: player.id,
      };
    });

    setPlayersData(test);
  }, [players, superPlayers, adminPlayers]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const [superAddPlayer] = useSuperAddTeamPlayerMutation();
  const [adminAddPlayer] = useAdminAddTeamPlayerMutation();

  const addPlayerFunc = (data: any) => {
    setLoading(true);
    if (user?.user_type === "Supervisor") {
      superAddPlayer({
        team_id: team_id,
        player_id: data.player,
      })
        .then(() => {
          setLoading(false);
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
          setLoading(false);
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
    } else if (user?.user_type === "Admin") {
      adminAddPlayer({
        team_id: team_id,
        player_id: data.player,
      })
        .then((res) => {
          setLoading(false);
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
          setLoading(false);
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
    }
  };

  const onSubmit = (data: any) => {
    addPlayerFunc(data);
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
                  placeholder="Choose Player"
                  autoFocus={true}
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
            <SubmitButton isLoading={loading} text="Add Player" />
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
