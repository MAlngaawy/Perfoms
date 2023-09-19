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

const NotificationsPage = (props: Props) => {
  const { data: notifications } = useNotificationsQuery({});
  const [selectedPlayerName, setSelectedPlayerName] = useState("");
  const selectedPlayer: Player = useSelector(selectedPlayerFn);

  useEffect(() => {
    setSelectedPlayerName(selectedPlayer?.name);
  }, [selectedPlayer]);

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
      {notifications?.results
        .filter((not: any) => {
          return not?.player === selectedPlayerName;
        })
        .map((oneNot) => (
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
        ))}
    </div>
  );
};

export default NotificationsPage;
