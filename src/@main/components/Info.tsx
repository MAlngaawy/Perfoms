import React from "react";
import { InfoProps } from "app/store/types/user-types";
import cn from "classnames";

const Info = ({ label, value, center }: InfoProps) => {
  return (
    <div
      className={cn("flex flex-col my-1", {
        "justify-center items-center": center,
      })}
    >
      <h3 className=" text-perfGray3 text-xs">{label}</h3>
      <h2 className="text-perfGray1 text-sm font-normal">{value}</h2>
    </div>
  );
};

export default Info;
