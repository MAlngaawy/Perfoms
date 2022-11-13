import React from "react";
import { Radio } from "@mantine/core";

type Props = {
  checked: "Attendance" | "Performance" | "Team info";
  setChecked: any;
};

const TopBar = ({ checked, setChecked }: Props) => {
  return (
    <div className="m-2">
      <Radio.Group
        value={checked}
        onChange={(checkedValue: string) => setChecked(checkedValue)}
        name="favoriteFramework"
        spacing="sm"
        offset="md"
        size="xs"
        className="flex-wrap justify-center"
      >
        <Radio
          sx={{
            ".mantine-Radio-body": {
              backgroundColor: "#fff",
              alignItems: "baseline",
              padding: "10px 25px",
              borderRadius: "50px",
            },
            ".mantine-Radio-label": {
              cursor: "pointer",
            },
            " .mantine-Radio-radio": {
              cursor: "pointer",
            },
          }}
          value="Attendance"
          label="Attendance"
        />
        <Radio
          sx={{
            ".mantine-Radio-body": {
              backgroundColor: "#fff",
              alignItems: "baseline",
              padding: "10px 25px",
              borderRadius: "50px",
            },
            ".mantine-Radio-label": {
              cursor: "pointer",
            },
            " .mantine-Radio-radio": {
              cursor: "pointer",
            },
          }}
          value="Performance"
          label="Performance"
        />
        <Radio
          sx={{
            ".mantine-Radio-body": {
              backgroundColor: "#fff",
              alignItems: "baseline",
              padding: "10px 25px",
              borderRadius: "50px",
            },
            ".mantine-Radio-label": {
              cursor: "pointer",
            },
            " .mantine-Radio-radio": {
              cursor: "pointer",
            },
          }}
          value="Team info"
          label="Team info"
        />
        <button className="bg-perfBlue text-white text-xs py-2 px-10 rounded-3xl">
          Certificate
        </button>
      </Radio.Group>
    </div>
  );
};

export default TopBar;
