import React, { useState } from "react";
import { Dropdown } from "~/@main/components/Dropdown";
import Info from "~/@main/components/Info";
import AppIcons from "~/@main/core/AppIcons";
import { parentDummyData } from "../parentCard/ParentCard";
import NewMessage from "./components/NewMessage";

const dummyDates = ["Sunday, 15/SEP.", "Sunday, 15/SEP.", "Sunday, 15/SEP."];

const NotifyParent = () => {
  const [selected, setSelected] = useState("notification type");

  return (
    <div className="notify-parent flex flex-row justify-end">
      <div className="p-4 m-1 md:m-3 h-96 w-full flex gap-12 flex-col justify-between md:w-1/2 bg-white rounded-3xl">
        <div className="flex flex-row justify-start md:justify-between items-start pb-10">
          <div className="flex flex-col gap-3">
            <p className="text-sm">
              This will be sent to{" "}
              <span className="text-perfBlue">
                {parentDummyData.parentName}
              </span>
            </p>
            <p>About:</p>
            <Info
              label="Player"
              value={parentDummyData.playersDetails[0].name}
            />
          </div>
          <Dropdown
            selected={selected}
            setSelected={setSelected}
            values={["notification type", "random type"]}
            className="bg-black text-white text-sm font-medium hidden md:block w-44"
          />
        </div>
        <div className="pt-10">
          <NewMessage />
        </div>
      </div>
      <div className="none hidden md:block p-4 m-1">
        <h1 className="text-sm text-perfGray">previous notification</h1>
        {dummyDates.map((date, index) => {
          return (
            <Notification
              key={index}
              parent={parentDummyData.parentName}
              date={date}
            />
          );
        })}
      </div>
    </div>
  );
};

const Notification = ({ parent, date }: { parent: string; date: string }) => {
  return (
    <div className="p-3 bg-white rounded-2xl flex flex-row items-center justify-between my-3 text-sm gap-5 border border-yellow">
      <div>
        <p>
          About: <span className="font-medium text-perfBlue">{parent}</span>
        </p>
        <p>
          <AppIcons className="w-5 inline" icon="CalendarDaysIcon:outline" />
          {"  "}
          {date}
        </p>
      </div>
      <button className="border border-yellow text-white bg-orange px-8 py-1 rounded-full">
        Report
      </button>
    </div>
  );
};

export default NotifyParent;
