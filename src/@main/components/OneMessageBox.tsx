import { Indicator, Avatar, Group } from "@mantine/core";
import classNames from "classnames";

type Props = {
  image: string;
  isActive: boolean;
  name: string;
  lastMessageText: string;
  lastMessageTime: string;
  unreadMessagesNumber: number;
  selected?: boolean;
  id: number;
  visibleChatUserID?: number;
  setVisibleChatUserID?: any;
};

const OneMessageBox = ({
  image,
  isActive,
  name,
  lastMessageText,
  lastMessageTime,
  unreadMessagesNumber,
  id,
  visibleChatUserID,
  setVisibleChatUserID,
}: Props) => {
  return (
    <div
      onClick={() => setVisibleChatUserID(id)}
      className={classNames(
        "p-2 flex justify-between items-center gap-2 cursor-pointer hover:bg-pagesBg",
        {
          "border-r-4 bg-gray70 border-perfBlue": visibleChatUserID === id,
        }
      )}
    >
      <div className=" flex gap-2">
        <Group position="center">
          <Indicator
            color={isActive ? "blue" : "gray"}
            size={12}
            withBorder
            sx={{
              ".mantine-Indicator-indicator": {
                top: 5,
                right: 2,
              },
            }}
          >
            <Avatar size="lg" src={image} />
          </Indicator>
        </Group>

        <div className="data flex flex-col justify-between gap-1 ">
          <h2 className="text-base text-perfLightBlack">{name}</h2>
          <p className="text-perfBlack30 text-xs">
            {lastMessageText.substring(0, 30)}...
          </p>
        </div>
      </div>
      <div className="info flex flex-col justify-between around items-center gap-1">
        {unreadMessagesNumber > 0 && (
          <span className="last text-white text-sm p-1 text-center w-5 h-5  flex justify-center items-center bg-perfBlue rounded-full">
            {unreadMessagesNumber}
          </span>
        )}
        <span className="text-perfBlack30 text-xs">{lastMessageTime}</span>
      </div>
    </div>
  );
};

export default OneMessageBox;
