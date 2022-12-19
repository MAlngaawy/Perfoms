import { useEffect, useState } from "react";
import TeamCard from "./SubComponents/TeamCard";
import AddTeamCardForm from "./SubComponents/AddTeamCardForm";
import { useSuperTeamsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminTeamsQuery } from "~/app/store/clubManager/clubManagerApi";
import { Teams } from "~/app/store/types/clubManager-types";

type Props = {};

const TeamsComponent = (props: Props) => {
  const [teams, setTeams] = useState<Teams>();
  const [refetch, setRefetch] = useState<any>();
  const { data: superTeams, refetch: superRefetch } = useSuperTeamsQuery({});
  const { data: adminTeams, refetch: adminRefetch } = useAdminTeamsQuery({});

  useEffect(() => {
    if (superTeams) {
      setTeams(superTeams), setRefetch(superRefetch);
    }
    if (adminTeams) {
      setTeams(adminTeams), setRefetch(adminRefetch);
    }
  }, [superTeams, adminTeams, superRefetch, adminRefetch]);

  return (
    <div className="admin-teams flex flex-col xs:flex-row flex-wrap items-stretch gap-6 p-2 sm:p-6">
      {teams?.results.map((team) => {
        return <TeamCard refetch={refetch} key={team.id} team={team} />;
      })}
      <AddTeamCardForm refetch={refetch} />
    </div>
  );
};

export default TeamsComponent;
