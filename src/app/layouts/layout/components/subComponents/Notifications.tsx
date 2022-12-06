import React, { useState } from "react";
import { Avatar, Indicator, Divider, Menu, Text } from "@mantine/core";
import Notification from "~/@main/components/Notification";
import AppIcons from "~/@main/core/AppIcons";
import { Link } from "react-router-dom";
import useWindowSize from "~/@main/hooks/useWindowSize";
import { useNotificationsQuery } from "~/app/store/user/userApi";

type Props = {};

const formatDate = (date: Date | null) => {
  if (date) {
    const today = date;
    const yyyy = today.getFullYear();
    let mm: string | number = today.getMonth() + 1; // Months start at 0!
    let dd: string | number = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return yyyy + "-" + mm + "-" + dd;
  } else {
    return "NA";
  }
};

const Notifications = (props: Props) => {
  const windowSize = useWindowSize();
  const [opened, setOpened] = useState(false);
  const { data: notifications } = useNotificationsQuery({});

  console.log("notifications", notifications);

  const haveNotificaton = true;
  return (
    <Menu opened={opened} onChange={setOpened} shadow="md" width={200}>
      <Menu.Target>
        <Avatar
          onClick={() => setOpened(true)}
          className="cursor-pointer"
          radius="xl"
          size={windowSize.width && windowSize.width < 400 ? "sm" : "md"}
        >
          <Indicator
            sx={{
              ".mantine-Indicator-indicator": {
                marginLeft: 2,
                marginTop: 2,
              },
            }}
            color="red"
            position="top-start"
            size={windowSize.width && windowSize.width < 400 ? 10 : 12}
            withBorder
            disabled={!haveNotificaton}
          >
            <AppIcons className="w-5 h-5 text-black" icon="BellIcon:outline" />
          </Indicator>
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown className="w-80 max-h-96 overflow-scroll max-w-full">
        <h2 className="m-2 text-perfLightBlack text-sm">Notifications</h2>
        <Divider />
        {notifications?.results.map((oneNot) => (
          <Menu.Label className="p-0">
            <Notification
              created_at={formatDate(new Date(oneNot.created_at))}
              newNotification
              notification_type={oneNot.notification_type}
              senderAvatar={oneNot.sender.avatar}
              senderName={
                (oneNot.sender.full_name &&
                  oneNot.sender.full_name.substring(0, 10) + "...") ||
                "Anonymos"
              }
            />
          </Menu.Label>
        ))}
        <Link
          onClick={() => setOpened(false)}
          to="notifications"
          className="flex w-full justify-center items-center p-2 hover:bg-pagesBg text-sm"
        >
          <span>All Notifications</span>
        </Link>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Notifications;
