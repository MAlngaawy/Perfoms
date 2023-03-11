import React from "react";
import { useTopTenKpiPlayersQuery } from "~/app/store/clubManager/clubManagerApi";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs, Grid } from "@mantine/core";
import CardWithTwoSides from "~/@main/components/TopTenComponents/CardWithTwoSides/CardWithTwoSides";
import AvatarWithBlueBorder from "~/@main/components/shared/AvatarWithBlueBorder";
import Info from "~/@main/components/Info";

type Props = {};

const Top10KpiPlayers = (props: Props) => {
  const { kpi_id } = useParams();
  const { data: top10KpiPlayers } = useTopTenKpiPlayersQuery(
    { kpi_id },
    { skip: !kpi_id }
  );

  const items = [
    { title: "Reports", href: "/main-reports" },
    { title: "Top10", href: "/main-reports/top10" },
    { title: "Players", href: "/main-reports/top10/players" },
    { title: "Sport Kpis", href: "/main-reports/top10/players/sport" },
    { title: top10KpiPlayers?.name, href: "" },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4 flex flex-col gap-2 sm:flex-row justify-between">
        <Breadcrumbs className="text-perfGray3 text-sm" separator="→">
          {items}
        </Breadcrumbs>
      </div>

      <Grid gutter={12}>
        {top10KpiPlayers &&
          top10KpiPlayers.players.map((data, index: any) => {
            return (
              <Grid.Col span={12} sm={6}>
                <CardWithTwoSides
                  title={top10KpiPlayers.name + " Kpi"}
                  number={index + 1}
                  overall_kpis={data.statistics}
                >
                  <div className="one flex flex-col gap-2 items-center justify-center">
                    <AvatarWithBlueBorder
                      size={80}
                      // subTitle="Coach" == will be player team
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

export default Top10KpiPlayers;
