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
  Team,
} from "~/app/store/types/supervisor-types";
import {
  useGeneralSportsQuery,
  useGetFilteredPlayersQuery,
  useUserQuery,
} from "~/app/store/user/userApi";
import AppUtils from "~/@main/utils/AppUtils";
import {
  useAllClubPlayersQuery,
  useCoachAddTeamPlayerMutation,
} from "~/app/store/coach/coachApi";
import { CoachTeamInfo } from "~/app/store/types/coach-types";

type Props = {
  teamPlayers: TeamPlayers | undefined;
  coach_team_id?: number;
  teamInfo?: Team;
};

const AddPlayer = ({ coach_team_id, teamInfo }: Props) => {
  const [opened, setOpened] = useState(false);
  const [filteredPlayersData, setFilteredPlayersData] = useState<any>();
  const { data: user } = useUserQuery({});
  const [loading, setLoading] = useState<boolean>(false);
  const { team_id } = useParams();
  const [sportId, setSportId] = useState(0);

  const { data: sports } = useGeneralSportsQuery({});

  useEffect(() => {
    if (teamInfo) {
      if (sports) {
        const currentTeamSportId: number = sports?.results.filter(
          (sport) => sport.name === teamInfo?.sport
        )[0].id;
        setSportId(currentTeamSportId);
      }
    }
  }, [teamInfo, sports]);

  const currentTeamId = team_id;

  const { data: filteredPlayers, refetch } = useGetFilteredPlayersQuery({
    team_id: currentTeamId,
    sport_id: sportId,
  });

  useEffect(() => {
    if (filteredPlayers) {
      setFilteredPlayersData(filteredPlayers);
    }
  }, [filteredPlayers]);

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
    setTimeout(() => {
      refetch();
    }, 2000);
  };

  if (!teamInfo) {
    return <h1>LOADING...</h1>;
  }

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
            control={control}
            filteredPlayers={filteredPlayersData}
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

const ChoosePlayerInput = ({ control, filteredPlayers }: any) => {
  const [formatedFilteredPlayers, setFormatedFilteredPlayers] = useState();

  useEffect(() => {
    const test =
      filteredPlayers && filteredPlayers.length > 0
        ? filteredPlayers?.map((player: any) => {
            return {
              label: player.name,
              value: JSON.stringify(player.id),
              image: player.icon,
            };
          })
        : [];

    setFormatedFilteredPlayers(test);
  }, [filteredPlayers]);

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
          data={formatedFilteredPlayers || []}
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
