import React from "react";
import AppIcons from "../core/AppIcons";

interface TableHeaderProps {
  name: string;
  value: string;
}

const TableHeader = ({ name, value }: TableHeaderProps) => {
  return (
    <div className="flex flex-row justify-between py-2">
      <h2 className="text-sm font-medium">{name}</h2>
      <p className="text-perfGray">|</p>
      <h2 className="text-sm font-medium">{value}</h2>
    </div>
  );
};

export default TableHeader;
