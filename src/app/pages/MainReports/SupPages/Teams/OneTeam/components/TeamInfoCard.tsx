import { Avatar, Skeleton } from "@mantine/core";
import Info from "~/@main/components/Info";
import { useCoachTeamInfoQuery } from "~/app/store/coach/coachApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CoachTeamInfo } from "~/app/store/types/coach-types";
import { useSuperTeamInfoQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useUserQuery } from "~/app/store/user/userApi";
import {
  SuperVisorTeam,
  SuperVisorTeamInfo,
} from "~/app/store/types/supervisor-types";

type Props = {};

const TeamInfoCard = (props: Props) => {
  const { id } = useParams();
  const { data: user } = useUserQuery(null);
  const [data, setData] = useState<CoachTeamInfo | SuperVisorTeamInfo>();

  const { data: coachTeamInfo, isLoading } = useCoachTeamInfoQuery(
    { team_id: id },
    { skip: !id }
  );

  const { data: superTeamInfo, isLoading: superLoading } =
    useSuperTeamInfoQuery({ team_id: id }, { skip: !id });

  useEffect(() => {
    if (coachTeamInfo) setData(coachTeamInfo);
    if (superTeamInfo) setData(superTeamInfo);
  }, [coachTeamInfo, superTeamInfo]);

  if (isLoading || superLoading)
    return <Skeleton height={360} width={300} radius="lg" />;

  return (
    <div className="teamInfoCard bg-white h-full flex-col gap-4 rounded-xl p-4 flex w-64">
      <h2>Team Info</h2>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between gap-6">
          <Avatar
            src={
              data?.icon_url ||
              "https://cdn-icons-png.flaticon.com/512/3903/3903982.png"
            }
            size="xl"
          />
          <div className="flex flex-col ">
            <Info label="name" value={"Team " + data?.name} />
            <Info
              label="Age"
              value={` ${data?.from_age} - ${data?.to_age}  Years `}
            />
          </div>
        </div>
        <div className="flex  gap-6 justify-between">
          <Info label="Sport" value={data?.sport} />
          {/* teamInfo?.gender */}
          <Info label="Gender" value={"Male"} />
        </div>
        <div className="flex  gap-6 justify-between">
          <Info label="Rating schedule" value={` Every ${data?.rate_per}`} />
          <Info label="Players" value={`${data?.players_count} Player`} />
        </div>
      </div>
    </div>
  );
};

export default TeamInfoCard;
