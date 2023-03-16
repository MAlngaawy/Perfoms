import { useTopTenKpiPlayersQuery } from "~/app/store/clubManager/clubManagerApi";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs, Grid } from "@mantine/core";
import PlayerCard from "../../SharedComponents/PlayerCard";
import { useState } from "react";
import { TopTenKpiPlayers } from "~/app/store/types/clubManager-types";
import { useEffect } from "react";
import { useSuperTopTenKpiPlayersQuery } from "~/app/store/supervisor/supervisorMainApi";

type Props = {};

const Top10KpiPlayers = (props: Props) => {
  const { kpi_id } = useParams();
  const [top10KpiPlayers, setTop10KpiPlayers] = useState<TopTenKpiPlayers>();
  const { data: adminTop10KpiPlayers } = useTopTenKpiPlayersQuery(
    { kpi_id },
    { skip: !kpi_id }
  );
  const { data: superTop10KpiPlayers } = useSuperTopTenKpiPlayersQuery(
    { kpi_id },
    { skip: !kpi_id }
  );

  useEffect(() => {
    if (adminTop10KpiPlayers) setTop10KpiPlayers(adminTop10KpiPlayers);
    if (superTop10KpiPlayers) setTop10KpiPlayers(superTop10KpiPlayers);
  }, [adminTop10KpiPlayers, superTop10KpiPlayers]);

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
                <PlayerCard
                  title={top10KpiPlayers?.name}
                  index={index}
                  data={data}
                />
              </Grid.Col>
            );
          })}
      </Grid>
    </div>
  );
};

export default Top10KpiPlayers;
