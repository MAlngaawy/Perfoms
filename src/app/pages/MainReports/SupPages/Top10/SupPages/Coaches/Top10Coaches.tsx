import { Breadcrumbs } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import CardWithTwoSides from "~/@main/components/TopTenComponents/CardWithTwoSides/CardWithTwoSides";

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
  return (
    <div className="container w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <CardWithTwoSides />
        <CardWithTwoSides />
        <CardWithTwoSides />
        <CardWithTwoSides />
        <CardWithTwoSides />
      </div>
    </div>
  );
};

export default Top10Coaches;
