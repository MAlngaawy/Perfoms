import { PerformanceCard } from "./PerformanceCard";
import SaleStaticChart from "./SalesStaticChart";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { useSelector } from "react-redux";
import { selectedPlayerTeamFn } from "../../app/store/parent/parentSlice";
import { Player } from "~/app/store/types/parent-types";
import { usePlayerKpisMetricsQuery } from "~/app/store/parent/parentApi";

type Props = {};

const PerformanceSummaryCard = (props: Props) => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  const { data: playerKpisMetrics } = usePlayerKpisMetricsQuery(
    {
      team_id: selectedPlayerTeam.id,
      player_id: selectedPlayer.id,
      from_date: "2010-10-15",
      to_date: "2010-12-15",
    },

    {
      skip: !selectedPlayerTeam.id || !selectedPlayer.id,
    }
  );

  console.log(
    "playerKpisMetricsssssssssssssssssssssssssssssssssssssssssss",
    playerKpisMetrics
  );

  return (
    <div className="bg-white rounded-3xl px-6 py-2 h-full cursor-pointer">
      <div className="title">
        <h1 className="text-lg font-normal">Performance Report summary</h1>
      </div>
      <SaleStaticChart />
    </div>
  );
};
export default PerformanceSummaryCard;

{
  /**

<div className="mt-2 flex flex-col sm:flex-row justify-between gap-4">
        {playerSummary?.map((item, idx: number) => {
          return (
            <div key={idx} className="w-full sm:w-1/2">
              <PerformanceCard
                name={item.name}
                number={item.number}
                bgColor={item.bgColor}
                textColor={item.textColor}
              >
                <img className=" w-6 max-w-full" src={item.icon} alt="icon" />
              </PerformanceCard>
              </div>
              );
            })}
          </div>


*/
}
