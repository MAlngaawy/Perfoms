import React from "react";
import { InfoProps } from "app/store/types/user-types";

const Info = ({ label, value }: InfoProps) => {
  return (
    <div className="flex flex-col my-1">
      <h3 className=" text-perfGray3 text-sm">{label}</h3>
      <h2 className="text-perfGray1 text-base font-medium">{value}</h2>
    </div>
  );
};

export default Info;
