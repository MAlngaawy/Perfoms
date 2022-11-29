import { CardProps } from "~/app/store/types/user-types";
import { PerformanceCard } from "~/@main/components/PerformanceCard";
import SaleStaticChart from "./SalesStaticChart";

const Card = ({
  type,
  powerType,
  scores,
  playerSummary,
  bg,
  color,
}: CardProps) => {
  if (type === "performanceSummary") {
    // props { playerSummary:PerformanceCardProps[] }
    return (
      <div className="bg-white rounded-3xl px-6 py-2 h-full">
        <div className="title">
          <h1 className="text-lg font-normal">Performance Report summary</h1>
        </div>
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
                {/* under progress ========  */}
              </div>
            );
          })}
        </div>
        <SaleStaticChart />
      </div>
    );
  }

  return (
    // props {scores , bg , color}
    <div className="flex flex-col bg-white py-2 rounded-3xl">
      <div className="power_type px-5 py-2 flex flex-row justify-between">
        <span className={` font-semibold power_type_name ${color}`}>
          {powerType}
        </span>
        <p>Score is out of 5</p>
      </div>
      <div
        className={`power_header ${bg}  px-5 py-2 bg-white flex flex-row justify-between`}
      >
        <h3 className="text-sm">Name</h3>
        <h3 className="text-sm">Score</h3>
      </div>
      {scores?.map((power, index) => {
        return (
          <div
            key={index}
            className="power_score  px-5 py-2 flex flex-row justify-between"
          >
            <h3 className="text-sm">{power.name}</h3>
            <h3 className={`font-semibold ${color} text-sm`}>{power.score}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
