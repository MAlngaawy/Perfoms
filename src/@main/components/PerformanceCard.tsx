import React from "react";
import { PerformanceCardProps } from "app/store/types/user-types";

export const PerformanceCard = ({
  number,
  name,
  bgColor,
  textColor,
  children,
}: PerformanceCardProps) => {
  return (
    <div
      style={{ background: bgColor }}
      className="card w-full flex py-2 px-4 gap-4 font-semibold rounded-full cursor-pointer"
    >
      <div className="icon flex justify-center items-center">{children}</div>
      <div
        style={{ color: textColor }}
        className="info flex flex-col leading-4 text-xs"
      >
        <h2>{number}</h2>
        <h2>{name}</h2>
      </div>
    </div>
  );
};
