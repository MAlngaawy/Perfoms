import { Avatar, Modal } from "@mantine/core";
import React, { useState } from "react";
import CustomBreadCrumbs from "~/@main/components/BreadCrumbs";
import Info from "~/@main/components/Info";
import SharedBreadCrumbs from "~/@main/components/shared/SharedBreadCrumbs";
import AppIcons from "~/@main/core/AppIcons";
import { useUserQuery } from "~/app/store/user/userApi";
import EditForm from "../profile/components/EditForm";

type Props = {};

const AdminProfile = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const { data: user, refetch } = useUserQuery({});

  return (
    <>
      <div className="self-start">
        <CustomBreadCrumbs items={[{ href: "/admin", title: "Home" }]} />
      </div>
      <div className="flex justify-center">
        <div className="content relative bg-white my-10 p-10 rounded-xl flex flex-col justify-center items-center">
          <Modal
            title={`Edit Profile`}
            opened={opened}
            onClose={() => setOpened(false)}
          >
            <EditForm setOpened={setOpened} />
          </Modal>
          <div
            className="edit absolute right-5 top-5"
            onClick={() => setOpened(true)}
          >
            <AppIcons
              icon="PencilIcon:solid"
              className="text-black w-4 h-4 cursor-pointer transform hover:scale-105"
            />
          </div>
          <div className="my-6">
            <Avatar src={user?.avatar} size={200} radius="md" />
          </div>
          <h2 className="">{user?.first_name + " " + user?.last_name}</h2>

          <Info center label="Phone Number" value={user?.mobile} />
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
