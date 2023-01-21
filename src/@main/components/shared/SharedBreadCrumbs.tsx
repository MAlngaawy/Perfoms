import { useLocation, useParams } from "react-router-dom";
import CustomBreadCrumbs from "~/@main/components/BreadCrumbs";
import {
  useGeneralKpisQuery,
  // useGeneralMetricsQuery,
  useGeneralPillarsQuery,
  useGeneralSportsQuery,
  useGeneralTeamsQuery,
} from "~/app/store/user/userApi";
import __ from "lodash";
import { useEffect } from "react";

type Props = {};

const SharedBreadCrumbs = (props: Props) => {
  const { team_id, sport_id, pillar_id, kpi_id } = useParams();

  const location = useLocation();
  const home = location.pathname.split("/")[1];
  const items: { title: string; href: string }[] = [
    { title: "Home", href: `/${home}` },
  ];

  const { data: teams } = useGeneralTeamsQuery({});
  const { data: sports } = useGeneralSportsQuery({});
  const { data: pillars } = useGeneralPillarsQuery({});
  const { data: kpis } = useGeneralKpisQuery({});
  // const { data: metrics } = useGeneralMetricsQuery({});

  useEffect(() => {}, [
    teams,
    sports,
    pillars,
    kpis,
    items,
    team_id,
    sport_id,
    pillar_id,
    kpi_id,
  ]);

  if (team_id) {
    const myItems = __.find(teams?.results, { id: +team_id });
    items.push({
      title: "Team " + myItems?.name || "No Name",
      href: `/${home}/teams/${team_id}`,
    });
  }

  if (sport_id) {
    const myItems = __.find(sports?.results, { id: +sport_id });
    items.push({
      title: myItems?.name || "No Name",
      href: `/${home}/sports/${sport_id}/pillars`,
    });
  }

  if (pillar_id) {
    const myItems = __.find(pillars?.results, { id: +pillar_id });
    items.push({
      title: myItems?.name || "No Name",
      href: `/${home}/sports/${sport_id}/pillars/${pillar_id}/kpis`,
    });
  }

  if (kpi_id) {
    const myItems = __.find(kpis?.results, { id: +kpi_id });
    items.push({
      title: myItems?.name || "No Name",
      href: `/${home}/sports/${sport_id}/pillars/${pillar_id}/kpis/${kpi_id}/metrics`,
    });
  }

  return <CustomBreadCrumbs items={items} />;
};

export default SharedBreadCrumbs;
