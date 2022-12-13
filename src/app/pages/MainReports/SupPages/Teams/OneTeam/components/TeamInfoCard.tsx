import { Avatar, Skeleton } from "@mantine/core";
import Info from "~/@main/components/Info";
import { useCoachTeamInfoQuery } from "~/app/store/coach/coachApi";
import { useParams } from "react-router-dom";

type Props = {};

const TeamInfoCard = (props: Props) => {
  const { id } = useParams();

  const { data: teamInfo, isLoading } = useCoachTeamInfoQuery(
    { team_id: id },
    { skip: !id }
  );

  if (isLoading) return <Skeleton height={360} width={300} radius="lg" />;

  return (
    <div className="teamInfoCard bg-white h-full flex-col gap-4 rounded-xl p-4 flex w-64">
      <h2>Team Info</h2>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between gap-6">
          <Avatar
            src={
              teamInfo?.icon_url ||
              "https://cdn-icons-png.flaticon.com/512/3903/3903982.png"
            }
            size="xl"
          />
          <div className="flex flex-col ">
            <Info label="name" value={"Team " + teamInfo?.name} />
            <Info
              label="Age"
              value={` ${teamInfo?.from_age} - ${teamInfo?.to_age}  Years `}
            />
          </div>
        </div>
        <div className="flex  gap-6 justify-between">
          <Info label="Sport" value={teamInfo?.sport} />
          {/* teamInfo?.gender */}
          <Info label="Gender" value={"Male"} />
        </div>
        <div className="flex  gap-6 justify-between">
          <Info
            label="Rating schedule"
            value={` Every ${teamInfo?.rate_per}`}
          />
          <Info label="Players" value={`${teamInfo?.players_count} Player`} />
        </div>
      </div>
    </div>
  );
};

export default TeamInfoCard;
