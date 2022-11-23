import { Avatar } from "@mantine/core";
import React from "react";
import classNames from "classnames";

type Props = {
  selected: boolean;
  image: string;
  name: string;
  selectFun?: any;
};

const SelectPlayer = ({ selected, image, name, selectFun }: Props) => {
  return (
    <div
      className={classNames("flex gap-2 p-1", {
        "": selected,
      })}
    >
      <Avatar onClick={() => selectFun()} src={image} size="sm" radius={"xl"} />
      <h2
        className={classNames("hidden", {
          "block LOL": selected,
        })}
      >
        {name}
      </h2>
    </div>
  );
};

export default SelectPlayer;
