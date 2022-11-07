import React from "react";
import { Avatar } from "@mantine/core";
import cn from "classnames";
import { PlayerButtonProps } from "~/app/store/types/user-types";

export const PlayerButton = ({
  img,
  name,
  onClick,
  active,
}: PlayerButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "player cursor-pointer transform hover:scale-105 py-2 px-4 flex justify-between items-center bg-white rounded-full opacity-60",
        { "opacity-100": active === true }
      )}
    >
      <Avatar radius={"xl"} size="sm" alt="Remy Sharp" src={img} />
      <h2 className="name pl-2 text-base text-perfGray2">{name}</h2>
    </div>
  );
};
