import { Avatar } from "@mantine/core";
import {
  useSuperAddTeamCoachesMutation,
  useSuperRemoveTeamCoachMutation,
  useSuperTeamCoachesQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import DeleteButton from "../../../../../@main/components/ManagerComponents/SubComponents/DeleteButton";
import AddCoachForm from "./AddCoachForm";
import { useParams } from "react-router-dom";
import { showNotification } from "@mantine/notifications";

type Props = {
  teamId: string;
};

const TeamCoaches = ({ teamId }: Props) => {
  const { id: teamIdFromParams } = useParams();

  const { data: coaches } = useSuperTeamCoachesQuery(
    { team_id: teamIdFromParams ? teamIdFromParams : teamId },
    { skip: !teamId }
  );

  const [removeCoach, { isLoading, isSuccess, isError }] =
    useSuperRemoveTeamCoachMutation();

  return (
    <div>
      <h2>Team Coaches</h2>
      <div className="flex flex-col gap-2 max-h-72 mt-6">
        {coaches?.results.map((coach) => (
          <div className="flex justify-between rounded-3xl items-center p-1 hover:bg-pagesBg transition-all">
            <div className="coach-data flex gap-2 cursor-pointer">
              <Avatar src={coach.avatar} size="sm" radius={"xl"} />
              <h3 className="text-base text-perfGray2">
                {coach.first_name + " " + coach.last_name}
              </h3>
            </div>
            <DeleteButton
              deleteFun={() =>
                removeCoach({
                  coach_id: coach.id,
                  team_id: teamId,
                }).then(() => {
                  showNotification({
                    message: "Successfly Deleted",
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
              }
              type="Coach"
              name={coach.first_name + " " + coach.last_name}
            />
          </div>
        ))}
      </div>
      <AddCoachForm teamId={teamIdFromParams ? teamIdFromParams : teamId} />
    </div>
  );
};

export default TeamCoaches;
