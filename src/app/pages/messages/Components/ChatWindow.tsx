import { Avatar, Indicator } from "@mantine/core";
import React from "react";

type Props = {
  image: string;
  name: string;
  active: boolean;
};

const ChatWindow = ({ image, name, active }: Props) => {
  return (
    <div className="bg-white p-4 rounded-xl flex flex-col">
      <div className="userInfo flex gap-2">
        <Avatar size="lg" src={image} />
        <Indicator position="middle-center">online</Indicator>
      </div>
    </div>
  );
};

export default ChatWindow;
