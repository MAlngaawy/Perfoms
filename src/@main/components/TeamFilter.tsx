import React, { useEffect, useState } from "react";
import AppIcons from "~/@main/core/AppIcons";
import { Menu } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedPlayerFn,
  selectedPlayerTeamFn,
  selectPlayerTeam,
} from "~/app/store/parent/parentSlice";
import { usePlayerTeamsQuery } from "~/app/store/parent/parentApi";
import { Team } from "~/app/store/types/supervisor-types";

type Props = {};

const TeamFilter = (props: Props) => {
  const dispatch = useDispatch();
  const selectedPlayer = useSelector(selectedPlayerFn);
  const { data: playerTeams } = usePlayerTeamsQuery(
    { id: selectedPlayer?.id },
    { skip: !selectedPlayer }
  );
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  useEffect(() => {
    if (playerTeams)
      dispatch(
        selectPlayerTeam(
          localStorage.getItem("SelectedPlayerTeam")
            ? JSON.parse(localStorage.getItem("SelectedPlayerTeam") || "")
            : {
                id: playerTeams.results[0].id,
                name: playerTeams.results[0].name,
              }
        )
      );
  }, [playerTeams]);

  return (
    <Menu trigger="hover" shadow="md" width={200}>
      <Menu.Target>
        <button className="flex gap-2 text-sm justify-center items-center  py-2 xs:px-6 rounded-3xl ">
          <span>{selectedPlayerTeam?.name}</span>
          <AppIcons className="inline w-3 h-3" icon="ChevronDownIcon:outline" />
        </button>
      </Menu.Target>
      <Menu.Dropdown>
        {playerTeams &&
          playerTeams.results.map((value) => (
            <Menu.Item
              key={value.id}
              onClick={() =>
                dispatch(selectPlayerTeam({ id: value.id, name: value.name }))
              }
            >
              {value.name}
            </Menu.Item>
          ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default TeamFilter;
