import { CardProps } from "~/app/store/types/user-types";

const Card = ({ powerType, scores, bg, color }: CardProps) => {
  return (
    // props {scores , bg , color}
    <div className="flex flex-col bg-white py-2 h-80 min-h-fit overflow-scroll rounded-3xl">
      <div className="power_type px-5 py-2 flex flex-row justify-between items-center">
        <span className={` text-lg ${color}`}>{powerType}</span>
        <p className="text-sm text-perfGray3">
          Score is out of {scores?.length}
        </p>
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
            className={`power_score px-5 py-2 flex flex-row justify-between`}
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
