import React from "react";
import OneNotification from "./components/OneNotification";

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

const NotificationsPage = (props: Props) => {
  return (
    <div className="p-6 flex flex-col gap-4">
      {data.map((oneNotification) => (
        <OneNotification {...oneNotification} />
      ))}
    </div>
  );
};

export default NotificationsPage;
