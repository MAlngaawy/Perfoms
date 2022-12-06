import { Breadcrumbs } from "@mantine/core";
import React from "react";
import { Link, useParams } from "react-router-dom";

type Props = {};

const items = [
  { title: "categories", href: "/main-reports" },
  { title: "Search Players", href: "" },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const Player = (props: Props) => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="conatiner w-11/12 mx-auto">
      <div className="my-4">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      Player {id}
    </div>
  );
};

export default Player;
