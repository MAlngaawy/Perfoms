import React from "react";

type NoDataProps = {
  className: string;
};

const NoData = ({ className }: NoDataProps) => {
  return (
    <div className={`flex flex-row flex-wrap ${className}`}>
      <p>there is no data yet</p>{" "}
      <p className="text-perfBlue font-medium">come back in a week</p>
    </div>
  );
};

export default NoData;
