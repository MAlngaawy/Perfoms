import { Divider, Grid } from "@mantine/core";
import Info from "../../Info";
import AvatarWithBlueBorder from "../../shared/AvatarWithBlueBorder";
import ChartSide from "./ChartSide";

type Props = {
  data: any;
};

const CardWithTwoSides = ({ data }: Props) => {
  return (
    <div className="p-4 border border-gray-200 relative rounded-md bg-white">
      <Grid gutter={4} className="">
        <div className="absolute left-4 top-0 bg-perfBlue pb-6 pt-2 px-6 flex flex-col items-start clipPath">
          <h1 className=" text-white font-bold text-2xl">1</h1>
        </div>
        <Grid.Col span={12} sm={6}>
          <div className="one flex flex-col gap-2 items-center justify-center">
            <AvatarWithBlueBorder
              size={80}
              subTitle="Coach"
              name={data.first_name + " " + data.last_name || "No Name"}
              image={data.avatar || "No Image"}
            />
            <div className="infos tec flex items-center justify-between flex-wrap gap-y-3 gap-x-5 mx-4 md:mx-10">
              <Info label="Teams" value={"TEST"} />
              <Info label="Sport" value={data.sport} />
              <Info label="Phone" value={data.mobile} />
            </div>
          </div>
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
                strength: data.overall_kpis.strength,
                moderate: data.overall_kpis.moderate,
                weakness: data.overall_kpis.weakness,
              }}
            />
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default CardWithTwoSides;
