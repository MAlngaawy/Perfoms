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
      className={classNames(
        "flex gap-2 p-1 cursor-pointer bg-slate-100 w-fit rounded-full justify-center items-center",
        {
          "": selected,
        }
      )}
    >
      <Avatar onClick={() => selectFun()} src={image} size="sm" radius={"xl"} />
      <h2
        className={classNames("mr-1 text-sm  w-16", {
          hidden: !selected,
          block: selected,
        })}
      >
        {/* {name.length > 10 ? name.substring(0, 10) + "..." : name} */}
        {name}
      </h2>
    </div>
  );
};

export default SelectPlayer;
