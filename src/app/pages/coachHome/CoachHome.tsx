import React, { useState, useEffect } from "react";
import { Radio } from "@mantine/core";

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
        <Select checked={checked} value="Attendance" setChecked={setChecked} />
      </div>
    </div>
  );
};

export default CoachHome;

const Select = ({
  value,
  checked,
  setChecked,
}: {
  value: "Attendance" | "Performance" | "Team info";
  checked: "Attendance" | "Performance" | "Team info";
  setChecked: any;
}) => {
  return (
    <Radio.Group
      value={checked}
      onChange={(checkedValue) => setChecked(checkedValue)}
      name="favoriteFramework"
      spacing="xl"
      offset="md"
      size="sm"
    >
      <Radio
        sx={{
          ".mantine-Radio-body": {
            backgroundColor: "#fff",
            alignItems: "baseline",
            cursor: "pointer",
            padding: "10px 25px",
            borderRadius: "50px",
          },
        }}
        className=""
        value="Attendance"
        label="Attendance"
      />
      <Radio value="Performance" label="Performance" />
      <Radio value="Team info" label="Team info" />
    </Radio.Group>
  );
};
