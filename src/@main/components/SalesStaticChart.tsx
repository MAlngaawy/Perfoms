import { Image, Skeleton } from "@mantine/core";
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
import { Player, PlayerKpis } from "~/app/store/types/parent-types";
import { PerformanceCard } from "./PerformanceCard";
import { useEffect, useState } from "react";
import NoData from "./NoData";
import { useParams } from "react-router-dom";
import { useCoachPlayerKpisMetricsStatisticsQuery } from "~/app/store/coach/coachApi";
import { useSuperPlayerKpisMetricsStatisticsQuery } from "~/app/store/supervisor/supervisorMainApi";

const SaleStaticChart = () => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const timeFilter = useSelector(timeFilterFn);
  const [playerKpis, setPlayerKpis] = useState<PlayerKpis>();
  const { id } = useParams();

  const { data: coachPlayerKpis } = useCoachPlayerKpisMetricsStatisticsQuery(
    {
      player_id: id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
    },
    { skip: !id || !timeFilter?.from_date || !timeFilter?.to_date }
  );

  const { data: superPlayerKpis } = useSuperPlayerKpisMetricsStatisticsQuery(
    {
      player_id: id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
    },
    { skip: !id || !timeFilter?.from_date || !timeFilter?.to_date }
  );

  const { data: parentPlayerKpis } = usePlayerKpisMetricsQuery(
    {
      team_id: selectedPlayerTeam?.id,
      player_id: selectedPlayer?.id,
      date_from: timeFilter?.from_date,
      date_to: timeFilter?.to_date,
    },

    {
      skip:
        !selectedPlayerTeam?.id ||
        !selectedPlayer?.id ||
        !timeFilter?.from_date ||
        !timeFilter?.to_date,
    }
  );

  useEffect(() => {
    if (parentPlayerKpis) setPlayerKpis(parentPlayerKpis);
    if (coachPlayerKpis) setPlayerKpis(coachPlayerKpis);
    if (superPlayerKpis) setPlayerKpis(superPlayerKpis);
  }, [parentPlayerKpis, coachPlayerKpis, superPlayerKpis]);

  if (!playerKpis) {
    return (
      <div className="h-96 p-2">
        <Skeleton width={"100%"} height={"100%"} radius={"lg"} />
      </div>
    );
  }

  if (playerKpis && playerKpis?.player_kpi?.length < 1) {
    return (
      <div className="flex flex-col md:flex-row items-center justify-evenly">
        <img
          className="md:w-96"
          src="/assets/images/nodata.png"
          alt="no data"
        />
        <NoData className="flex-row gap-1" />
      </div>
    );
  }

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
            src="/assets/images/gym.png"
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
            src="/assets/images/weakness.png"
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
            src="/assets/images/tasks.png"
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
            src="/assets/images/discussion.png"
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
              new: i.score_avg,
              old: i.old_score_avg,
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
                maxWidth: 30,
              }}
            />
            <YAxis dataKey="new" />
            <Tooltip labelStyle={{ color: "black" }} />
            {/* <Legend /> */}
            <Bar dataKey="old" fill="#BDBDBD" barSize={10} radius={2}>
              {playerKpis?.player_kpi?.map((kpi) => {
                return <Cell key={kpi.id} fill="#BDBDBD" />;
              })}
            </Bar>
            <Bar dataKey="new" fill="#333" barSize={10} radius={2}>
              {playerKpis?.player_kpi.map((metric, index) => (
                <Cell
                  key={index}
                  fill={
                    metric.score_avg > 60
                      ? "#00E096" // green more than 60
                      : metric.score_avg <= 40
                      ? "#EB5757" // red less than 40
                      : "#F2C94C" // yallow
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SaleStaticChart;
