import { Avatar } from "@mantine/core";
import DeleteButton from "../ManagerComponents/SubComponents/DeleteButton";
import AppUtils from "~/@main/utils/AppUtils";
import { useParams } from "react-router-dom";

type Props = {};

const OneAchievement = ({
  type,
  date,
  place,
  id,
  location,
  editMode,
  deleteAchFunction,
}: any) => {
  let medal = "/assets/images/medal.png";
  switch (place) {
    case "1th":
      medal = "/assets/images/1st.png";
      break;
    case "2th":
      medal = "/assets/images/2nd.png";
      break;
    case "3th":
      medal = "/assets/images/3th.png";
      break;
  }

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-1">
        <div className="icon bg-pagesBg p-1 rounded-lg">
          <Avatar
            sx={{
              ".mantine-1trwvlz": {
                objectFit: "contain",
              },
            }}
            src={medal}
            size={50}
            alt="medal"
          />
        </div>
        <div className="details flex flex-col justify-center gap-1 break-words">
          <h2 className="type text-sm font-medium text-perfLightBlack">
            <span>{type}</span>
          </h2>
          <p className="text-xs text-perfGray3">
            {date}, {location}
          </p>
        </div>
      </div>
      {editMode && (
        <div className="">
          <DeleteButton
            type=" Medal"
            name={place + " " + type}
            deleteFun={() => {
              deleteAchFunction({ id: id })
                .then(() => {
                  AppUtils.showNotificationFun(
                    "Success",
                    "Done",
                    "Successfully Deleted Achievement"
                  );
                })
                .catch(() => {
                  AppUtils.showNotificationFun(
                    "Error",
                    "Sorry",
                    "Can't Add Achievement Now"
                  );
                });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default OneAchievement;
