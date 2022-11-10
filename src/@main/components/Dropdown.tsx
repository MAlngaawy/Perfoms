import React, { useState } from "react";
import AppIcons from "~/@main/core/AppIcons";
import { Menu } from "@mantine/core";

type Props = {
  selected: any;
  setSelected: any;
  values: any[];
  className?: string;
};

export const Dropdown = ({
  selected,
  setSelected,
  values,
  className,
}: Props) => {
  return (
    <Menu trigger="hover" shadow="md" width={200}>
      <Menu.Target>
        <button
          className={
            "flex gap-2 text-sm justify-center items-center  py-2 px-6 rounded-3xl" +
            className
          }
        >
          <span>{selected}</span>
          <AppIcons className="w-3 h-3" icon="ChevronDownIcon:outline" />{" "}
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
