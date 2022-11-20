import { useState } from "react";
import classNames from "classnames";
import { Input, Divider } from "@mantine/core";
import AppIcons from "../../@main/core/AppIcons";
import OneMessageBox from "./OneMessageBox";

type Props = {};

const messages = [
  {
    image:
      "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
    isActive: false,
    name: "John Doue",
    lastMessageText:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, voluptatum? Quos sed officiis assumenda officia modi, magnam odio saepe hic vel quisquam facere aspernatur dolorum ea consequatur eos, quae tenetur.",
    lastMessageTime: "10:30 am",
    unreadMessagesNumber: 0,
    selected: true,
  },
  {
    image:
      "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
    isActive: true,
    name: "John ahmed",
    lastMessageText: "Lorem ipsum.",
    lastMessageTime: "10:30 am",
    unreadMessagesNumber: 5,
  },
  {
    image:
      "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
    isActive: false,
    name: "John Doue",
    lastMessageText:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, voluptatum? Quos sed officiis assumenda officia modi, magnam odio saepe hic vel quisquam facere aspernatur dolorum ea consequatur eos, quae tenetur.",
    lastMessageTime: "10:30 am",
    unreadMessagesNumber: 0,
  },
  {
    image:
      "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
    isActive: false,
    name: "John Doue",
    lastMessageText:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, voluptatum? Quos sed officiis assumenda officia modi, magnam odio saepe hic vel quisquam facere aspernatur dolorum ea consequatur eos, quae tenetur.",
    lastMessageTime: "10:30 am",
    unreadMessagesNumber: 0,
  },
  {
    image:
      "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
    isActive: false,
    name: "John Doue",
    lastMessageText:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, voluptatum? Quos sed officiis assumenda officia modi, magnam odio saepe hic vel quisquam facere aspernatur dolorum ea consequatur eos, quae tenetur.",
    lastMessageTime: "10:30 am",
    unreadMessagesNumber: 0,
  },
];

const AllUserMessagesBox = (props: Props) => {
  const [list, setList] = useState<"Coaches" | "Teams">("Coaches");

  return (
    <div className="bg-white p-4 rounded-xl flex flex-col gap-6">
      <div className="flex gap-4">
        <span
          onClick={() => setList("Coaches")}
          className={classNames(" text-xl cursor-pointer", {
            "font-bold text-perfBlack90": list === "Coaches",
            "text-perfGray3": list !== "Coaches",
          })}
        >
          Coaches
        </span>
        <span
          onClick={() => setList("Teams")}
          className={classNames("text-xl cursor-pointer", {
            "font-bold text-perfBlack90": list === "Teams",
            "text-perfGray3": list !== "Teams",
          })}
        >
          Teams
        </span>
      </div>
      <div>
        <Input
          icon={
            <AppIcons
              icon="MagnifyingGlassIcon:outline"
              className="w-6 h-6 text-perfBlack90 "
            />
          }
          placeholder="Your email"
        />
      </div>
      <div className="flex flex-col">
        {list === "Coaches" &&
          messages.map((message) => {
            return (
              <>
                <OneMessageBox {...message} /> <Divider />
              </>
            );
          })}
        {list === "Teams" &&
          messages.map((message) => {
            return (
              <>
                <OneMessageBox {...message} /> <Divider />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default AllUserMessagesBox;
