import React, { useState } from "react";
import { Menu, Button, Text, Avatar } from "@mantine/core";

type Props = {};

const playersData = [
  {
    name: "Mohammed",
    avatar:
      "https://media.istockphoto.com/id/685132245/photo/mature-businessman-smiling-over-white-background.jpg?s=612x612&w=0&k=20&c=OJk6U-oCZ31F3TGmarAAg2jVli8ZWTagAcF4P-kNIqA=",
  },
  {
    name: "Salma",
    avatar:
      "https://i.pinimg.com/originals/3e/2e/8c/3e2e8c6fa626636eb4e8bdfe78edab3b.jpg",
  },
];

const SelectUser = (props: Props) => {
  //save selected player in a state -- it wil change to be a global state or context
  const [selectedPlayer, setSelectedPlayer] = useState<{
    avatar: string | null;
    name: string;
  }>({ avatar: null, name: "Player" });

  return (
    <div>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <button className="flex border py-1 px-2 xs:px-4 rounded-full justify-center items-center gap-2">
            {selectedPlayer.avatar && (
              <Avatar size={"sm"} radius={"xl"} src={selectedPlayer.avatar} />
            )}
            <p className="text-xs sm:text-lg">
              {selectedPlayer.name.substring(0, 8)}..
            </p>
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          {playersData.map((player, idx) => (
            <Menu.Item
              key={idx}
              onClick={() => setSelectedPlayer(player)}
              icon={<Avatar size={"sm"} radius={"xl"} src={player.avatar} />}
            >
              <p className="text-xs sm:text-lg">{player.name}</p>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default SelectUser;
