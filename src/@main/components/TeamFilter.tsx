import React, { useState } from "react";
import AppIcons from "~/@main/core/AppIcons";
import { Menu } from "@mantine/core";

type Props = {};

const TeamFilter = (props: Props) => {
  // This Values will be replaced by the values will comes from the backend
  const values = ["Team One ", "Team Two", "Team Three"];

  const [selected, setSelected] = useState("Team One");

  return (
    <Menu trigger="hover" shadow="md" width={200}>
      <Menu.Target>
        <button className="flex gap-2 text-sm justify-center items-center  py-2 xs:px-6 rounded-3xl ">
          <span>{selected}</span>{" "}
          <AppIcons className="inline w-3 h-3" icon="ChevronDownIcon:outline" />{" "}
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        {values.map((value) => (
          <Menu.Item onClick={() => setSelected(value)}>{value}</Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default TeamFilter;
