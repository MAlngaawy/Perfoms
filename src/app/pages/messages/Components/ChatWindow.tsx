import { Avatar, Divider } from "@mantine/core";
import React from "react";
import classNames from "classnames";

type Props = {
  image: string;
  name: string;
  active: boolean;
};

const messages = [
  {
    text: "This is message from me",
    fromMe: true,
    time: "11:16",
  },
  {
    text: "Message frmom the other",
    fromMe: false,
    time: "11:30",
  },
  {
    text: "Message frmom the other",
    fromMe: false,
    time: "11:30",
  },
  {
    text: "Message frmom the other",
    fromMe: false,
    time: "11:30",
  },
  {
    text: "This is message from me",
    fromMe: true,
    time: "11:16",
  },
  {
    text: "This is message from me",
    fromMe: true,
    time: "11:16",
  },
  {
    text: "This is message from me",
    fromMe: true,
    time: "11:16",
  },
  {
    text: "Message frmom the other",
    fromMe: false,
    time: "11:30",
  },
  {
    text: "Message frmom the other",
    fromMe: false,
    time: "11:30",
  },
  {
    text: "Message frmom the other",
    fromMe: false,
    time: "11:30",
  },
  {
    text: "This is message from me",
    fromMe: true,
    time: "11:16",
  },
  {
    text: "This is message from me",
    fromMe: true,
    time: "11:16",
  },
];

const ChatWindow = ({ image, name, active }: Props) => {
  return (
    <div className="bg-white rounded-xl flex flex-col">
      <div className="userInfo p-4 flex gap-2">
        <Avatar size="lg" src={image} />
        <div className="flex flex-col justify-center">
          <h2 className="text-base text-perfLightBlack">{name}</h2>
          {active && (
            <div className="flex gap-1 items-center">
              <span className="w-2 h-2 flex bg-perfBlue rounded-full"></span>
              <span className="text-sm text-perfGray3">Online</span>
            </div>
          )}
        </div>
      </div>
      <Divider />
      <div className="messages gap-4 flex flex-col py-6 h-96 overflow-scroll">
        {messages.map((message) => {
          return (
            <>
              <div
                className={classNames(
                  " mx-4 text-base font-normal flex flex-col",
                  {
                    "self-start": message.fromMe,
                    "self-end  ": !message.fromMe,
                  }
                )}
              >
                <span
                  className={classNames("p-3 py-1", {
                    "bg-perfBlue text-white rounded-tl-3xl rounded-tr-3xl rounded-br-3xl ":
                      message.fromMe,
                    "bg-slate-200 text-perfGray1 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl ":
                      !message.fromMe,
                  })}
                >
                  {message.text}
                </span>
                <span
                  className={classNames("text-xs mx-2 my-1 text-perfGray3", {
                    "self-start ": message.fromMe,
                    "self-end ": !message.fromMe,
                  })}
                >
                  {message.time} am
                </span>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ChatWindow;
