import { Avatar, Divider, Textarea } from "@mantine/core";
import React from "react";
import classNames from "classnames";
import AppIcons from "../../../../@main/core/AppIcons";
import { useForm } from "react-hook-form";

type Props = {
  image?: string;
  name?: string;
  isActive?: boolean;
  connectId?: number;
  notSelected: boolean;
};

// will use the connectId to GET the chats and bring an array like this
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

const ChatWindow = ({
  image,
  name,
  isActive,
  connectId,
  notSelected,
}: Props) => {
  const { register, reset, handleSubmit } = useForm();

  const sendMessage = (data: any) => {
    console.log(data.message);
    reset({ message: "" });
  };

  return (
    <>
      {notSelected ? (
        <div className="bg-white rounded-xl flex flex-col justify-center items-center h-full">
          <div className="logo p-8 rounded-full bg-slate-200">
            <AppIcons
              icon="ChatBubbleOvalLeftEllipsisIcon:solid"
              className="w-10 h-10 text-perfGray"
            />
          </div>
          <h2>Messages</h2>
          <p className="text-xs text-perfGray3">
            Click on a contact to view messages.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl flex flex-col">
          <div className="userInfo p-4 flex gap-2">
            <Avatar size="lg" src={image} />
            <div className="flex flex-col justify-center">
              <h2 className="text-base text-perfLightBlack">{name}</h2>
              {isActive && (
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 flex bg-perfBlue rounded-full"></span>
                  <span className="text-sm text-perfGray3">Online</span>
                </div>
              )}
            </div>
          </div>
          <Divider />
          <div className="messages gap-4 flex flex-col py-6 h-80 overflow-scroll">
            {messages.map((message) => {
              return (
                <div
                  key={message.text}
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
              );
            })}
          </div>
          <div className="m-6">
            <form
              onSubmit={handleSubmit(sendMessage)}
              className="border border-gray-300 rounded-lg px-2 flex gap-6  "
            >
              <Textarea
                {...register("message")}
                variant="unstyled"
                minRows={1}
                sx={{
                  margin: 0,
                  text: "#eee",
                  width: "100%",
                }}
                placeholder="Your message"
              />
              <button
                type="submit"
                className="bg-blue-200 text-gray-700 flex gap-1 justify-center items-center px-2 rounded-lg my-1"
              >
                <span className="text-sm">Send</span>
                <AppIcons
                  className="w-4 h-4 transform -rotate-45"
                  icon="PaperAirplaneIcon:solid"
                />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow;
