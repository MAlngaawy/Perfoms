import React, { useState, useEffect } from "react";
import { Avatar, Indicator, Divider, Menu, Text } from "@mantine/core";
import Notification from "~/@main/components/Notification";
import AppIcons from "~/@main/core/AppIcons";
import { Link } from "react-router-dom";
import useWindowSize from "~/@main/hooks/useWindowSize";
import {
  useNotificationsQuery,
  useReadNotificationsQuery,
} from "~/app/store/user/userApi";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { useSelector } from "react-redux";
import { Player } from "~/app/store/types/parent-types";
import AppUtils from "~/@main/utils/AppUtils";

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
  const [selectedPlayerName, setSelectedPlayerName] = useState("");
  const windowSize = useWindowSize();
  const [opened, setOpened] = useState(false);
  const { data: notifications, refetch: refetchNotifications } =
    useNotificationsQuery({});
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const { refetch } = useReadNotificationsQuery({});

  useEffect(() => {
    setSelectedPlayerName(selectedPlayer?.name);
  }, [selectedPlayer]);

  const readNotificationsFun = () => {
    refetch();
    refetchNotifications();
  };
  return (
    <Menu
      opened={opened}
      trigger="click"
      onChange={setOpened}
      shadow="md"
      width={200}
    >
      <Menu.Target>
        <Avatar
          onClick={() => {
            setOpened(true);
            readNotificationsFun();
          }}
          className="cursor-pointer overflow-visible"
          radius="xl"
          size={windowSize.width && windowSize.width < 400 ? "sm" : "md"}
        >
          <Indicator
            label={notifications?.unread_count}
            sx={{
              ".mantine-Indicator-indicator": {
                marginLeft: 2,
                marginTop: 2,
                fontSize: 10,
              },
            }}
            color="red"
            position="top-start"
            size={windowSize.width && windowSize.width < 400 ? 20 : 20}
            disabled={!notifications?.unread_count}
          >
            <AppIcons className="w-5 h-5 text-black" icon="BellIcon:outline" />
          </Indicator>
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown className="w-80 max-h-96 overflow-scroll max-w-full">
        <h2 className="m-2 text-perfLightBlack text-sm">Notifications</h2>
        <Divider />
        {notifications?.results
          .filter((not: any) => {
            return not?.player === selectedPlayerName;
          })
          .slice(-5)
          .map((oneNot) => (
            <Menu.Label
              key={oneNot.id}
              onClick={() => setOpened(false)}
              className="p-0"
            >
              <Notification
                created_at={
                  AppUtils.formatDate(new Date(oneNot.created_at)) || "N/A"
                }
                newNotification
                notification_type={oneNot.notification_type}
                senderAvatar={oneNot.sender.avatar}
                message={oneNot.message}
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
