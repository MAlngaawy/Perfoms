import React from "react";
import OneNotification from "./components/OneNotification";
import { useNotificationsQuery } from "~/app/store/user/userApi";

type Props = {};

const data = [
  {
    type: "Permission",
    name: "Mohammed",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quo minima expedita cupiditate rem ipsam possimus ",
    date: "7/10/2022",
    newNotification: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoOhc4kExw8ulBPs32AELYOeYR5dgJjUd6Ug&usqp=CAU",
  },
  {
    type: "Certificate",
    name: "Mosatafa",
    content:
      "Lorem ipsum  Asperiores quo minima expedita cupiditate rem ipsam possimus ",
    date: "7/10/2022",
    newNotification: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoOhc4kExw8ulBPs32AELYOeYR5dgJjUd6Ug&usqp=CAU",
  },
  {
    type: "Recommendations",
    name: "Mohammed",
    content: "Asperiores quo minima expedita cupiditate rem ipsam possimus ",
    date: "7/10/2022",
    newNotification: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoOhc4kExw8ulBPs32AELYOeYR5dgJjUd6Ug&usqp=CAU",
  },
];

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

  console.log("notifications", notifications);

  return (
    <div className="p-6 flex flex-col gap-4">
      {notifications?.results.map((oneNot) => (
        <OneNotification
          created_at={formatDate(new Date(oneNot.created_at))}
          newNotification
          notification_type={oneNot.notification_type}
          senderAvatar={oneNot.sender.avatar}
          senderName={
            (oneNot.sender.full_name && oneNot.sender.full_name) || "Anonymos"
          }
        />
      ))}
    </div>
  );
};

export default NotificationsPage;
