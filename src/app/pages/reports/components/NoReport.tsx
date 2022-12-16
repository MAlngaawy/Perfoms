import React from "react";

type Props = {};

const NoReport = (props: Props) => {
  return (
    <div className="flex justify-center items-center h-full mx-2">
      <div>
        You don't have any{" "}
        <span className="text-perfBlue font-medium px-1"> Data </span> for this
        period
      </div>
    </div>
  );
};

export default NoReport;
