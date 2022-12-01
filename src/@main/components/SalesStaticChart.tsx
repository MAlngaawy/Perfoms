import { Image } from "@mantine/core";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
} from "recharts";
import { usePlayerKpisMetricsQuery } from "~/app/store/parent/parentApi";
import {
  selectedPlayerFn,
  selectedPlayerTeamFn,
  timeFilterFn,
} from "~/app/store/parent/parentSlice";
import { Player } from "~/app/store/types/parent-types";
import { PerformanceCard } from "./PerformanceCard";

const SaleStaticChart = () => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const timeFilter = useSelector(timeFilterFn);

  const { data: playerKpis } = usePlayerKpisMetricsQuery(
    {
      team_id: selectedPlayerTeam?.id,
      player_id: selectedPlayer?.id,
      from_date: timeFilter?.from_date,
      to_date: timeFilter?.to_date,
    },

    {
      skip: !selectedPlayerTeam?.id || !selectedPlayer?.id,
      // !timeFilter?.from_date
      // !timeFilter?.to_date,
    }
  );
  console.log("playerKpis", playerKpis);

  return (
    <div>
      <div className="xs:mx-4 py-4 flex justify-between gap-4 overflow-scroll performancesCards">
        <PerformanceCard
          name="Strengths"
          number={playerKpis ? playerKpis.strength_count : 0}
          bgColor="rgba(0, 224, 150, 0.1)"
          textColor="#27AE60"
        >
          <Image
            width={30}
            height={30}
            src="assets/images/gym.png"
            alt="icon"
          />
        </PerformanceCard>

        <PerformanceCard
          name="Weaknesses"
          number={playerKpis ? playerKpis.weakness_count : 0}
          bgColor="rgba(235, 87, 87, 0.1)"
          textColor="#EB5757"
        >
          <Image
            width={30}
            height={30}
            src="assets/images/weakness.png"
            alt="icon"
          />
        </PerformanceCard>

        <PerformanceCard
          name="Actions"
          number={playerKpis ? playerKpis.action_count : 0}
          bgColor="rgba(47, 128, 237, 0.1)"
          textColor="#2F80ED"
        >
          <Image
            width={30}
            height={30}
            src="assets/images/tasks.png"
            alt="icon"
          />
        </PerformanceCard>

        <PerformanceCard
          name="Recommendations"
          number={playerKpis ? playerKpis.recommendation_count : 0}
          bgColor="rgba(0, 161, 255, 0.1)"
          textColor="#00A1FF"
        >
          <Image
            width={30}
            height={30}
            src="assets/images/discussion.png"
            alt="icon"
          />
        </PerformanceCard>
      </div>

      <div className="py-5 h-80 overflow-scroll performancesCards">
        <ResponsiveContainer width={"100%"} height="100%" className="min-w-700">
          <BarChart
            data={playerKpis?.player_kpi.map((i) => ({
              name: i.kpi,
              id: i.id,
              progress: i.score_avg,
              attend: 4,
            }))}
          >
            <CartesianGrid
              strokeDasharray="0"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              style={{
                fontSize: 12,
              }}
            />
            <YAxis dataKey="progress" />
            <Tooltip labelStyle={{ color: "black" }} />
            {/* <Legend /> */}
            <Bar dataKey="progress" fill="#333" barSize={10} radius={2}>
              {playerKpis?.player_kpi.map((metric, index) => (
                <Cell
                  key={index}
                  fill={
                    metric.score_avg >= 60
                      ? "#00E096" // green more than 60
                      : metric.score_avg <= 40
                      ? "#EB5757" // red less than 40
                      : "#F2C94C" // yallow
                  }
                />
              ))}
            </Bar>
            {/* <Bar
            dataKey="attend"
            fill="#BDBDBD"
            barSize={12}
            radius={3}
            style={{
              cursor: "pointer",
            }}
          >
            {formattedKpis.map((metric) => {
              return <Cell key={metric.id} fill="#BDBDBD" />;
            })}
          </Bar> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SaleStaticChart;
