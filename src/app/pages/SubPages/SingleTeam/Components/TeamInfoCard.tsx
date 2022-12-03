import React from "react";
import { useSuperTeamInfoQuery } from "~/app/store/supervisor/supervisorMainApi";

type Props = {
  teamId: string;
};

const TeamInfoCard = ({ teamId }: Props) => {
  const { data: info } = useSuperTeamInfoQuery(
    { team_id: teamId },
    { skip: !teamId }
  );

  return (
    <div>
      <h2>Team Info</h2>
      {info && (
        <div className="flex flex-wrap gap-6 mt-4">
          <Schema label="Name" value={info?.name} />
          <Schema label="Sport" value={info?.sport ? info?.sport : "NA"} />
          <Schema label="Age" value={info?.from_age + " - " + info?.to_age} />
          <Schema label="Gender" value={info?.gender ? info?.gender : "NA"} />
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
