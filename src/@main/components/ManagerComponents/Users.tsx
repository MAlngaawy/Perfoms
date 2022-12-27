import React from "react";
import {
  useAdminCoachesQuery,
  useAdminPlayersQuery,
  useAdminSupervisorsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import UsersCard from "./SubComponents/UsersCard";

type Props = {};

const Users = (props: Props) => {
  const { data: players } = useAdminPlayersQuery({});
  const { data: coaches } = useAdminCoachesQuery({});
  const { data: supervisors } = useAdminSupervisorsQuery({});

  return (
    <div className="flex flex-col gap-6  p-2 sm:p-6 mb-10">
      <UsersCard type="Coach" data={coaches?.results} />
      <UsersCard type="Supervisor" data={supervisors?.results} />
      <UsersCard type="Player" data={players?.results} />
    </div>
  );
};

export default Users;
