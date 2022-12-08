import React, { useState } from "react";
import PlayerCard from "./PlayerCard/PlayerCard";
import { selectedPlayerTeamFn } from "../../store/parent/parentSlice";
import { useSelector } from "react-redux";
import { useGetTeamPlayersQuery } from "~/app/store/coach/coachApi";
import TeamFilter from "~/@main/components/TeamFilter";
import CustomBreadCrumbs from "~/@main/components/BreadCrumbs";
import TeamPlayers, {
  SinglePlayer,
} from "../SubPages/SingleTeam/Components/TeamPlayers";

interface PlayersProps {
  id: number;
  name: string;
  icon_url: string;
}

const PlayersPage = () => {
  const [selected, setSelected] = useState("1st team");

  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  const { data: coahcTeamPlayers } = useGetTeamPlayersQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );

  return (
    <>
      <div className="m-5">
        <div className="flex justify-end">
          {/* <CustomBreadCrumbs items={[{ title: "Players", href: "" }]} /> */}
          <TeamFilter />
        </div>
      </div>
      <div className="players-page bg-white p-6 rounded-3xl m-5">
        <p className="pb-2">Players</p>
        <div className="flex gap-5 flex-wrap">
          {coahcTeamPlayers?.results.map((player) => {
            return (
              <SinglePlayer
                id={player.id}
                image={player.icon}
                name={player.name}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PlayersPage;
