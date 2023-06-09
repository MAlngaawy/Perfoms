import { Breadcrumbs } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import ReportsCategoriesCard from "~/@main/components/MainReports/ReportsCategoriesCard";
import cn from "classnames";
import { useUserQuery } from "~/app/store/user/userApi";

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
  const { data: user } = useUserQuery({});
  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3 text-sm" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="my-6 flex justify-center xs:justify-start flex-wrap gap-4  items-center">
        <Link to={"sport"}>
          <ReportsCategoriesCard
            image="/assets/images/sport.png"
            type="Sport"
          />
        </Link>
        <Link
          to={user?.user_type === "Supervisor" ? "" : "club"} // dont redirect if the user is supervisor
          className={cn({
            "opacity-30 cursor-auto": user?.user_type === "Supervisor",
          })}
        >
          <ReportsCategoriesCard
            image="/assets/images/all-sports.png"
            type="All Sports"
            clickable={user?.user_type === "Admin"} // don't add clickable styles
          />
        </Link>
      </div>
    </div>
  );
};

export default Top10Players;
