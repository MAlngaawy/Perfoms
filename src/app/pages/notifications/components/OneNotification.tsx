import React from "react";
import cn from "classnames";
import AppIcons from "../../../../@main/core/AppIcons";
import { NavigationType } from "react-router-dom";

type Props = {
  notification_type: "Report" | "Certificate" | "Complement" | "Permission";
  senderName: string;
  message?: string;
  created_at: string;
  newNotification?: boolean;
  senderAvatar: string;
  name?: string;
  content?: string;
  date?: string;
  image?: string;
};
const OneNotification = ({
  notification_type,
  senderName,
  message,
  created_at,
  newNotification,
  senderAvatar,
}: Props) => {
  return (
    <div
      className={cn(
        "w-full rounded-3xl md:rounded-full p-1 flex flex-col sm:flex-row justify-start items-center gap-2 md:gap-10 shadow-md",
        {
          "border border-perfSecondary bg-white": newNotification,
          "bg-perfLigtGray border border-transparent ": !newNotification,
        }
      )}
    >
      <div className="flex gap-4 w-full sm:w-2/3">
        <div className=" self-center min-w-max avatar p-1">
          <img
            className="w-10 h-10 md:w-16 md:h-16 object-cover rounded-full"
            src={senderAvatar}
            alt="sender_mage"
          />
        </div>
        <div className="info flex flex-col gap-1">
          <h2 className=" text-perfGray1 text-base md:text-xl font-bold">
            {senderName}
          </h2>
          <p className=" text-perfGray3 text-sm font-medium">{message}</p>
          <p className=" text-perfGray4 text-xs font-medium flex gap-1">
            <AppIcons className="w-3 h-3" icon="ClockIcon:outline" />{" "}
            <span>{created_at}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center my-2 sm:my-auto justify-around w-full sm:w-1/3">
        <div
          className={cn(
            "type py-2 px-4 md:px-8 rounded-full text-sm md:text-lg font-semibold text-white ",
            {
              " bg-perfBlue": notification_type === "Certificate",
              " bg-red": notification_type === "Permission",
              " bg-orange":
                notification_type !== "Permission" &&
                notification_type !== "Certificate",
            }
          )}
        >
          {notification_type}
        </div>
        {/* <div className="vewMore">
          <button className="bg-none text-perfBlue p-0 hover:text-blue-800">
            View more
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default OneNotification;
