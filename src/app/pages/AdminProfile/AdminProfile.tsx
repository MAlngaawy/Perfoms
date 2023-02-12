import { Avatar } from "@mantine/core";
import React from "react";
import CustomBreadCrumbs from "~/@main/components/BreadCrumbs";
import Info from "~/@main/components/Info";
import SharedBreadCrumbs from "~/@main/components/shared/SharedBreadCrumbs";
import AppIcons from "~/@main/core/AppIcons";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {};

const AdminProfile = (props: Props) => {
  const { data: user } = useUserQuery({});

  return (
    <div className="flex relative justify-center items-center">
      <div className="absolute left-4 top-4">
        <CustomBreadCrumbs items={[{ href: "/admin", title: "Home" }]} />
      </div>
      <div className="content relative bg-white my-10 p-10 rounded-xl flex flex-col justify-center items-center">
        <div className="edit absolute right-5 top-5">
          <AppIcons
            icon="PencilIcon:solid"
            className="text-black w-4 h-4 cursor-pointer transform hover:scale-105"
          />
        </div>
        <div className="my-6">
          <Avatar src={user?.avatar} size={200} radius="md" />
        </div>
        <h2 className="">{user?.name}</h2>

        <Info center label="Phone Number" value={user?.mobile} />
      </div>
    </div>
  );
};

export default AdminProfile;
