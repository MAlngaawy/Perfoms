import {
  useSuperRemoveTeamPlayerMutation,
  useSuperTeamCoachesQuery,
  useSuperTeamPlaersQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import AppIcons from "../../../../../@main/core/AppIcons";
import AddPlayer from "./AddPLayerToTeam";
import DeletePlayerFromTeam from "./DeletePlayerFromTeam";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { useUserQuery } from "~/app/store/user/userApi";
import { TeamPlayers } from "~/app/store/types/clubManager-types";
import { useEffect, useState } from "react";
import {
  useAdminRemoveTeamPlayerMutation,
  useAdminTeamPlaersQuery,
} from "~/app/store/clubManager/clubManagerApi";

type Props = {
  teamId: string;
};

const TeamPlayersComponent = ({ teamId }: Props) => {
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

  useEffect(() => {
    if (superPlayers) setPlayers(superPlayers);
    if (adminPlayers) setPlayers(adminPlayers);
  }, [superPlayers, adminPlayers]);

  return (
    <div>
      <h2>Payers</h2>
      <div className="flex gap-4 flex-wrap mt-6">
        {players &&
          players.results.map((player) => {
            return (
              <SinglePlayer
                key={player.id}
                teamId={teamId}
                id={player.id}
                name={player.name}
                image={player.icon}
              />
            );
          })}
        <AddPlayer teamPlayers={players} />
      </div>
    </div>
  );
};

export const SinglePlayer = ({ id, image, name, teamId }: any) => {
  const navigate = useNavigate();
  const { data: user } = useUserQuery(null);

  const [superRemovePlayer] = useSuperRemoveTeamPlayerMutation();
  const [adminRemovePlayer] = useAdminRemoveTeamPlayerMutation();

  const removeTeamPlayer = (teamId: number, playerId: number) => {
    if (user?.user_type === "Supervisor") {
      superRemovePlayer({ team_id: teamId, player_id: playerId })
        .then((res) => {
          showNotification({
            message: "Deleted Succefly",
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
    } else if (user?.user_type === "Admin") {
      adminRemovePlayer({ team_id: teamId, player_id: playerId })
        .then((res) => {
          showNotification({
            message: "Deleted Succefly",
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
    }
  };

  return (
    <div
      key={id}
      className="shadow-lg relative items-stretch rounded-lg w-36 text-center bg-white h-full flex flex-col justify-center"
    >
      <div className="overlay flex justify-center items-stretch flex-col gap-2 rounded-lg w-full h-full absolute left-0 top-0 bg-transparent group hover:bg-black/60">
        <div
          onClick={() =>
            navigate(`/players/${id}`, {
              state: {
                teamId,
              },
            })
          }
          className="hidden group-hover:flex text-white gap-2 cursor-pointer justify-center items-center bg-perfBlue p-2 w-full"
        >
          <AppIcons className="w-5 h-5 text-white" icon="UserIcon:outline" />
          <span className="text-white">View profile</span>
        </div>
        {user?.user_type === "Supervisor" ||
          (user?.user_type === "Admin" && (
            <DeletePlayerFromTeam
              deleteFun={() => removeTeamPlayer(teamId, id)}
              id={id}
              name={name}
              type="player"
            />
          ))}
      </div>
      <img
        className="rounded-lg w-full h-32 object-cover"
        src={image}
        alt="player Image"
      />
      <div>
        <h2 className="text-sm my-2 mx-2">{name}</h2>
      </div>
    </div>
  );
};

export default TeamPlayersComponent;
