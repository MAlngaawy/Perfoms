import React from "react";
import { Avatar, Indicator, Divider, Grid, Menu, Text } from "@mantine/core";
import Notification from "~/@main/components/Notification";
import AppIcons from "~/@main/core/AppIcons";

type Props = {};

const Notifications = (props: Props) => {
  const haveNotificaton = true;
  return (
    <Menu trigger="hover" shadow="md" width={200}>
      <Menu.Target>
        <Avatar className="cursor-pointer" radius="xl">
          <Indicator
            sx={{
              ".mantine-Indicator-indicator": {
                marginLeft: 2,
                marginTop: 2,
              },
            }}
            color="red"
            position="top-start"
            size={12}
            withBorder
            disabled={!haveNotificaton}
          >
            <AppIcons className="w-5 h-5 text-black" icon="BellIcon:outline" />
          </Indicator>
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown className="w-full sm:w-96">
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
      </Menu.Dropdown>
    </Menu>
  );
};

export default Notifications;