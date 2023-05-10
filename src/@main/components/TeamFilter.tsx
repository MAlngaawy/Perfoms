import React, { useEffect, useState } from "react";
import AppIcons from "~/@main/core/AppIcons";
import { Menu } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedPlayerFn,
  selectedPlayerTeamFn,
  selectPlayerTeam,
} from "~/app/store/parent/parentSlice";
import {
  usePlayerTeamsQuery,
  useTeamEventsQuery,
} from "~/app/store/parent/parentApi";
import {
  useCoachTeamEventQuery,
  useMyTeamsQuery,
} from "~/app/store/coach/coachApi";
import { PlayerTeams } from "~/app/store/types/parent-types";
import { useGetPlayerTeamsQuery, useUserQuery } from "~/app/store/user/userApi";
import {
  useSuperTeamsQuery,
  useSuprtEventsQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import { Team } from "~/app/store/types/supervisor-types";
import { useAdminTeamsQuery } from "~/app/store/clubManager/clubManagerApi";

type Props = {
  adminSportId?: string;
  player_id?: string;
};

const TeamFilter = ({ adminSportId, player_id }: Props) => {
  const { data: user } = useUserQuery(null);
  const [teams, setTeams] = useState<Team[]>();
  const dispatch = useDispatch();
  const selectedPlayer = useSelector(selectedPlayerFn);

  const { data: userGetPlayerTeams } = useGetPlayerTeamsQuery(
    { player_id },
    { skip: !player_id }
  );

  let { data: playerTeams } = usePlayerTeamsQuery(
    { id: selectedPlayer?.id },
    { skip: !selectedPlayer || user?.user_type !== "Parent" }
  );
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  const { data: coachTeams } = useMyTeamsQuery(
    {},
    //@ts-ignore
    { skip: !["Coach", "SubCoach"].includes(user?.user_type) }
  );

  const { data: superTeams } = useSuperTeamsQuery(
    {},
    { skip: user?.user_type !== "Supervisor" }
  );

  const { data: adminTeams } = useAdminTeamsQuery(
    { club_id: user?.club, sport_id: adminSportId ? +adminSportId : 0 },
    { skip: user?.user_type !== "Admin" || !user?.club }
  );

  useEffect(() => {
    if (!player_id) {
      if (superTeams) setTeams(superTeams.results);
      if (coachTeams) setTeams(coachTeams.results);
      if (playerTeams) setTeams(playerTeams.results);
      if (adminTeams) setTeams(adminTeams.results);
    }

    if (player_id) {
      console.log("userGetPlayerTeams", userGetPlayerTeams);
      //@ts-ignore
      setTeams(userGetPlayerTeams?.results);
    }

    if (teams) {
      dispatch(selectPlayerTeam(teams[0]));
    }
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
  }, [playerTeams, superTeams, coachTeams, adminTeams, teams]);

  return (
    <Menu shadow="md" width={user?.user_type === "Admin" ? 300 : 200}>
      <Menu.Target>
        <button className="flex gap-2 text-sm justify-center items-center  py-2 px-6 rounded-3xl border bg-white ">
          <span> Team {selectedPlayerTeam?.name}</span>
          <AppIcons className="inline w-3 h-3" icon="ChevronDownIcon:outline" />
        </button>
      </Menu.Target>
      <Menu.Dropdown>
        {teams &&
          teams.map((value) => (
            <Menu.Item
              key={value.id}
              onClick={() =>
                dispatch(
                  selectPlayerTeam({
                    id: value.id,
                    name: value.name,
                  })
                )
              }
            >
              {user?.user_type === "Admin"
                ? value.sport + " - " + value.name
                : value.name}
            </Menu.Item>
          ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default TeamFilter;
