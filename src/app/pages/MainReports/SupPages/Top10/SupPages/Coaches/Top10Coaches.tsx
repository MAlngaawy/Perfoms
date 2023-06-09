import { Breadcrumbs, Grid } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import AvatarWithBlueBorder from "~/@main/components/shared/AvatarWithBlueBorder";
import CardWithTwoSides from "~/@main/components/TopTenComponents/CardWithTwoSides/CardWithTwoSides";
import { useTopTenCoachesQuery } from "~/app/store/clubManager/clubManagerApi";
import Info from "~/@main/components/Info";

type Props = {};
const items = [
  { title: "Reports", href: "/main-reports" },
  { title: "Top10", href: "/main-reports/top10" },
  { title: "Coaches", href: "" },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));
const Top10Coaches = (props: Props) => {
  const { data, isLoading } = useTopTenCoachesQuery({});
  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3 text-sm" separator="→">
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
                  overall_kpis={data.overall_kpis}
                >
                  <div className="one flex flex-col gap-2 items-center justify-center">
                    <AvatarWithBlueBorder
                      size={80}
                      subTitle="Coach"
                      name={data.first_name + " " + data.last_name || "No Name"}
                      image={data.avatar || "No Image"}
                    />
                    <div className="infos tec flex items-start justify-between flex-wrap gap-y-3 gap-x-5 mx-4 md:mx-10">
                      <div className="flex flex-col my-1">
                        <h3 className=" text-perfGray3 text-xs">Teams</h3>
                        {data.teams.map((oneTeam: any) => {
                          return (
                            <h2
                              key={oneTeam.id}
                              className="text-perfGray1 text-sm font-normal"
                            >
                              {oneTeam.name}
                            </h2>
                          );
                        })}
                      </div>
                      <Info label="Sport" value={data.sport} />
                      <Info label="Phone" value={data.mobile} />
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

export default Top10Coaches;
