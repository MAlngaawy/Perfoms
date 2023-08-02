import {
  useSuperRemoveTeamPlayerMutation,
  useSuperTeamPlaersQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import AppIcons from "../../../../../@main/core/AppIcons";
import AddPlayer from "./AddPLayerToTeam";
import DeletePlayerFromTeam from "./DeletePlayerFromTeam";
import { useNavigate } from "react-router-dom";
import {
  useGeneralSportsQuery,
  useGetFilteredPlayersQuery,
  useUserQuery,
} from "~/app/store/user/userApi";
import { TeamPlayers } from "~/app/store/types/clubManager-types";
import { useEffect, useState } from "react";
import {
  useAdminRemoveTeamPlayerMutation,
  useAdminTeamPlaersQuery,
} from "~/app/store/clubManager/clubManagerApi";
import AppUtils from "~/@main/utils/AppUtils";
import { useRemoveTeamPlayerMutation } from "~/app/store/coach/coachApi";
import { Avatar } from "@mantine/core";
import { Team } from "~/app/store/types/supervisor-types";

type Props = {
  teamId: string;
  teamInfo?: Team;
};

const TeamPlayersComponent = ({ teamInfo, teamId }: Props) => {
  const [players, setPlayers] = useState<TeamPlayers>();
  const { data: user } = useUserQuery({});

  const { data: superPlayers } = useSuperTeamPlaersQuery(
    { team_id: teamId },
    { skip: !teamId || user?.user_type !== "Supervisor" }
  );
  const { data: adminPlayers } = useAdminTeamPlaersQuery(
    { team_id: teamId },
    { skip: !teamId || user?.user_type !== "Admin" }
  );

  const [sportId, setSportId] = useState(0);

  const { data: sports } = useGeneralSportsQuery({});

  useEffect(() => {
    if (teamInfo) {
      if (sports) {
        const currentTeamSportId: number = sports?.results.filter(
          (sport) => sport.name === teamInfo?.sport?.name
        )[0].id;
        setSportId(currentTeamSportId);
      }
    }
  }, [teamInfo, sports]);

  const { data: filteredPlayers, refetch: refetchFilteredPlayers } =
    useGetFilteredPlayersQuery({
      team_id: teamId,
      sport_id: sportId,
    });

  useEffect(() => {
    if (superPlayers) setPlayers(superPlayers);
    if (adminPlayers) setPlayers(adminPlayers);
  }, [superPlayers, adminPlayers]);

  return (
    <div>
      <h2 className="p-2 text-center text-lg">Team Players</h2>
      <div className="flex flex-wrap justify-center gap-2 xs:gap-4  mt-4">
        {players &&
          players.results.map((player) => {
            return (
              <SinglePlayer
                key={player.id}
                teamId={teamId}
                id={player.id}
                name={player.name}
                image={player.icon}
                refetchFilteredPlayers={refetchFilteredPlayers}
              />
            );
          })}
        <AddPlayer
          filteredPlayers={filteredPlayers}
          refetchFilteredPlayers={refetchFilteredPlayers}
          teamInfo={teamInfo}
          teamPlayers={players}
        />
      </div>
    </div>
  );
};

export const SinglePlayer = ({
  id,
  image,
  name,
  teamId,
  refetchFilteredPlayers,
}: any) => {
  const navigate = useNavigate();
  const { data: user } = useUserQuery(null);

  const [superRemovePlayer] = useSuperRemoveTeamPlayerMutation();
  const [adminRemovePlayer] = useAdminRemoveTeamPlayerMutation();
  const [coachRemovePlayer] = useRemoveTeamPlayerMutation();

  const removeTeamPlayer = (teamId: number, playerId: number) => {
    if (user?.user_type === "Supervisor") {
      superRemovePlayer({ team_id: teamId, player_id: playerId })
        .then((res) => {
          //@ts-ignore
          if (res.error && res.error.status === 424) {
            AppUtils.showNotificationFun(
              "Error",
              "Player can't be without team",
              "Please add this player in another team first"
            );
          }
          //@ts-ignore
          if (res.data && res.data.errors === false) {
            AppUtils.showNotificationFun(
              "Success",
              "Done",
              "Player removed successfully"
            );
          }
        })
        .catch((err) => {
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Can't delete this player now"
          );
        });
    } else if (user?.user_type === "Admin") {
      adminRemovePlayer({ team_id: teamId, player_id: playerId })
        .then((res) => {
          //@ts-ignore
          if (res.error && res.error.status === 424) {
            AppUtils.showNotificationFun(
              "Error",
              "Player can't be without team",
              "Please add this player in another team first"
            );
          }
          //@ts-ignore
          if (res.data && res.data.errors === false) {
            AppUtils.showNotificationFun(
              "Success",
              "Done",
              "Player removed successfully"
            );
          }
        })
        .catch((err) => {
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Can't delete this player now"
          );
        });
    } else if (user?.user_type === "Coach") {
      coachRemovePlayer({ team_id: teamId, player_id: playerId })
        .then((res) => {
          //@ts-ignore
          if (res.error && res.error.status === 424) {
            AppUtils.showNotificationFun(
              "Error",
              "Player can't be without team",
              "Please add this player in another team first"
            );
          }
          //@ts-ignore
          if (res.data && res.data.errors === false) {
            AppUtils.showNotificationFun(
              "Success",
              "Done",
              "Player removed successfully"
            );
          }
        })
        .catch((err) => {
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Can't delete this player now"
          );
        });
    }

    setTimeout(() => {
      refetchFilteredPlayers();
    }, 2000);
  };

  return (
    <div
      key={id}
      className="h-full border border-gray-200 w-30 h-62 bottom-2 p-2 relative items-center rounded-lg text-center bg-white flex flex-col justify-between"
    >
      <div className="overlay flex justify-center items-stretch flex-col gap-2 rounded-lg w-full h-full absolute z-30 left-0 top-0 bg-transparent group hover:bg-black/60">
        <div
          onClick={() =>
            navigate(`/players/${id}`, {
              state: {
                teamId,
              },
            })
          }
          className="hidden group-hover:flex text-white gap-2 cursor-pointer justify-center items-center bg-perfBlue py-1 w-full"
        >
          <AppIcons className="w-5 h-5 text-white" icon="UserIcon:outline" />
          <span className="text-white text-xs">View profile</span>
        </div>
        <DeletePlayerFromTeam
          deleteFun={() => removeTeamPlayer(teamId, id)}
          id={id}
          name={name}
          type="player"
        />
      </div>
      <Avatar className="w-28 h-28" src={image} alt="player Image" />
      <div className="w-28">
        <h2 className="text-xs my-2">{name}</h2>
      </div>
    </div>
  );
};

export default TeamPlayersComponent;
