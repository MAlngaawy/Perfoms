import { Indicator, Avatar, Group } from "@mantine/core";

type Props = {
  image: string;
  isActive: boolean;
  name: string;
  lastMessageText: string;
  lastMessageTime: string;
  unreadMessagesNumber: number;
};

const OneMessageBox = ({
  image,
  isActive,
  name,
  lastMessageText,
  lastMessageTime,
  unreadMessagesNumber,
}: Props) => {
  return (
    <div className="p-4 flex justify-center items-center gap-2">
      <Group position="center">
        <Indicator
          size={12}
          withBorder
          sx={{
            ".mantine-Indicator-indicator": {
              top: 5,
              right: 2,
            },
          }}
        >
          <Avatar
            size="lg"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
          />
        </Indicator>
      </Group>
      <div className="data flex flex-col ">
        <h2 className="text-base text-perfLightBlack">{name}</h2>
        <p className="text-perfBlack30 text-xs">
          {lastMessageText.substring(0, 30)}...
        </p>
      </div>
      <div className="info flex flex-col">
        {unreadMessagesNumber > 0 && (
          <span className="last text-white text-sm p-1 text-center w-6 h-6 flex justify-center items-center bg-perfBlue rounded-full">
            {unreadMessagesNumber}
          </span>
        )}
        <span className="text-perfBlack30 text-xs">{lastMessageTime}</span>
      </div>
    </div>
  );
};

export default OneMessageBox;
