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
import { TeamPlayer, TeamPlayers } from "~/app/store/types/clubManager-types";
import { useEffect, useState } from "react";
import {
  useAdminRemoveTeamPlayerMutation,
  useAdminTeamPlaersQuery,
} from "~/app/store/clubManager/clubManagerApi";
import AppUtils from "~/@main/utils/AppUtils";
import { useRemoveTeamPlayerMutation } from "~/app/store/coach/coachApi";
import { Avatar, Loader } from "@mantine/core";
import { Team } from "~/app/store/types/supervisor-types";
import { useInView } from "react-intersection-observer";

type Props = {
  teamId: string;
  teamInfo?: Team;
};

const TeamPlayersComponent = ({ teamInfo, teamId }: Props) => {
  const { ref, inView } = useInView();
  const [nextPage, setNextPage] = useState<number>(2);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [stillHavePages, setStillHavePages] = useState<boolean>(false);

  const [players, setPlayers] = useState<TeamPlayer[]>([]);
  const { data: user } = useUserQuery({});

  const { data: superPlayers } = useSuperTeamPlaersQuery(
    { team_id: teamId, page: currentPage },
    { skip: !teamId || user?.user_type !== "Supervisor" }
  );
  const { data: adminPlayers } = useAdminTeamPlaersQuery(
    { team_id: teamId, page: currentPage },
    { skip: !teamId || user?.user_type !== "Admin" }
  );

  const { data: filteredPlayers, refetch: refetchFilteredPlayers } =
    useGetFilteredPlayersQuery({
      team_id: teamId,
      sport_id: teamInfo?.sport?.id,
    });

  useEffect(() => {
    if (superPlayers) {
      if (currentPage === 1) {
        setPlayers(superPlayers?.results);
      } else {
        setPlayers([...players, ...superPlayers?.results]);
      }
      if (superPlayers?.pages_count && superPlayers?.pages_count >= nextPage) {
        setStillHavePages(true);
      } else {
        setStillHavePages(false);
      }
    }
    if (adminPlayers) {
      if (currentPage === 1) {
        setPlayers(adminPlayers?.results);
      } else {
        setPlayers([...players, ...adminPlayers?.results]);
      }
      if (adminPlayers?.pages_count && adminPlayers?.pages_count >= nextPage) {
        setStillHavePages(true);
      } else {
        setStillHavePages(false);
      }
    }
  }, [superPlayers, adminPlayers]);

  const resetAllData = () => {
    // setPlayers([]);
    setCurrentPage(1);
    setNextPage(2);
  };

  useEffect(() => {
    if (inView) {
      if (superPlayers) {
        if (
          superPlayers?.pages_count &&
          superPlayers?.pages_count >= nextPage
        ) {
          setCurrentPage(nextPage);
          setNextPage(nextPage + 1);
        } else {
          return;
        }
      }
      if (adminPlayers) {
        if (
          adminPlayers?.pages_count &&
          adminPlayers?.pages_count >= nextPage
        ) {
          setCurrentPage(nextPage);
          setNextPage(nextPage + 1);
        } else {
          return;
        }
      }
    }
  }, [inView]);

  return (
    <div>
      <h2 className="p-2 text-center text-lg">Team Players</h2>
      <div className="flex flex-wrap justify-center gap-2 xs:gap-4  mt-4">
        {players.map((player) => {
          return (
            <SinglePlayer
              resetAllData={resetAllData}
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
          resetAllData={resetAllData}
          filteredPlayers={filteredPlayers}
          refetchFilteredPlayers={refetchFilteredPlayers}
          teamInfo={teamInfo}
        />
      </div>

      {stillHavePages && (
        <div
          className="bg-perfBlue mx-auto my-4 rounded-2xl flex gap-2 w-fit py-2 items-center justify-center px-6 text-white text-sm"
          ref={ref}
        >
          <span>Loading Players</span>{" "}
          <Loader color="white" size="md" variant="dots" />
        </div>
      )}
    </div>
  );
};

export const SinglePlayer = ({
  id,
  image,
  name,
  teamId,
  refetchFilteredPlayers,
  resetAllData,
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

    AppUtils.scrollToTop();
    setTimeout(() => {
      resetAllData();
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
