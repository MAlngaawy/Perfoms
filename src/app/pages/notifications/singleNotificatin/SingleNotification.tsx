import React from "react";
import { useLocation } from "react-router-dom";
import AppIcons from "../../../../@main/core/AppIcons";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mantine/core";
import cn from "classnames";

type Props = {};

const SingleNotification = (props: Props) => {
  const items = [{ title: "Notifications", href: "/notifications" }].map(
    (item, index) => (
      <Link to={item.href} key={index}>
        {item.title}
      </Link>
    )
  );

  const { notification_type, senderName, message, created_at, senderAvatar } =
    useLocation().state;

  const fullName = (name: string): string => {
    let fullName: string | string[] = name.split(" ");
    fullName[1] = fullName[1][0] + ".";
    fullName = fullName.join(" ");
    return fullName;
  };

  return (
    <>
      <div className="my-4 ml-3">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div
        className={cn(
          "flex flex-col gap-3 md:w-1/2 md:mx-auto bg-white border rounded-3xl mt-10 m-2 xs:px-5 xs:py-10 px-2 py-5 ",
          {
            " border-perfBlue": notification_type === "Certificate",
            " border-red": notification_type === "Permission",
            " border-orange":
              notification_type !== "Permission" &&
              notification_type !== "Certificate",
          }
        )}
      >
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-3">
            <img
              className="w-12 h-12 rounded-full"
              src={senderAvatar}
              alt="sender avatar"
            />
            <div>
              <h1 className="font-bold">{fullName(senderName)}</h1>
              <div className="text-perfGray">
                <AppIcons className="w-3 h-3 inline" icon="ClockIcon:outline" />{" "}
                <span className="text-xs">{created_at}</span>
              </div>
            </div>
          </div>
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
        </div>
        <div className="text-perfGray3 m-2">{message}</div>
      </div>
    </>
  );
};

export default SingleNotification;
