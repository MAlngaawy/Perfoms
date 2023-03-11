import { Divider, Grid } from "@mantine/core";
import { ReactNode } from "react";
import Info from "../../Info";
import AvatarWithBlueBorder from "../../shared/AvatarWithBlueBorder";
import ChartSide from "./ChartSide";
import cn from "classnames";

type Props = {
  overall_kpis: {
    strength: number;
    moderate: number;
    weakness: number;
  };
  children: ReactNode;
  number: number;
  title?: string;
};

const ranges = [
  "",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
];

const CardWithTwoSides = ({
  number,
  overall_kpis: { strength, moderate, weakness },
  children,
  title,
}: Props) => {
  return (
    <div className="p-4 border border-gray-200 relative rounded-md bg-white h-full">
      <Grid gutter={4} className="">
        <div
          className={cn(
            "absolute left-4 top-0  pb-6 pt-2 px-3 flex flex-col items-start clipPath",
            {
              "bg-perfGreen": number === 1,
              "bg-perfBlue": number === 2,
              "bg-perfBlue3": number !== 2 && number !== 1,
            }
          )}
        >
          <h1 className=" text-white font-meduim text-lg">{ranges[number]}</h1>
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
              name={title || "overall kpis"}
              statistics={{
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
