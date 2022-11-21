import React from "react";
import TableHeader from "~/@main/components/TableHeader";
import AppIcons from "~/@main/core/AppIcons";

const dummyData = [
  {
    technicName: "Punching",
    technicallity: "Left Leg",
  },
  {
    technicName: "Punching",
    technicallity: "Left Leg",
  },
  {
    technicName: "Punching",
    technicallity: "Left Leg",
  },
  {
    technicName: "Punching",
    technicallity: "Left Leg",
  },
  {
    technicName: "Punching",
    technicallity: "Left Leg",
  },
];

const Performance = () => {
  return (
    <div className="p-6 m-1 md:m-3 h-full bg-white rounded-3xl">
      <h1>Performance</h1>
      <div className="flex flex-row justify-between items-center md:items-start gap-10">
        <div className="w-1/4">
          <TableHeader name="Technic" value="Rate" />
          {dummyData.map((data, index) => {
            return <Technic technicName="Punching" technicallity="Left Leg" />;
          })}
        </div>
        <div className="w-1/4">
          <TableHeader name="Technic" value="Rate" />
          {dummyData.map((data, index) => {
            return <Technic technicName="Punching" technicallity="Left Leg" />;
          })}
        </div>
        <div className="w-1/4">
          <TableHeader name="Technic" value="Rate" />
          {dummyData.map((data, index) => {
            return (
              <Technic
                technicName={data.technicName}
                technicallity={data.technicallity}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface TechnicProps {
  technicName: string;
  technicallity: string;
}

const Technic = ({ technicName, technicallity }: TechnicProps) => {
  return (
    <div>
      <h1 className="text-small font-medium py-2">
        <AppIcons
          className="pr-2 w-6 inline bg-perfLigtGray"
          icon="HandRaisedIcon:outline"
        />
        {technicName}
        <AppIcons className="pl-2 w-5 inline" icon="ChevronDownIcon:outline" />
      </h1>
      <div className="flex flex-row px-3 pb-2 justify-between">
        <p className="text-small">
          <AppIcons className="pr-2 w-5 inline" icon="FireIcon:outline" />
          {technicallity}
        </p>
        <div className="flex flex-row gap-1">
          {["1", "2", "3", "4", "5"].map((rate, index) => {
            return (
              <span
                key={index}
                className="px-2 py-1 bg-perfLigtGray font-medium text-black rounded-sm"
              >
                {rate}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row px-3 justify-between">
        <p className="text-small">
          <AppIcons className="pr-2 w-5 inline" icon="FireIcon:outline" />
          {technicallity}
        </p>
        <div className="flex flex-row gap-1">
          {["1", "2", "3", "4", "5"].map((rate, index) => {
            return (
              <span
                key={index}
                className="px-2 py-1 bg-perfLigtGray font-medium text-black rounded-sm"
              >
                {rate}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Performance;
