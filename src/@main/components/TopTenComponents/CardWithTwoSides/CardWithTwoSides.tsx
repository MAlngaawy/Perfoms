import { Divider, Grid } from "@mantine/core";
import { ReactNode } from "react";
import Info from "../../Info";
import AvatarWithBlueBorder from "../../shared/AvatarWithBlueBorder";
import ChartSide from "./ChartSide";

type Props = {
  overall_kpis: {
    strength: number;
    moderate: number;
    weakness: number;
  };
  children: ReactNode;
  number: number;
};

const CardWithTwoSides = ({
  number,
  overall_kpis: { strength, moderate, weakness },
  children,
}: Props) => {
  return (
    <div className="p-4 border border-gray-200 relative rounded-md bg-white">
      <Grid gutter={4} className="">
        <div className="absolute left-4 top-0 bg-perfBlue pb-6 pt-2 px-6 flex flex-col items-start clipPath">
          <h1 className=" text-white font-bold text-2xl">{number}</h1>
        </div>
        <Grid.Col span={12} sm={6}>
          {children}
        </Grid.Col>
        <Divider
          orientation="vertical"
          className="hidden sm:block sm:absolute left-1/2 top-1/10 h-4/5"
        />
        <Divider
          orientation="horizontal"
          className="sm:hidden sm:absolute top-1/2 w-full"
        />
        <Grid.Col span={12} sm={6}>
          <div className="two">
            <ChartSide
              name="overall kpis"
              statistics={{
                // strength: data.overall_kpis.strength,
                // moderate: data.overall_kpis.moderate,
                // weakness: data.overall_kpis.weakness,
                strength,
                weakness,
                moderate,
              }}
            />
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default CardWithTwoSides;
