import { useMyPlayersQuery } from "~/app/store/parent/parentApi";

import { useUserQuery } from "~/app/store/user/userApi";
import UserInfo from "./components/UserInfo";

const ProfilePage = () => {
  const { data: user } = useUserQuery(null);
  const { data: players } = useMyPlayersQuery({});

  return (
    <div className="flex justify-center items-center py-20 md:pt-14">
      {user && players && <UserInfo players={players.results} />}
    </div>
  );
};

export default ProfilePage;
