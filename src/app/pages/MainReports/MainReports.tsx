import React from "react";
import ReportsCategoriesCard from "../../../@main/components/MainReports/ReportsCategoriesCard";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mantine/core";

type Props = {};

const items = [{ title: "categories", href: "" }].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const MainReports = (props: Props) => {
  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="my-6 flex flex-wrap gap-4  items-center">
        <Link to={"search-players"}>
          <ReportsCategoriesCard
            image="/assets/images/players.png"
            type="Players"
          />
        </Link>
        {/* <Link to={"coaches"}>
          <ReportsCategoriesCard
            image="/assets/images/coaches.png"
            type="Coaches"
          />
        </Link> */}
        {/* <Link to={"supervisor"}>
        <ReportsCategoriesCard
          image="/assets/images/supervisor.png"
          type="Supervisor"
        />
      </Link> */}
        <Link to={"sports/teams"}>
          <ReportsCategoriesCard
            image="/assets/images/teams.png"
            type="Teams"
          />
        </Link>
        <Link to={"sports"}>
          <ReportsCategoriesCard
            image="/assets/images/sports.png"
            type="Sports"
          />
        </Link>
      </div>
    </div>
  );
};

export default MainReports;
