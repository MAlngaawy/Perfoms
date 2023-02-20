import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditTeamButton";
import { Avatar } from "@mantine/core";
import { useSuperDeleteTeamMutation } from "~/app/store/supervisor/supervisorMainApi";
import { showNotification } from "@mantine/notifications";
import { useAdminDeleteTeamMutation } from "~/app/store/clubManager/clubManagerApi";
import { useUserQuery } from "~/app/store/user/userApi";
import AppUtils from "~/@main/utils/AppUtils";
import { Team } from "~/app/store/types/supervisor-types";

type TeamPropsType = {
  team: any;
  withoutEditsOptions?: boolean;
};

const TeamCard = ({ team }: TeamPropsType) => {
  const [superDeleteTeam] = useSuperDeleteTeamMutation();
  const [adminDeleteTeam] = useAdminDeleteTeamMutation();
  const { data: user } = useUserQuery({});

  return (
    <div className="team-card relative w-full xs:w-72 bg-white p-8 rounded-xl flex flex-col justify-center items-center gap-4">
      <div className="bg-pagesBg rounded-full w-32 h-32 flex justify-center items-center">
        <Avatar size={"xl"} src={team.icon_url} alt="icon" />
      </div>

      <h2 className="text-xl font-semibold text-perfGray1">{team.name}</h2>
      <h3 className="text-xl text-perfBlue">{team?.sport.name}</h3>

      <div className="flex justify-around items-center w-full">
        <div className="age flex flex-col items-center">
          <span className=" text-sm text-perfGray3">Age</span>
          <span className="text-xl text-perfGray1">
            {team.from_age} - {team.to_age}
          </span>
        </div>
        <div className="players flex flex-col items-center">
          <span className=" text-sm text-perfGray3">Players</span>
          <span className="text-xl text-perfGray1">{team.players_count}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
