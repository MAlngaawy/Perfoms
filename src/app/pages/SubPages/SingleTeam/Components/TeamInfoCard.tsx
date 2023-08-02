import React, { useEffect, useState } from "react";
import { useAdminTeamInfoQuery } from "~/app/store/clubManager/clubManagerApi";
import { useSuperTeamInfoQuery } from "~/app/store/supervisor/supervisorMainApi";
import { SuperVisorTeamInfo } from "~/app/store/types/supervisor-types";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {
  teamId: string;
};

const TeamInfoCard = ({ teamId }: Props) => {
  const [info, setInfo] = useState<SuperVisorTeamInfo>();
  const { data: user } = useUserQuery({});

  const { data: superInfo } = useSuperTeamInfoQuery(
    { team_id: teamId },
    { skip: !teamId || user?.user_type !== "Supervisor" }
  );

  const { data: adminInfo } = useAdminTeamInfoQuery(
    { team_id: teamId },
    { skip: !teamId || user?.user_type !== "Admin" }
  );

  useEffect(() => {
    if (superInfo) setInfo(superInfo);
    if (adminInfo) setInfo(adminInfo);
  }, [superInfo, adminInfo]);

  console.log("infoinfoinfoinfo", info);

  return (
    <div>
      <h2>Team Info</h2>
      {info && (
        <div className="flex flex-wrap gap-6 mt-4">
          <Schema label="Name" value={info?.name} />
          <Schema label="Sport" value={info?.sport ? info?.sport.name : "NA"} />
          <Schema label="Age" value={info?.from_age + " - " + info?.to_age} />
          {/* <Schema label="Gender" value={info?.gender ? info?.gender : "NA"} /> */}
          <Schema label="Players" value={JSON.stringify(info.players_count)} />
          <Schema label="Rating schedule" value={"Every" + info.rate_per} />
        </div>
      )}
    </div>
  );
};

export default TeamInfoCard;

const Schema = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-sm text-perfGray3">{label}</h3>
      <h2 className="text-base text-perfGray1">{value}</h2>
    </div>
  );
};
