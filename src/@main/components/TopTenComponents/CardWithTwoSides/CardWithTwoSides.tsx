import React from "react";

type Props = {};

const CardWithTwoSides = (props: Props) => {
  return (
    <div className="flex justify-between items-center p-4 border border-gray-200 rounded-md bg-white">
      <div className="one">Oneee</div>
      <div className="line w-1 h-full bg-slate-400"></div>
      <div className="two">Twoooo</div>
    </div>
  );
};

export default CardWithTwoSides;
