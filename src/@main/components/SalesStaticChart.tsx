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
import {
  usePlayerWeaknessQuery,
  usePlayerKpisMetricsQuery,
  usePlayerStrengthQuery,
  usePlayerActionsQuery,
  usePlayerRecommendationsQuery,
} from "~/app/store/parent/parentApi";
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
import { useAdminPlayerKpisMetricsStatisticsQuery } from "~/app/store/clubManager/clubManagerApi";
import { useUserQuery } from "~/app/store/user/userApi";

const SaleStaticChart = () => {
  const [newActions, setNewActions] = useState<{}[]>();
  const [newRecommendations, setNewRecommendations] = useState<{}[]>();
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const timeFilter = useSelector(timeFilterFn);
  const [playerKpis, setPlayerKpis] = useState<PlayerKpis>();
  const { data: user } = useUserQuery({});
  const { id } = useParams();

  const { data: parentPlayerKpis } = usePlayerKpisMetricsQuery(
    {
      team_id: selectedPlayerTeam?.id,
      player_id: selectedPlayer?.id,
      month: timeFilter?.month,
      year: timeFilter?.year,
    },

    {
      skip:
        !selectedPlayerTeam?.id ||
        !selectedPlayer?.id ||
        !timeFilter?.month ||
        !timeFilter?.year ||
        (user && !["Parent", "Player"].includes(user?.user_type)),
    }
  );

  const { data: coachPlayerKpis } = useCoachPlayerKpisMetricsStatisticsQuery(
    {
      player_id: id,
      month: timeFilter?.month,
      year: timeFilter?.year,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !id ||
        !timeFilter?.month ||
        !timeFilter?.year ||
        !selectedPlayerTeam?.id ||
        user?.user_type !== "Coach",
    }
  );

  const { data: superPlayerKpis } = useSuperPlayerKpisMetricsStatisticsQuery(
    {
      player_id: id,
      month: timeFilter?.month,
      year: timeFilter?.year,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !id ||
        !timeFilter?.month ||
        !timeFilter?.year ||
        !selectedPlayerTeam?.id ||
        user?.user_type !== "Supervisor",
    }
  );

  const { data: adminPlayerKpis } = useAdminPlayerKpisMetricsStatisticsQuery(
    {
      player_id: id,
      month: timeFilter?.month,
      year: timeFilter?.year,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !id ||
        !timeFilter?.month ||
        !timeFilter?.year ||
        !selectedPlayerTeam?.id ||
        user?.user_type !== "Admin",
    }
  );

  // Fetch data for Parent
  const { data: strength } = usePlayerStrengthQuery(
    {
      player_id: selectedPlayer?.id,
      month: timeFilter?.month,
      year: timeFilter?.year,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !selectedPlayer?.id ||
        !timeFilter?.month ||
        !timeFilter?.year ||
        !selectedPlayerTeam?.id ||
        (user && !["Parent", "Player"].includes(user?.user_type)),
    }
  );
  const { data: weakness } = usePlayerWeaknessQuery(
    {
      player_id: selectedPlayer?.id,
      month: timeFilter?.month,
      year: timeFilter?.year,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !selectedPlayer?.id ||
        !timeFilter?.month ||
        !timeFilter?.year ||
        !selectedPlayerTeam?.id ||
        (user && !["Parent", "Player"].includes(user?.user_type)),
    }
  );
  const { data: parentPlayerActions } = usePlayerActionsQuery(
    {
      id: selectedPlayer?.id,
      month: timeFilter?.month,
      year: timeFilter?.year,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !selectedPlayer?.id ||
        !timeFilter?.month ||
        !timeFilter?.year ||
        !selectedPlayerTeam?.id ||
        (user && !["Parent", "Player"].includes(user?.user_type)),
    }
  );
  const { data: parentPlayerRecommendations } = usePlayerRecommendationsQuery(
    {
      id: selectedPlayer?.id,
      month: timeFilter?.month,
      year: timeFilter?.year,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip:
        !selectedPlayer?.id ||
        !timeFilter?.month ||
        !timeFilter?.year ||
        !selectedPlayerTeam?.id ||
        (user && !["Parent", "Player"].includes(user?.user_type)),
    }
  );

  useEffect(() => {
    // Edit PlayerAction formates to match the components needed formate

    if (parentPlayerActions) {
      const newActionsTest = parentPlayerActions.results.map((action) => {
        return {
          id: action.id,
          metric: action.metric.name,
          name: action.name,
        };
      });

      setNewActions(newActionsTest);
    }
    if (parentPlayerRecommendations) {
      const newRecommendationsTest = parentPlayerRecommendations.results.map(
        (action) => {
          return {
            id: action.id,
            metric: action.metric.name,
            name: action.name,
          };
        }
      );
      setNewRecommendations(newRecommendationsTest);
    }

    if (parentPlayerKpis) setPlayerKpis(parentPlayerKpis);
    if (coachPlayerKpis) setPlayerKpis(coachPlayerKpis);
    if (superPlayerKpis) setPlayerKpis(superPlayerKpis);
    if (adminPlayerKpis) setPlayerKpis(adminPlayerKpis);
  }, [
    parentPlayerKpis,
    coachPlayerKpis,
    superPlayerKpis,
    adminPlayerKpis,
    parentPlayerActions,
    parentPlayerRecommendations,
  ]);

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
      <div className="py-4 flex flex-col xs:flex-row w-full justify-between gap-3 overflow-scroll performancesCards">
        <PerformanceCard
          name="Strengths"
          number={playerKpis ? playerKpis.strength_count : 0}
          bgColor="rgba(0, 224, 150, 0.1)"
          textColor="#27AE60"
          player_id={selectedPlayer?.id}
          data={strength?.results}
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
          player_id={selectedPlayer?.id}
          data={weakness?.results}
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
          player_id={selectedPlayer?.id}
          data={newActions && newActions}
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
          player_id={selectedPlayer?.id}
          data={newRecommendations && newRecommendations}
        >
          <Image
            width={30}
            height={30}
            src="/assets/images/discussion.png"
            alt="icon"
          />
        </PerformanceCard>
      </div>
      <div className="py-5 h-96 overflow-scroll performancesCards">
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
              angle={-75}
              style={{
                fontSize: 12,
                fontWeight: "bold",
              }}
              height={110}
              textAnchor="end"
              interval={0}
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
