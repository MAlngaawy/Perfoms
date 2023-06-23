import React, { useState, forwardRef, useEffect } from "react";
import { Modal, Group, Avatar, Text, Select } from "@mantine/core";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { Controller, useForm } from "react-hook-form";
import {
  useSuperAddTeamPlayerMutation,
  useSuperPlayersQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import { useParams } from "react-router-dom";
import __ from "lodash";
import { TeamPlayers, TeamPlayer } from "~/app/store/types/clubManager-types";
import {
  useAdminAddTeamPlayerMutation,
  useAdminPlayersQuery,
} from "~/app/store/clubManager/clubManagerApi";
import {
  SuperVisorPlayers,
  SuperVisorTeamInfo,
} from "~/app/store/types/supervisor-types";
import { useUserQuery } from "~/app/store/user/userApi";
import AppUtils from "~/@main/utils/AppUtils";
import {
  useAllClubPlayersQuery,
  useCoachAddTeamPlayerMutation,
} from "~/app/store/coach/coachApi";
import { CoachTeamInfo } from "~/app/store/types/coach-types";

type Props = {
  teamPlayers: TeamPlayers | undefined;
  coach_team_id?: number;
  teamInfo: SuperVisorTeamInfo | CoachTeamInfo | undefined;
};

const AddPlayer = ({ teamPlayers, coach_team_id, teamInfo }: Props) => {
  const [opened, setOpened] = useState(false);
  const { data: user } = useUserQuery({});
  const [loading, setLoading] = useState<boolean>(false);
  const { team_id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const [
    superAddPlayer,
    { isSuccess: superAddSuccess, isError: superAddError },
  ] = useSuperAddTeamPlayerMutation();
  const [
    adminAddPlayer,
    { isSuccess: adminAddSuccess, isError: adminAddError },
  ] = useAdminAddTeamPlayerMutation();

  const [
    coachAddPlayer,
    { isSuccess: coachAddSuccess, isError: coachAddError },
  ] = useCoachAddTeamPlayerMutation();

  useEffect(() => {
    if (superAddSuccess || adminAddSuccess || coachAddSuccess) {
      AppUtils.showNotificationFun(
        "Success",
        "Done",
        "Successfully Added Player"
      );
    }

    if (adminAddError || superAddError || coachAddError) {
      AppUtils.showNotificationFun("Error", "Wrong", "Something went wrong");
    }
  }, [
    superAddSuccess,
    adminAddSuccess,
    adminAddError,
    superAddError,
    coachAddSuccess,
    coachAddError,
  ]);

  const addPlayerFunc = (data: any) => {
    setLoading(true);
    if (user?.user_type === "Supervisor") {
      superAddPlayer({
        team_id: team_id,
        player_id: data.player,
      })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else if (user?.user_type === "Admin") {
      adminAddPlayer({
        team_id: team_id,
        player_id: data.player,
      })
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else if (user?.user_type === "Coach") {
      coachAddPlayer({
        team_id: coach_team_id,
        player_id: data.player,
      })
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  const onSubmit = (data: any) => {
    addPlayerFunc(data);
    setOpened(false);
    reset({ player: "" });
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          reset({ player: "" });
        }}
        title={`Add Player`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ChoosePlayerInput
            teamPlayers={teamPlayers}
            teamInfo={teamInfo}
            control={control}
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
    </div>
  );
};

const ChoosePlayerInput = ({ teamPlayers, teamInfo, control }: any) => {
  const { data: user } = useUserQuery({});
  const [players, setPlayers] = useState<SuperVisorPlayers>();

  const [playersData, setPlayersData] = useState<any>([]);
  // Fetch All Club Plaers to filter it
  const { data: superPlayers } = useSuperPlayersQuery({});
  const { data: adminPlayers } = useAdminPlayersQuery(
    { club_id: user?.club, sport: teamInfo.sport },
    { skip: !user?.club }
  );
  const { data: coachPlayers } = useAllClubPlayersQuery(
    {},
    { skip: user?.user_type !== "Coach" }
  );

  useEffect(() => {
    if (superPlayers) setPlayers(superPlayers);
    if (adminPlayers) setPlayers(adminPlayers);
    if (coachPlayers) setPlayers(coachPlayers);

    // Filter the team players vs all club players
    //to show only the not team member players in the select input
    if (players && teamPlayers) {
      //get all club players
      const allPlayers = players?.results;

      //get selected-team players
      const teamPlayersData = teamPlayers?.results;

      //filter all players to retunr just the players related to team sports
      const filterPerTeamSport = allPlayers.filter((player) => {
        console.log(player.sport);
        //@ts-ignore
        return (
          player?.sport?.toLocaleLowerCase() ===
          teamInfo?.sport.toLocaleLowerCase()
        );
      });

      // remove the team players from the players comes from sport filter
      // const filterdPlayers = __.xorBy(allPlayers, teamPlayersData, "id");
      const filterdPlayers = filterPerTeamSport.filter((player: any) => {
        return !teamPlayersData.some((teamPlayer: any) => {
          return teamPlayer.id === player.id;
        });
      });

      let test = filterdPlayers.map((player) => {
        return {
          label: player.name,
          image: player.icon,
          value: player.id,
          id: player.id,
        };
      });

      setPlayersData(test);
    }
  }, [players, superPlayers, adminPlayers, coachPlayers, teamPlayers]);

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
            item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
            false
          }
        />
      )}
    />
  );
};

export default AddPlayer;
