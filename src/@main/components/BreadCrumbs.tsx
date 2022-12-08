import { Breadcrumbs } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  items: {
    title: string;
    href: string;
  }[];
};

const CustomBreadCrumbs = ({ items }: Props) => {
  const generated = items.map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <div className="w-11/12 mx-auto my-4">
      <Breadcrumbs className="text-perfGray3" separator="→">
        {generated}
      </Breadcrumbs>
    </div>
  );
};

export default CustomBreadCrumbs;
