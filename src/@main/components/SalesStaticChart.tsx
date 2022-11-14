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
    id: 0,
    name: "Stances",
    progress: 50,
    attend: 70,
  },
  {
    id: 1,
    name: "Psycholo",
    progress: 75,
    attend: 45,
  },
  {
    id: 2,
    name: "Pushing",
    progress: 95,
    attend: 100,
  },
  {
    id: 3,
    name: "Attackin",
    progress: 30,
    attend: 50,
  },
  {
    id: 4,
    name: "Courage",
    progress: 40,
    attend: 35,
  },
  {
    id: 5,
    name: "Counter",
    progress: 66,
    attend: 50,
  },
  {
    id: 6,
    name: "High Tec",
    progress: 50,
    attend: 40,
  },
  {
    id: 7,
    name: "Fitness",
    progress: 30,
    attend: 60,
  },
];

const SaleStaticChart = () => {
  const player = useSelector(selectedPlayerFn);
  const formattedKpis = fakeKpiData;
  console.log(player);

  return (
    <div className="py-5">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={player?.kpis?.data.map((i) => ({
            name: i.kpi__name,
            id: i.id,
            progress: i.kpi__max_score,
            attend: 4,
          }))}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
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
          <Bar
            dataKey="progress"
            fill="#333"
            barSize={12}
            radius={3}
            style={{
              cursor: "pointer",
            }}
          >
            {player?.kpis?.data.map((metric, index) => (
              <Cell
                key={index}
                fill={
                  metric.kpi__max_score > 10
                    ? "#00E096"
                    : metric.kpi__max_score < 10
                    ? "#EB5757"
                    : "#F2C94C"
                }
              />
            ))}
          </Bar>
          <Bar
            dataKey="attend"
            fill="#BDBDBD"
            barSize={12}
            radius={3}
            style={{
              cursor: "pointer",
            }}
          >
            {player?.kpis?.data.map((metric) => {
              return <Cell key={metric.id} fill="#BDBDBD" />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SaleStaticChart;
