import React from "react";

type Props = {
  type: string;
};

const NoAttendancesYet = ({ type }: Props) => {
  return (
    <div className="text-center bg-white  p-4 mx-anto font-semibold">
      No {type}
    </div>
  );
};

export default NoAttendancesYet;
