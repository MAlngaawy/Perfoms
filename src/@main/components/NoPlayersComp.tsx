import React from "react";
import { Avatar } from "@mantine/core";
import AddPlayer from "../../app/pages/home/molecules/AddPlayer";

type Props = {};

const NoPlayersComp = (props: Props) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-white rounded-xl flex flex-col gap-6 text-center p-8">
        <Avatar
          size={"xl"}
          className="mx-auto"
          src="/assets/images/noplayer.png"
          alt="icon"
        />
        <h2 className="text-4xl text-perfBlue">Welcome on board</h2>
        <p className=" text-lg font-bold text-gray-300">
          Its about time to make a great player.
        </p>
        <div className="flex justify-center items-center">
          <AddPlayer />
        </div>
      </div>
    </div>
  );
};

export default NoPlayersComp;
