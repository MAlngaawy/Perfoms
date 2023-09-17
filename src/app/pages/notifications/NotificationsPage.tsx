import React, { useState } from "react";
import OneNotification from "./components/OneNotification";
import { useNotificationsQuery } from "~/app/store/user/userApi";
import Placeholders from "~/@main/components/Placeholders";
import { useEffect } from "react";
import { Player } from "~/app/store/types/parent-types";
import { useSelector } from "react-redux";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {};

const NotificationsPage = (props: Props) => {
  const { data: notifications } = useNotificationsQuery({});
  const [selectedPlayerName, setSelectedPlayerName] = useState<string>("");
  const selectedPlayer: Player = useSelector(selectedPlayerFn);

  useEffect(() => {
    setSelectedPlayerName(selectedPlayer?.name);
  }, [selectedPlayer]);

  const [notificationsData, setNotificationsData] = useState<any[]>([]);

  useEffect(() => {
    if (notifications) {
      const filteredNotifications = notifications?.results.filter(
        (notifi: any) => {
          return notifi?.player?.name === selectedPlayerName;
        }
      );
      if (filteredNotifications) {
        setNotificationsData(filteredNotifications);
      }
    }
  }, [notifications, selectedPlayerName]);

  if (!notifications?.results.length) {
    return (
      <Placeholders
        img="/assets/images/nonotification.png"
        preText={"You don’t have any"}
        pageName={"Notifications"}
        postText={" here yet."}
      />
    );
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      {notificationsData.length ? (
        notificationsData.map((oneNot) => (
          <OneNotification
            key={oneNot.id}
            created_at={
              AppUtils.formatDate(new Date(oneNot.created_at)) || "N/A"
            }
            newNotification
            notification_type={oneNot.notification_type}
            senderAvatar={oneNot.sender.avatar}
            senderName={
              (oneNot.sender.full_name && oneNot.sender.full_name) || "Anonymos"
            }
            message={oneNot.message}
          />
        ))
      ) : (
        <Placeholders
          img="/assets/images/nonotification.png"
          preText={"This Player Has No"}
          pageName={"Notifications"}
          postText={" yet."}
        />
      )}
    </div>
  );
};

export default NotificationsPage;
