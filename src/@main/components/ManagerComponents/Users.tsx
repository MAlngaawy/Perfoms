import React, { useState } from "react";
import {
  useAdminClubParentsQuery,
  useAdminCoachesQuery,
  useAdminParentsQuery,
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
  const [parentSearch, setParentSearch] = useState<string>();

  // Pagenation
  const [playersPage, setPlayersPage] = useState<number>();
  const [coachesPage, setCoachesPage] = useState<number>();
  const [subCoachesPage, setSubCoachesPage] = useState<number>();
  const [superUsersPage, setSuperUsersPage] = useState<number>();
  const [parentUsersPage, setParentUsersPage] = useState<number>();

  // Sport Keyword Status
  const [playerSport, setPlayerSport] = useState<string>();
  const [coachSport, setCoachSport] = useState<string>();
  const [subCoachSport, setSubCoachSport] = useState<string>();
  const [superSport, setSuperSport] = useState<string>();
  const [parentSport, setParentSport] = useState<string>();

  const { data: players, isFetching: playerLoading } = useAdminPlayersQuery(
    {
      club_id: user?.club,
      search: playerSearch,
      sport: playerSport !== "0" ? playerSport : undefined,
      page: playersPage,
    },
    { skip: !user?.club }
  );

  const { data: coaches, isFetching: coachLoading } = useAdminCoachesQuery(
    {
      club_id: user?.club,
      search: coachSearch,
      sport: coachSport,
      page: coachesPage,
    },
    { skip: !user?.club }
  );

  const { data: supervisors, isFetching: superLoading } =
    useAdminSupervisorsQuery(
      {
        club_id: user?.club,
        search: superSearch,
        sport: superSport,
        page: superUsersPage,
      },
      { skip: !user?.club }
    );

  const { data: subCoaches, isFetching: subCoachLoading } =
    useAdminSubCoachQuery(
      {
        club_id: user?.club,
        search: subCoachSearch,
        sport: subCoachSport,
        page: subCoachesPage,
      },
      { skip: !user?.club }
    );

  const { data: parents, isFetching: parentLoading } = useAdminParentsQuery(
    {
      club_id: user?.club,
      search: parentSearch,
      sport: parentSport,
      page: parentUsersPage,
    },
    { skip: !user?.club }
  );

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
        count={coaches?.count}
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
          count={subCoaches?.count}
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
        count={supervisors?.count}
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
        count={players?.count}
      />
      <UsersCard
        type="Parent"
        setUserSearch={setParentSearch}
        data={parents?.results}
        pageCount={parents?.pages_count}
        setPage={setParentUsersPage}
        fetching={parentLoading}
        setSport={setParentSport}
        sport={parentSport}
        count={parents?.count}
      />
    </div>
  );
};

export default Users;
