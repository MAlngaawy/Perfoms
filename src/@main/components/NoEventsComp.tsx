import { Avatar } from "@mantine/core";
import React from "react";
import AppIcons from "../core/AppIcons";

type Props = {};

const NoEventsComp = (props: Props) => {
  return (
    <div className="bg-perfOfWhite p-10 my-10 h-60 text-center font-semibold text-3xl w-full rounded-xl text-perfGray3 flex flex-col justify-center items-center">
      <AppIcons className="w-32 " icon="FolderOpenIcon:outline" />
      <h2>No Events Here Yet</h2>
    </div>
  );
};

export default NoEventsComp;
