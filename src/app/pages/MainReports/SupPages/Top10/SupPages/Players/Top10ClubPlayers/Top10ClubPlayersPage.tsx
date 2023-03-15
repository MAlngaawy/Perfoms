import { Breadcrumbs, Grid } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTopTenClubPlayersQuery } from "~/app/store/clubManager/clubManagerApi";
import TabsContainer from "~/@main/components/shared/TabsContainer";
import PlayerCard from "../SharedComponents/PlayerCard";
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
  const [selectedValue, setSelectedValue] =
    useState<"Players" | "Teams">("Players");
  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4 flex flex-col gap-2 sm:flex-row justify-between">
        <Breadcrumbs className="text-perfGray3 text-sm" separator="→">
          {items}
        </Breadcrumbs>
        <div>
          <TabsContainer
            selectedValue={selectedValue}
            selectValueFun={setSelectedValue}
            values={["Players", "Teams"]}
          />
        </div>
      </div>

      <Grid gutter={12}>
        {data &&
          //@ts-ignore
          data.map((data, index: any) => {
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

export default Top10ClubPlayersPage;
