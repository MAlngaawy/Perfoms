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
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";

const fakeKpiData = [
  {
    id: 37,
    kpi: "Pushing",
    metric: "Left Leg",
    level: "s",
    score_avg: 100.0,
  },
  {
    id: 1366,
    kpi: "Psychology",
    metric: "Persistence",
    level: "i",
    score_avg: 52.0,
  },
  {
    id: 211,
    kpi: "Blocks",
    metric: "Blocks Timing",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 421,
    kpi: "Punching & Hand Strike",
    metric: "Punching Timing",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 1296,
    kpi: "Psychology",
    metric: "Offense",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 1226,
    kpi: "Mental",
    metric: "When win",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 457,
    kpi: "Punching & Hand Strike",
    metric: "Punching Power",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 737,
    kpi: "Stances",
    metric: "Behavior",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 876,
    kpi: "High Tech",
    metric: "360",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 946,
    kpi: "High Tech",
    metric: "Titchagi",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 1051,
    kpi: "Fitness",
    metric: "Flexibility",
    level: "s",
    score_avg: 100.0,
  },
  {
    id: 1121,
    kpi: "Attacking",
    metric: "Attacking Position in court",
    level: "s",
    score_avg: 100.0,
  },
  {
    id: 1,
    kpi: "Pushing",
    metric: "Right Leg",
    level: "s",
    score_avg: 100.0,
  },
  {
    id: 108,
    kpi: "Pushing",
    metric: "Pushing Technique",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 247,
    kpi: "Blocks",
    metric: "Power",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 318,
    kpi: "Blocks",
    metric: "Blocks Technique",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 528,
    kpi: "Punching & Hand Strike",
    metric: "Punching Technique",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 807,
    kpi: "Stances",
    metric: "Stances Position In Court",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 911,
    kpi: "High Tech",
    metric: "Tifregi",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 981,
    kpi: "Fitness",
    metric: "Endurance",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 1016,
    kpi: "Fitness",
    metric: "Balance",
    level: "s",
    score_avg: 100.0,
  },
  {
    id: 1086,
    kpi: "Attacking",
    metric: "Style",
    level: "s",
    score_avg: 100.0,
  },
  {
    id: 1156,
    kpi: "Counter",
    metric: "Style",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 1191,
    kpi: "Counter",
    metric: "Counter Position in court",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 1261,
    kpi: "Mental",
    metric: "When lose",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 1331,
    kpi: "Psychology",
    metric: "Defense",
    level: "s",
    score_avg: 80.0,
  },
  {
    id: 1401,
    kpi: "Courage",
    metric: "Attacking rate",
    level: "w",
    score_avg: 40.0,
  },
];

const SaleStaticChart = () => {
  const player = useSelector(selectedPlayerFn);
  const formattedKpis = fakeKpiData;
  console.log(player);

  return (
    <div className="py-5 h-80 overflow-scroll">
      <ResponsiveContainer width={700} height="100%">
        <BarChart
          data={formattedKpis.map((i) => ({
            name: i.metric,
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
          <Legend />
          <Bar dataKey="progress" fill="#333" barSize={10} radius={2}>
            {formattedKpis.map((metric, index) => (
              <Cell
                key={index}
                fill={
                  metric.score_avg > 80
                    ? "#00E096"
                    : metric.score_avg < 50
                    ? "#EB5757"
                    : "#F2C94C"
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
  );
};

export default SaleStaticChart;
