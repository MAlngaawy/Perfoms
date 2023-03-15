import React from "react";
import { useTopTenKpiPlayersQuery } from "~/app/store/clubManager/clubManagerApi";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs, Grid } from "@mantine/core";
import CardWithTwoSides from "~/@main/components/TopTenComponents/CardWithTwoSides/CardWithTwoSides";
import AvatarWithBlueBorder from "~/@main/components/shared/AvatarWithBlueBorder";
import Info from "~/@main/components/Info";
import PlayerCard from "../../SharedComponents/PlayerCard";

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
                <PlayerCard index={index} data={data} />
              </Grid.Col>
            );
          })}
      </Grid>
    </div>
  );
};

export default Top10KpiPlayers;
