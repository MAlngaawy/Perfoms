import React, { useEffect, useState } from "react";
import { useUserQuery } from "~/app/store/user/userApi";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedPlayerFn,
  selectedPlayerTeamFn,
  selectPlayerTeam,
} from "~/app/store/parent/parentSlice";
import { usePlayerTeamsQuery } from "~/app/store/parent/parentApi";
import { useMyTeamsQuery } from "~/app/store/coach/coachApi";
import { useSuperTeamsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { Avatar, Breadcrumbs } from "@mantine/core";
import { Teams } from "~/app/store/types/clubManager-types";
import { Link, useNavigate } from "react-router-dom";
import MediaPageLoading from "~/app/pages/media/molecules/MediaPageLoading";

type Props = {};

const NoTeamComp = (props: Props) => {
  const { data: user } = useUserQuery(null);
  const [teams, setTeams] = useState<Teams>();
  const dispatch = useDispatch();
  const selectedPlayer = useSelector(selectedPlayerFn);
  const navigate = useNavigate();

  let { data: playerTeams } = usePlayerTeamsQuery(
    { id: selectedPlayer?.id },
    { skip: !selectedPlayer || user?.user_type !== "Parent" }
  );
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  const { data: coachTeams } = useMyTeamsQuery(
    {},
    { skip: user?.user_type !== "Coach" }
  );

  const { data: superTeams } = useSuperTeamsQuery(
    {},
    { skip: user?.user_type !== "Supervisor" }
  );

  useEffect(() => {
    if (superTeams) setTeams(superTeams);
    if (coachTeams) setTeams(coachTeams);
    if (playerTeams) setTeams(playerTeams);

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
  }, [playerTeams, superTeams, coachTeams]);

  return (
    <div className="container w-11/12 mx-auto">
      <div className="admin-teams flex flex-col xs:flex-row flex-wrap justify-center xs:justify-start items-center xs:items-stretch gap-6">
        {teams ? (
          teams.results?.map((team) => {
            return (
              <div
                key={team.id}
                className="team-card relative w-52 bg-white p-8 rounded-xl flex flex-col justify-center items-center gap-4"
              >
                <div
                  onClick={() => {
                    dispatch(
                      selectPlayerTeam({ id: team.id, name: team.name })
                    );
                  }}
                  className="bg-pagesBg cursor-pointer rounded-full w-20 h-20 flex justify-center items-center"
                >
                  <Avatar size={"lg"} src={team.icon_url} alt="icon" />
                </div>

                <h2 className="text-xl font-semibold text-perfGray1">
                  {team.name}
                </h2>
                <h3 className="text-sm text-perfBlue">{team.sport}</h3>
              </div>
            );
          })
        ) : (
          <div className="w-full">
            <MediaPageLoading />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoTeamComp;
