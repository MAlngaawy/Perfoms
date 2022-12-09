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

type Props = {
  teamId: string;
};

const TeamPlayers = ({ teamId }: Props) => {
  const { data: players } = useSuperTeamPlaersQuery(
    { team_id: teamId },
    { skip: !teamId }
  );

  return (
    <div>
      <h2>Payers</h2>
      <div className="flex gap-4 flex-wrap mt-6">
        {players &&
          players.results.map((player) => {
            return (
              <SinglePlayer
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

  const [removePlayer] = useSuperRemoveTeamPlayerMutation();

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
        {user?.user_type === "Supervisor" && (
          <DeletePlayerFromTeam
            deleteFun={() =>
              removePlayer({ team_id: teamId, player_id: id })
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
                })
            }
            id={id}
            name={name}
            type="player"
          />
        )}

        {/* <div className="hidden group-hover:flex justify-center items-center text-white gap-2 cursor-pointer hover:bg-perfGray1/90 p-2 w-full">
          <AppIcons className="w-5 h-5 text-white" icon="TrashIcon:outline" />
          <span className="text-white">Delete </span>
        </div> */}
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

export default TeamPlayers;
