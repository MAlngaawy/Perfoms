import React from "react";
import { Avatar, Indicator, Divider, Menu, Text } from "@mantine/core";
import Notification from "~/@main/components/Notification";
import AppIcons from "~/@main/core/AppIcons";
import { Link } from "react-router-dom";
import useWindowSize from "~/@main/hooks/useWindowSize";

type Props = {};

const Notifications = (props: Props) => {
  const windowSize = useWindowSize();

  const haveNotificaton = true;
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar
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

      <Menu.Dropdown className="w-96 max-w-full">
        <h2 className="m-2 text-perfLightBlack text-sm">Notifications</h2>
        <Divider />
        <Menu.Label className="p-0">
          <Notification
            created_at="11/11/2022"
            newNotification
            notification_type="Certificate"
            senderAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoOhc4kExw8ulBPs32AELYOeYR5dgJjUd6Ug&usqp=CAU"
            senderName="Ali Mohammed"
          />
        </Menu.Label>
        <Menu.Label className="p-0">
          <Notification
            created_at="11/12/2022"
            notification_type="Certificate"
            senderAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoOhc4kExw8ulBPs32AELYOeYR5dgJjUd6Ug&usqp=CAU"
            senderName="Ali Mohammed"
          />
        </Menu.Label>
        <Link
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
