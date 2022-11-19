import React from "react";
import AppIcons from "~/@main/core/AppIcons";
import { Checkbox } from "@mantine/core";

interface DayProps {
  dates: string[];
}

const AttendanceCheckBox = ({ dates }: DayProps) => {
  return (
    <div>
      <div className="p-4 m-1 md:m-3 h-96 bg-white rounded-3xl">
        <h2 className="font-medium pb-2">Attendance</h2>
        <div className="flex flex-col pb-5 h-5/6 overflow-y-scroll">
          <div className="md:w-1/2 flex flex-row justify-between">
            <h2 className="text-sm font-medium">
              Day
              <AppIcons
                className="w-4 text-perfGray pb-1 inline"
                icon="ArrowLongUpIcon:outline"
              />
            </h2>
            <h2 className="text-sm font-medium">attendance</h2>
          </div>
          <div className="flex flex-col md:w-1/2 gap-x-10 gap-y-2 py-3">
            {dates.map((day, index) => {
              return (
                <Checkbox
                  key={index}
                  className="flex flex-row"
                  sx={{
                    ".mantine-Checkbox-body": {
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      marginRight: "20px",
                    },
                  }}
                  onChange={() => console.log(day)}
                  labelPosition="left"
                  label={day}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCheckBox;
