import { Avatar } from "@mantine/core";
import {
  useSuperRemoveTeamCoachMutation,
  useSuperTeamCoachesQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import DeleteButton from "../../../../../@main/components/ManagerComponents/SubComponents/DeleteButton";
import AddCoachForm from "./AddCoachForm";
import { useParams } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import {
  useAdminRemoveTeamCoachMutation,
  useAdminTeamCoachesQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { TeamCoaches } from "~/app/store/types/parent-types";
import { useEffect } from "react";
import { useState } from "react";
import {
  useGetFilteredCoachesQuery,
  useGetTeamInfoQuery,
  useUserQuery,
} from "~/app/store/user/userApi";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {
  teamId: string;
};

const TeamCoachesComp = ({ teamId }: Props) => {
  const { id: teamIdFromParams } = useParams();
  const [coaches, setCoaches] = useState<TeamCoaches>();
  const { data: user } = useUserQuery({});

  const { data: superCoaches } = useSuperTeamCoachesQuery(
    { team_id: teamIdFromParams ? teamIdFromParams : teamId },
    { skip: !teamId || user?.user_type !== "Supervisor" }
  );

  const { data: adminCoaches } = useAdminTeamCoachesQuery(
    { team_id: teamIdFromParams ? teamIdFromParams : teamId },
    { skip: !teamId || user?.user_type !== "Admin" }
  );

  const { data: teamInfo } = useGetTeamInfoQuery(
    { team_id: teamId },
    { skip: !teamId }
  );

  const { refetch: refetchFilteredCoaches } = useGetFilteredCoachesQuery(
    {
      team_id: teamId,
      sport_id: teamInfo?.sport?.id,
    },
    {
      skip: !teamInfo || !teamId,
    }
  );

  const [superRemoveCoach] = useSuperRemoveTeamCoachMutation();
  const [adminRemoveCoach] = useAdminRemoveTeamCoachMutation();

  useEffect(() => {
    if (superCoaches) setCoaches(superCoaches);
    if (adminCoaches) setCoaches(adminCoaches);
  }, [superCoaches, adminCoaches]);

  return (
    <div>
      <h2>Team Coaches</h2>
      <div className="flex flex-col gap-2 max-h-72 mt-6 overflow-scroll">
        {coaches?.results.map((coach) => (
          <div
            key={coach.id}
            className="flex justify-between rounded-3xl items-center p-1 hover:bg-pagesBg transition-all"
          >
            <div className="coach-data flex gap-2 cursor-pointer">
              <Avatar src={coach.avatar} size="sm" radius={"xl"} />
              <h3 className="text-base text-perfGray2">
                {coach.first_name + " " + coach.last_name}
              </h3>
            </div>
            <DeleteButton
              deleteFun={async () => {
                const deleteCoachFun =
                  user?.user_type === "Supervisor"
                    ? superRemoveCoach
                    : adminRemoveCoach;

                try {
                  await deleteCoachFun({
                    coach_id: coach.id,
                    team_id: teamId,
                  });
                  refetchFilteredCoaches();
                  AppUtils.showNotificationFun(
                    "Success",
                    "Done",
                    "Successfully Deleted Coaches"
                  );
                } catch {
                  AppUtils.showNotificationFun(
                    "Error",
                    "Sorry",
                    "Something went wrong while deleteing coach, please try again later"
                  );
                }
              }}
              type="Coach"
              name={coach.first_name + " " + coach.last_name}
            />
          </div>
        ))}
      </div>
      <AddCoachForm
        teamCoaches={coaches?.results}
        teamId={teamIdFromParams ? teamIdFromParams : teamId}
      />
    </div>
  );
};

export default TeamCoachesComp;
