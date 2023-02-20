import React from "react";
import { Link } from "react-router-dom";
import TeamCard from "~/@main/components/ManagerComponents/SubComponents/TeamCard";
import { useSuperTeamsQuery } from "~/app/store/supervisor/supervisorMainApi";

type Props = {};

const ScoringPage = (props: Props) => {
  const { data: teams } = useSuperTeamsQuery({});
  console.log(teams);

  return (
    <div className="flex gap-4 m-4">
      {teams?.results.map((team) => {
        return (
          <Link to={`${team.id}/scoring-tables`} key={team.id}>
            <TeamCard team={team} withoutEditsOptions={true} />
          </Link>
        );
      })}
    </div>
  );
};

export default ScoringPage;
