import React from "react";
import { Radio } from "@mantine/core";

type Props = {
  checked: string;
  setChecked: any;
  values: string[];
};

const AppRadioGroub = ({ checked, setChecked, values }: Props) => {
  return (
    <div className="">
      <Radio.Group
        value={checked}
        onChange={(checkedValue: string) => setChecked(checkedValue)}
        name="favoriteFramework"
        spacing="xs"
        offset="md"
        size="xs"
        sx={{
          ".mantine-Group-root": {
            paddingTop: 0,
          },
        }}
        className="flex-wrap justify-center p-0"
      >
        {values.map((value, ids) => {
          return (
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
              value={value}
              label={value}
            />
          );
        })}
        {/* <Radio
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
        /> */}
      </Radio.Group>
    </div>
  );
};

export default AppRadioGroub;
