import React, { useState } from "react";
import { selectedPlayerTeamFn } from "../../store/parent/parentSlice";
import { useSelector } from "react-redux";
import { useGetTeamPlayersQuery } from "~/app/store/coach/coachApi";
import TeamFilter from "~/@main/components/TeamFilter";
import CustomBreadCrumbs from "~/@main/components/BreadCrumbs";
import TeamPlayers, {
  SinglePlayer,
} from "../SubPages/SingleTeam/Components/TeamPlayers";
import Placeholders from "~/@main/components/Placeholders";
import { Grid } from "@mantine/core";

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
      <div className="m-2">
        <div className="flex justify-end">
          {/* <CustomBreadCrumbs items={[{ title: "Players", href: "" }]} /> */}
          <TeamFilter />
        </div>
      </div>
      <div className="players-page bg-white p-2 rounded-3xl m-2">
        <p className="pb-2">Players</p>
        <div className="flex flex-wrap">
          <div className="flex flex-wrap items-center gap-2 xs:gap-4  mt-4">
            {coahcTeamPlayers &&
              coahcTeamPlayers?.results.map((player) => {
                return (
                  <div className=" ">
                    <SinglePlayer
                      key={player.id}
                      id={player.id}
                      image={player.icon}
                      name={player.name}
                    />
                  </div>
                );
              })}
          </div>
          <>
            {!coahcTeamPlayers?.results.length && (
              <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                <img
                  className="md:w-72 md:my-5"
                  src="/assets/images/noteams.png"
                  alt="no teams"
                />
                <p>This team has no players yet</p>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default PlayersPage;
