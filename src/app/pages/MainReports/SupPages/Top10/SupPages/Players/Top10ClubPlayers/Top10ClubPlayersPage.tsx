import { Breadcrumbs, Grid } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import AvatarWithBlueBorder from "~/@main/components/shared/AvatarWithBlueBorder";
import CardWithTwoSides from "~/@main/components/TopTenComponents/CardWithTwoSides/CardWithTwoSides";
import {
  useTopTenClubPlayersQuery,
  useTopTenCoachesQuery,
} from "~/app/store/clubManager/clubManagerApi";
import Info from "~/@main/components/Info";
type Props = {};

const items = [
  { title: "Reports", href: "/main-reports" },
  { title: "Top10", href: "/main-reports/top10" },
  { title: "Players", href: "/main-reports/top10/players" },
  { title: "All Sports", href: "/main-reports/top10/players/club" },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const Top10ClubPlayersPage = (props: Props) => {
  const { data, isLoading } = useTopTenClubPlayersQuery({});
  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>

      <Grid gutter={12}>
        {data &&
          //@ts-ignore
          data.map((data, index: any) => {
            return (
              <Grid.Col span={12} sm={6}>
                <CardWithTwoSides
                  number={index + 1}
                  overall_kpis={data.statistics}
                >
                  <div className="one flex flex-col gap-2 items-center justify-center">
                    <AvatarWithBlueBorder
                      size={80}
                      subTitle="Coach"
                      name={data.name}
                      image={data.icon || "No Image"}
                    />
                    <div className="infos tec flex items-start justify-between flex-wrap gap-y-3 gap-x-5 mx-4">
                      <Info label="Age" value={data.dob} />
                      <Info label="Parent" value={data.parent} />
                      <Info label="Weight" value={data.weight} />
                      <Info label="Height" value={data.height} />
                    </div>
                  </div>
                </CardWithTwoSides>
              </Grid.Col>
            );
          })}
      </Grid>
    </div>
  );
};

export default Top10ClubPlayersPage;
