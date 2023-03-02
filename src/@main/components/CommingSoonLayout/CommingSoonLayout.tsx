import { Avatar } from "@mantine/core";
import React from "react";

type Props = {};

const CommingSoonLayout = (props: Props) => {
  return (
    <div className=" absolute z-50 w-full h-full px-4 left-0 top-0 bg-black/70 flex justify-center items-center">
      <img src={"/assets/comming-soon.png"} />
    </div>
  );
};

export default CommingSoonLayout;
