import { Breadcrumbs, Grid, Select } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AvatarWithBlueBorder from "~/@main/components/shared/AvatarWithBlueBorder";
import CardWithTwoSides from "~/@main/components/TopTenComponents/CardWithTwoSides/CardWithTwoSides";
import {
  useAdminSportsQuery,
  useTopTenSportKpisQuery,
  useTopTenSportPlayersQuery,
} from "~/app/store/clubManager/clubManagerApi";
import Info from "~/@main/components/Info";
import TabsContainer from "~/@main/components/shared/TabsContainer";
import { useUserQuery } from "~/app/store/user/userApi";
import ReportsChartCard from "~/@main/components/MainReports/ReportsChartCard";
import PlayerCard from "../SharedComponents/PlayerCard";

type Props = {};

const Top10SportPlayers = (props: Props) => {
  const [selectedSport, setSelectedSport] = useState<number>(0);
  const [selectedValue, setSelectedValue] =
    useState<"Players" | "Teams">("Players");
  const [selectedValue2, setSelectedValue2] =
    useState<"Kpi" | "Overall">("Kpi");
  const { data: user } = useUserQuery({});
  const navigate = useNavigate();
  const selectSportRef = useRef(null);
  const [crumbsName, setCrumbsName] = useState("");

  const items = [
    { title: "Reports", href: "/main-reports" },
    { title: "Top10", href: "/main-reports/top10" },
    { title: "Players", href: "/main-reports/top10/players" },
    { title: crumbsName, href: "" },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  useEffect(() => {
    const name = selectedValue2 === "Overall" ? " Sport Players" : "Sport Kpis";
    setCrumbsName(name);
  }, [selectedValue2, selectSportRef, selectedSport]);

  const { data: top10SportKpis } = useTopTenSportKpisQuery(
    { sport_id: +selectedSport },
    { skip: !selectedSport }
  );

  const { data: top10SportPlayers } = useTopTenSportPlayersQuery(
    { sport_id: +selectedSport },
    { skip: !selectedSport }
  );

  // get sports for filter
  const { data: adminSports } = useAdminSportsQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );

  const formatSports = adminSports?.results?.map((sport) => {
    return { value: JSON.stringify(sport.id), label: sport.name };
  }) || [{ value: "0", label: "No Sports" }];

  useEffect(() => {
    adminSports && setSelectedSport(adminSports.results[0].id);
  }, [adminSports]);

  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4 flex flex-col gap-2 sm:flex-row justify-between">
        <Breadcrumbs className="text-perfGray3 text-sm" separator="→">
          {items}
        </Breadcrumbs>
        <div className="flex gap-2 flex-wrap justify-center">
          <TabsContainer
            selectedValue={selectedValue}
            selectValueFun={setSelectedValue}
            values={["Players"]}
          />
          <TabsContainer
            selectedValue={selectedValue2}
            selectValueFun={setSelectedValue2}
            values={["Kpi", "Overall"]}
          />
          <Select
            ref={selectSportRef}
            radius={100}
            value={JSON.stringify(selectedSport)}
            onChange={(e) => {
              e && setSelectedSport(+e);
            }}
            placeholder="Pick a Sport"
            data={formatSports}
          />
        </div>
      </div>

      {selectedValue2 === "Kpi" ? (
        <div className="flex gap-4 flex-wrap my-4 justify-center lg:justify-start">
          {top10SportKpis && top10SportKpis.length ? (
            top10SportKpis.map((data, index: any) => {
              return (
                <div>
                  <ReportsChartCard
                    name={data.name}
                    statistics={data.statistics}
                    clickable
                    onClickFun={() => navigate(JSON.stringify(data.id))}
                  />
                </div>
              );
            })
          ) : (
            <div className="flex flex-col gap-6 justify-center items-center w-full h-full">
              <img
                className="md:w-72 md:my-5"
                src="/assets/images/noteams.png"
                alt="no teams"
              />
              <p className="text-xl">This Sport Has No Kpis Yet</p>
            </div>
          )}
        </div>
      ) : (
        <Grid gutter={12}>
          {top10SportPlayers && top10SportPlayers.length ? (
            top10SportPlayers.map((data, index: any) => {
              return (
                <Grid.Col span={12} sm={6}>
                  <PlayerCard index={index} data={data} />
                </Grid.Col>
              );
            })
          ) : (
            <div className="flex flex-col gap-6 justify-center items-center w-full h-full">
              <img
                className="md:w-72 md:my-5"
                src="/assets/images/noteams.png"
                alt="no teams"
              />
              <p className="text-xl">This Sport Has No Players Yet</p>
            </div>
          )}
        </Grid>
      )}
    </div>
  );
};

export default Top10SportPlayers;
