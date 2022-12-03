import { Avatar } from "@mantine/core";
import { useSuperTeamCoachesQuery } from "~/app/store/supervisor/supervisorMainApi";
import DeleteButton from "../../../../../@main/components/ManagerComponents/SubComponents/DeleteButton";
import AddCoachForm from "./AddCoachForm";

type Props = {
  teamId: string;
};

const TeamCoaches = ({ teamId }: Props) => {
  const { data: coaches } = useSuperTeamCoachesQuery(
    { team_id: teamId },
    { skip: !teamId }
  );

  return (
    <div>
      <h2>Team Coaches</h2>
      <div className="flex flex-col gap-2 mt-6">
        {coaches?.results.map((coach) => (
          <div className="flex justify-between rounded-3xl items-center p-1 hover:bg-pagesBg transition-all">
            <div className="coach-data flex gap-2 cursor-pointer">
              <Avatar src={coach.avatar} size="sm" radius={"xl"} />
              <h3 className="text-base text-perfGray2">
                {coach.first_name + " " + coach.last_name}
              </h3>
            </div>
            <DeleteButton
              type="Coach"
              name={coach.first_name + " " + coach.last_name}
              id={coach.id !== undefined ? coach.id : 1}
            />
          </div>
        ))}
      </div>
      {/* <AddCoachForm /> */}
    </div>
  );
};

export default TeamCoaches;
