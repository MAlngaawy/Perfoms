import { Breadcrumbs, Grid } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import CardWithTwoSides from "~/@main/components/TopTenComponents/CardWithTwoSides/CardWithTwoSides";
import { useTopTenCoachesQuery } from "~/app/store/clubManager/clubManagerApi";

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
  console.log("dataaaaaaa", data);
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
          data.map((coachData: any) => {
            console.log(coachData);
            return (
              <Grid.Col span={12} sm={6}>
                <CardWithTwoSides data={coachData} />
              </Grid.Col>
            );
          })}
      </Grid>
    </div>
  );
};

export default Top10Coaches;
