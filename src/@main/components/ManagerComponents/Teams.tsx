import TeamCard from "./SubComponents/TeamCard";
import AddTeamCardForm from "./SubComponents/AddTeamCardForm";
import {
  useSuperkpisQuery,
  useSuperTeamsQuery,
} from "~/app/store/Supervisor/supervisorApi";

type Props = {};

const Teams = (props: Props) => {
  const { data: teams } = useSuperTeamsQuery({});
  console.log(teams);

  return (
    <div className="admin-teams flex flex-col xs:flex-row flex-wrap items-stretch gap-6 p-2 sm:p-6">
      {teams?.results.map((team) => {
        return <TeamCard key={team.id} team={team} />;
      })}
      <AddTeamCardForm />
    </div>
  );
};

export default Teams;
