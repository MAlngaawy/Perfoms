import React, { useState, useEffect } from "react";
import { Radio } from "@mantine/core";
import TopBar from "./components/TopBar";

type Props = {};

const CoachHome = (props: Props) => {
  const [checked, setChecked] =
    useState<"Attendance" | "Performance" | "Team info">("Performance");

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  return (
    <div className="coah-home">
      <div className="flex gap-4">
        <TopBar checked={checked} setChecked={setChecked} />
      </div>
    </div>
  );
};

export default CoachHome;
