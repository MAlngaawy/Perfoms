import { Avatar } from "@mantine/core";
import React from "react";
import AppIcons from "~/@main/core/AppIcons";

type Props = {};

const Experiences = (props: Props) => {
  return (
    <div className="bg-white rounded-3xl p-6 min-h-full">
      <div className="title flex items-center gap-2">
        <Avatar src={"/assets/images/Leagues.png"} />
        <h2 className="font-medium">Leagues</h2>
      </div>
      <div className="leagues flex flex-wrap gap-8 justify-center my-6">
        <OneLeague />
        <OneLeague />
        <OneLeague />
        <OneLeague />
        <OneLeague />
        <OneLeague />
      </div>
      <TitleWithIcon name={"Courses"} />
    </div>
  );
};

// from and to

const OneLeague = ({ from, to, name }: any) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="date">
        <span className="text-xs text-perfGray3">15/10/208 - 14/6/20010</span>
        <h2 className="text-md">Egyptian League</h2>
      </div>
    </div>
  );
};

const TitleWithIcon = ({ name }: { name: string }) => {
  return (
    <div className="flex gap-2 items-center mb-6">
      <div className="icon bg-perfBlue p-1 rounded-full">
        <AppIcons className="w-5 h-5 text-white" icon="BriefcaseIcon:solid" />
        {/* <AppIcons icon="Briefcase:solid" /> */}
      </div>
      <div className="title">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default Experiences;
