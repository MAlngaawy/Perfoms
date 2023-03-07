import { Breadcrumbs } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import ReportsCategoriesCard from "~/@main/components/MainReports/ReportsCategoriesCard";

type Props = {};

const items = [
  { title: "Reports", href: "/main-reports" },
  { title: "Top10", href: "/main-reports/top10" },
  { title: "players", href: "/main-reports/top10/players" },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const Top10Players = (props: Props) => {
  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="my-6 flex justify-center xs:justify-start flex-wrap gap-4  items-center">
        <Link to={"all-sports"}>
          <ReportsCategoriesCard
            image="/assets/images/players.png"
            type="All Sports"
          />
        </Link>
      </div>
    </div>
  );
};

export default Top10Players;
