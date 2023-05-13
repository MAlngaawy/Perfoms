import React from "react";
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

  const { data: players } = useAdminPlayersQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );
  const { data: coaches } = useAdminCoachesQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );
  const { data: supervisors } = useAdminSupervisorsQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );
  const { data: subCoaches } = useAdminSubCoachQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );

  return (
    <div className="flex flex-col gap-6  pt-6 mb-10">
      <UsersCard type="Coach" data={coaches?.results} />
      {subCoaches && (
        <UsersCard type="Attendance Moderator" data={subCoaches?.results} />
      )}
      <UsersCard type="Supervisor" data={supervisors?.results} />
      <UsersCard type="Player" data={players?.results} />
    </div>
  );
};

export default Users;
