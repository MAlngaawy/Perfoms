import { useState } from "react";

import { useUserQuery } from "~/app/store/user/userApi";
import UserInfo from "./components/UserInfo";

type Props = {
  // name: string;
  // image: string;
  // age: string;
  // job: string;
  // subscription: string;
  // players: {
  //   name: string;
  //   image: string;
  // }[];
};

const ProfilePage = (props: Props) => {
  const { data: userData } = useUserQuery(null);

  return (
    <div className="flex justify-center items-center py-20 md:pt-14">
      {userData && <UserInfo user={userData.data} />}
    </div>
  );
};

export default ProfilePage;
