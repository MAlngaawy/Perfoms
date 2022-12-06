import React, { useState } from "react";
import { Breadcrumbs, Switch } from "@mantine/core";
import { Link, useParams } from "react-router-dom";

type Props = {};

const items = [
  { title: "categories", href: "/main-reports" },
  { title: "Search Players", href: "/main-reports/search-players" },
  { title: "Players", href: "" },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));

const Player = (props: Props) => {
  const [checked, setChecked] = useState(false);
  const { id } = useParams();
  console.log(id);

  return (
    <div className="conatiner w-11/12 mx-auto">
      <div className="mt-4">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="switch flex ">
        <Switch
          size="xl"
          sx={{
            ".mantine-Switch-track": {
              cursor: "pointer",
            },
          }}
          onLabel="Overall"
          offLabel="Detailed"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
      </div>
      <div className="my-6">
        {checked ? <div> New Charts </div> : <div> Old Charts </div>}
      </div>
    </div>
  );
};

export default Player;
