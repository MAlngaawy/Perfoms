import { Breadcrumbs } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import ReportsCategoriesCard from "~/@main/components/MainReports/ReportsCategoriesCard";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {};

const items = [
  { title: "Reports", href: "/main-reports" },
  { title: "Top10", href: "/main-reports/top10" },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const Top10 = (props: Props) => {
  const { data: user } = useUserQuery(null);

  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3 text-sm" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="my-6 flex justify-center xs:justify-start flex-wrap gap-4  items-center">
        {/* <Link to={"search-players"}>
          <ReportsCategoriesCard
            image="/assets/images/players.png"
            type="Players"
          />
        </Link> */}
        <Link to={"players"}>
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
      </div>
    </div>
  );
};

export default Top10;
