import cn from "classnames";
import AppIcons from "~/@main/core/AppIcons";

type Props = {
  notification_type: "Certificate" | "Permission" | string;
  senderName: string;
  message?: string;
  created_at: string;
  newNotification?: boolean;
  senderAvatar: string;
};

const Notification = ({
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
        "w-full p-1 flex cursor-pointer hover:bg-blue-100 justify-start items-center gap-2 shadow-md",
        {
          "bg-perfLigtGray": newNotification,
          "bg-white ": !newNotification,
        }
      )}
    >
      <div className="flex gap-4 items-center w-full sm:w-2/3">
        <div className=" self-center min-w-max avatar p-1">
          <img
            className="w-10 h-10 md:w-16 md:h-16 object-cover rounded-full"
            src={senderAvatar}
            alt="sender_mage"
          />
        </div>
        <div className="info flex flex-col gap-1">
          <h2 className=" text-perfGray1 text-sm font-bold">{senderName}</h2>
          <p className=" text-perfGray4 text-xs font-medium flex gap-1">
            <AppIcons className="w-3 h-3" icon="ClockIcon:outline" />{" "}
            <span>{created_at}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center my-2 sm:my-auto justify-around w-full sm:w-1/3">
        <div
          className={cn(
            "type py-2 px-4 rounded-full text-xs font-semibold text-white ",
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
    </div>
  );
};

export default Notification;
