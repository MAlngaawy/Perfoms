import Info from "~/@main/components/Info";
import AvatarWithBlueBorder from "~/@main/components/shared/AvatarWithBlueBorder";
import CardWithTwoSides from "~/@main/components/TopTenComponents/CardWithTwoSides/CardWithTwoSides";
import { Top10ClubPlayer } from "~/app/store/types/clubManager-types";

type Props = {
  data: Top10ClubPlayer;
  index: number;
  title?: string;
};

const PlayerCard = ({ data, index, title }: Props) => {
  return (
    <CardWithTwoSides
      title={title}
      number={index + 1}
      overall_kpis={data.statistics}
    >
      <div className="one flex flex-col gap-2 items-center justify-center">
        <AvatarWithBlueBorder
          size={80}
          name={data.name}
          image={data.icon || "No Image"}
          subTitle={data.sport}
        />
        <div className="infos tec flex items-start justify-between flex-wrap gap-y-3 gap-x-5 mx-4">
          <div className="flex flex-col my-1 justify-center items-center">
            <h3 className=" text-perfGray3 text-xs">Teams</h3>
            {data.team.map(({ name, id }) => {
              return (
                <h2 key={id} className="text-perfGray1 text-sm font-normal">
                  {name}
                </h2>
              );
            })}
          </div>
          <Info label="Age" value={data.dob} />
          <Info label="Parent" value={data.parent} />
          <Info label="Weight" value={data.weight} />
          <Info label="Height" value={data.height} />
        </div>
      </div>
    </CardWithTwoSides>
  );
};

export default PlayerCard;
