import React, { useEffect, useState } from "react";
import { Menu, Button, Text, Avatar } from "@mantine/core";
import { useMyPlayersQuery } from "~/app/store/parent/parentApi";
import { Player } from "~/app/store/types/parent-types";
import { useDispatch, useSelector } from "react-redux";
import { selectedPlayerFn, selectPlayer } from "~/app/store/parent/parentSlice";
import SelectPlayer from "./SelectPlayer";

type Props = {};

const SelectUser = (props: Props) => {
  const { data: players, isLoading } = useMyPlayersQuery({});
  const dispatch = useDispatch();
  //save selected player in a state -- it wil change to be a global state or context
  const selectedPlayer = useSelector(selectedPlayerFn);

  useEffect(() => {
    if (players) dispatch(selectPlayer(players?.data?.[0]));
  }, [players]);

  return (
    <div className="flex gap-1 mx-2">
      {/* <Menu shadow="md" width={200}> */}
      {/* <Menu.Target>
          {selectedPlayer ? (
            <button className="flex border py-1 px-2 xs:px-4 rounded-full justify-center items-center gap-2">
              {selectedPlayer.icon ? (
                <Avatar size={"sm"} radius={"xl"} src={selectedPlayer.icon} />
              ) : (
                <Avatar size={"sm"} radius={"xl"} src={"/assets/avatar.webp"} />
              )}
              <p className="text-xs sm:text-lg">
                {selectedPlayer.name.substring(0, 8)}..
              </p>
            </button>
          ) : isLoading ? (
            <button className="flex border py-1 px-2 xs:px-4 rounded-full justify-center items-center gap-2">
              <p className="text-xs sm:text-lg">Loading ...</p>
            </button>
          ) : (
            <button className="flex border py-1 px-2 xs:px-4 rounded-full justify-center items-center gap-2">
              <p className="text-xs sm:text-lg">No Players...</p>
            </button>
          )}
        </Menu.Target> */}

      {/* <Menu.Dropdown> */}
      {players &&
        players.data.map((player, idx) => (
          <SelectPlayer
            name={player.name}
            image={player.icon}
            key={idx}
            selected={player === selectedPlayer}
            selectFun={() => dispatch(selectPlayer(player))}
          />
          // <Menu.Item
          //   key={idx}
          //   onClick={() => dispatch(selectPlayer(player))}
          //   icon={<Avatar size={"sm"} radius={"xl"} src={player.icon} />}
          // >
          //   <p className="text-xs sm:text-lg">{player.name}</p>
          // </Menu.Item>
        ))}
      {/* </Menu.Dropdown> */}
      {/* </Menu> */}
    </div>
  );
};

export default SelectUser;
