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
  const selectedPlayer = useSelector(selectedPlayerFn);

  useEffect(() => {
    if (players)
      dispatch(
        selectPlayer(
          localStorage.getItem("SelectedPlayer")
            ? JSON.parse(localStorage.getItem("SelectedPlayer") || "")
            : players?.results?.[0]
        )
      );
  }, [players]);

  return (
    <div className="flex gap-1 mx-2">
      {players &&
        players.results?.map((player, idx) => (
          <SelectPlayer
            name={player.name}
            image={player.icon}
            key={idx}
            selected={player?.id === selectedPlayer?.id}
            selectFun={() => dispatch(selectPlayer(player))}
          />
        ))}
    </div>
  );
};

export default SelectUser;
