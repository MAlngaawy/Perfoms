import React from "react";
import ReportsCategoriesCard from "../../../@main/components/MainReports/ReportsCategoriesCard";
import { Link } from "react-router-dom";

type Props = {};

const MainReports = (props: Props) => {
  return (
    <div className="m-4 p-4 flex flex-wrap gap-4  items-center">
      <Link to={"search-players"}>
        <ReportsCategoriesCard
          image="/assets/images/players.png"
          type="Players"
        />
      </Link>
      <Link to={"coaches"}>
        <ReportsCategoriesCard
          image="/assets/images/coaches.png"
          type="Coaches"
        />
      </Link>
      <Link to={"supervisor"}>
        <ReportsCategoriesCard
          image="/assets/images/supervisor.png"
          type="Supervisor"
        />
      </Link>
      <Link to={"teams"}>
        <ReportsCategoriesCard image="/assets/images/teams.png" type="Teams" />
      </Link>
      <Link to={"sports-reports"}>
        <ReportsCategoriesCard
          image="/assets/images/sports.png"
          type="Sports"
        />
      </Link>
    </div>
  );
};

export default MainReports;
