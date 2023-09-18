import { Avatar, Skeleton } from "@mantine/core";
import Info from "~/@main/components/Info";
import { useCoachTeamInfoQuery } from "~/app/store/coach/coachApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CoachTeamInfo } from "~/app/store/types/coach-types";
import { useSuperTeamInfoQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { useAdminTeamInfoQuery } from "~/app/store/clubManager/clubManagerApi";
import {
  SuperVisorTeam,
  SuperVisorTeamInfo,
} from "~/app/store/types/supervisor-types";

type Props = {
  TeamInfoData: CoachTeamInfo | SuperVisorTeamInfo | undefined;
};

const TeamInfoCard = ({ TeamInfoData: data }: Props) => {
  const gender = () => {
    switch (data?.gender) {
      case "M":
        return "Male";
      case "F":
        return "Female";
      case "B":
        return "Mixed";
      default:
        return "Gender";
    }
  };

  return (
    <div className="teamInfoCard bg-white h-full flex-col gap-4 rounded-xl p-4 flex w-full">
      <h2>Team Info</h2>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-6">
          <Avatar src={data?.icon_url} size={100} />
          <div className="flex flex-col ">
            <Info label="name" value={"Team " + data?.name} />
            <Info
              label="Age"
              value={` ${data?.from_age} - ${data?.to_age}  Years `}
            />
          </div>
        </div>
        <div className="flex  gap-6 justify-between">
          <Info label="Sport" value={data?.sport?.name} />
          {/* teamInfo?.gender */}
          <Info label="Gender" value={gender()} />
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
