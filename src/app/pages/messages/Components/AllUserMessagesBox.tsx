import { useState } from "react";
import classNames from "classnames";
import { Input, Divider } from "@mantine/core";
import AppIcons from "../../../../@main/core/AppIcons";
import OneMessageBox from "../../../../@main/components/OneMessageBox";

type Props = {
  visibleChatUserID: number;
  setVisibleChatUserID: any;
  connects: any[];
};

// {
//   image: string;
//   isActive: boolean;
//   name: string;
//   lastMessageText: string;
//   lastMessageTime: string;
//   unreadMessagesNumber: number;
//   selected: boolean;
//   id: number;
// }

const AllUserMessagesBox = ({
  visibleChatUserID,
  setVisibleChatUserID,
  connects,
}: Props) => {
  const [list, setList] = useState<"Coaches" | "Teams">("Coaches");

  return (
    <div className="bg-white p-4 rounded-xl flex flex-col justify-center gap-4 h-full">
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
      <div className="flex flex-col h-80 overflow-scroll">
        {list === "Coaches" &&
          connects.map((connect) => {
            return (
              <>
                <Divider />
                <OneMessageBox
                  visibleChatUserID={visibleChatUserID}
                  setVisibleChatUserID={setVisibleChatUserID}
                  {...connect}
                />{" "}
              </>
            );
          })}
        {list === "Teams" &&
          connects.map((connect) => {
            return (
              <>
                <Divider />
                <OneMessageBox
                  visibleChatUserID={visibleChatUserID}
                  setVisibleChatUserID={setVisibleChatUserID}
                  {...connect}
                />{" "}
              </>
            );
          })}
      </div>
    </div>
  );
};

export default AllUserMessagesBox;
