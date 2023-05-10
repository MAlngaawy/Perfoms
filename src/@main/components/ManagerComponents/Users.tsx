import React, { useState } from "react";
import {
  useAdminCoachesQuery,
  useAdminPlayersQuery,
  useAdminSubCoachQuery,
  useAdminSupervisorsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import UsersCard from "./SubComponents/UsersCard";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {};

const Users = (props: Props) => {
  const { data: user } = useUserQuery({});

  // Search Keyword Status
  const [playerSearch, setPlayerSearch] = useState<string>();
  const [coachSearch, setCoachSearch] = useState<string>();
  const [subCoachSearch, setSubCoachSearch] = useState<string>();
  const [superSearch, setSuperSearch] = useState<string>();

  // Pagenation
  const [playersPage, setPlayersPage] = useState<number>();
  const [coachesPage, setCoachesPage] = useState<number>();
  const [subCoachesPage, setSubCoachesPage] = useState<number>();
  const [superUsersPage, setSuperUsersPage] = useState<number>();

  // Sport Keyword Status
  const [playerSport, setPlayerSport] = useState<string>();
  const [coachSport, setCoachSport] = useState<string>();
  const [subCoachSport, setSubCoachSport] = useState<string>();
  const [superSport, setSuperSport] = useState<string>();

  const { data: players, isLoading: playerLoading } = useAdminPlayersQuery(
    {
      club_id: user?.club,
      search: playerSearch,
      sport: playerSport !== "0" ? playerSport : undefined,
      page: playersPage,
    },
    { skip: !user?.club }
  );

  const { data: coaches, isLoading: coachLoading } = useAdminCoachesQuery(
    {
      club_id: user?.club,
      search: coachSearch,
      sport: coachSport,
      page: coachesPage,
    },
    { skip: !user?.club }
  );

  const { data: supervisors, isLoading: superLoading } =
    useAdminSupervisorsQuery(
      {
        club_id: user?.club,
        search: superSearch,
        sport: superSport,
        page: superUsersPage,
      },
      { skip: !user?.club }
    );

  const { data: subCoaches, isLoading: subCoachLoading } =
    useAdminSubCoachQuery(
      {
        club_id: user?.club,
        search: subCoachSearch,
        sport: subCoachSport,
        page: subCoachesPage,
      },
      { skip: !user?.club }
    );
  console.log("players", players?.pages_count);

  return (
    <div className="flex flex-col gap-6  pt-6 mb-10">
      <UsersCard
        setUserSearch={setCoachSearch}
        type="Coach"
        data={coaches?.results}
        pageCount={coaches?.pages_count}
        setPage={setCoachesPage}
        fetching={coachLoading}
        setSport={setCoachSport}
        sport={coachSport}
      />
      {subCoaches && (
        <UsersCard
          setUserSearch={setSubCoachSearch}
          type="Attendance Moderator"
          data={subCoaches?.results}
          pageCount={subCoaches?.pages_count}
          setPage={setSubCoachesPage}
          fetching={subCoachLoading}
          setSport={setSubCoachSport}
          sport={subCoachSport}
        />
      )}
      <UsersCard
        setUserSearch={setSuperSearch}
        type="Supervisor"
        data={supervisors?.results}
        pageCount={supervisors?.pages_count}
        setPage={setSuperUsersPage}
        fetching={superLoading}
        setSport={setSuperSport}
        sport={superSport}
      />
      <UsersCard
        type="Player"
        setUserSearch={setPlayerSearch}
        data={players?.results}
        pageCount={players?.pages_count}
        setPage={setPlayersPage}
        fetching={playerLoading}
        setSport={setPlayerSport}
        sport={playerSport}
      />
    </div>
  );
};

export default Users;
