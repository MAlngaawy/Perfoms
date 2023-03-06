import { Avatar, Modal } from "@mantine/core";
import { useState } from "react";
import cn from "classnames";
import useWindowSize from "~/@main/hooks/useWindowSize";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import AppIcons from "~/@main/core/AppIcons";
import AddRecomendationModal from "../AddRecommendationModal";
import AddActionModal from "../AddActionModal";
import { NoteCruds } from "~/app/store/types/clubManager-types";
import EditSignleAction from "./UpdateActionModal";
import {
  useDeleteMetricActionMutation,
  useDeleteMetricRecommendationMutation,
  useSelectActionMutation,
  useSelectRecommendationMutation,
} from "~/app/store/clubManager/clubManagerApi";
import AppUtils from "~/@main/utils/AppUtils";
import {
  useSuperDeleteMetricActionMutation,
  useSuperDeleteMetricRecommendationMutation,
} from "~/app/store/supervisor/supervisorMainApi";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {
  type: "Action" | "Recommendation";
  metricName: string;
  metricIcon: string;
  opened: boolean;
  setOpened: any;
  data: NoteCruds[] | undefined;
  metricId: number;
};

const NotesList = ({
  type,
  metricName,
  metricIcon,
  data,
  opened,
  setOpened,
  metricId,
}: Props) => {
  const screenWidth = useWindowSize().width;
  const isMobile = screenWidth < 700;
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      fullScreen={isMobile}
      size={"70%"}
      className="p-2 sm:p-5"
    >
      <div className="bg-white p-4">
        <div className="flex gap-2 absolute top-5 left-5">
          <Avatar radius={100} size={30} src={metricIcon} />
          <h2 className="">{metricName}</h2>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:mx-6">
          {/* <span className=" w-full text-xs text-perfGray2">
            You can select wich {type} should appear to the players when you
            click on it.
          </span> */}
          {data?.map((single, index) => {
            return (
              <SignleNote
                active={single.is_selected}
                key={single.id}
                type={type}
                num={index + 1}
                data={single}
              />
            );
          })}
        </div>

        {type === "Recommendation" && (
          <AddRecomendationModal
            opened={openAddForm}
            setOpened={setOpenAddForm}
            metricId={metricId}
          />
        )}

        {type === "Action" && (
          <AddActionModal
            opened={openAddForm}
            setOpened={setOpenAddForm}
            metricId={metricId}
          />
        )}

        <div className="flex items-center justify-center my-6">
          <button
            onClick={() => setOpenAddForm(true)}
            className="p-2 px-6 bg-blue-500 text-white rounded-md"
          >
            Add New {type}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotesList;

type SingleNoteProps = {
  data: NoteCruds;
  num: number;
  type: "Action" | "Recommendation";
  active: boolean;
};

const SignleNote = ({ data, num, type, active }: SingleNoteProps) => {
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const { data: user } = useUserQuery({});

  // Admin Methods
  const [adminDeleteAction] = useDeleteMetricActionMutation();
  const [adminDeleteRecommendation] = useDeleteMetricRecommendationMutation();
  // Supervisor Methods
  const [superDeleteAction] = useSuperDeleteMetricActionMutation();
  const [superDeleteRecommendation] =
    useSuperDeleteMetricRecommendationMutation();

  const deleteMethods = () => {
    const successMessage = () =>
      AppUtils.showNotificationFun(
        "Success",
        "Done",
        "Recommendation deleted Successfully"
      );

    const errorMessage = () =>
      AppUtils.showNotificationFun(
        "Success",
        "Done",
        "Action deleted Successfully"
      );

    if (type === "Recommendation") {
      if (user?.user_type === "Admin") {
        adminDeleteRecommendation({
          recommendation_id: data.id,
        }).then(() => successMessage());
      } else {
        superDeleteRecommendation({
          recommendation_id: data.id,
        }).then(() => successMessage());
      }
    } else {
      if (user?.user_type === "Admin") {
        adminDeleteAction({ action_id: data.id }).then(() => successMessage);
      } else {
        superDeleteAction({ action_id: data.id }).then(() => successMessage);
      }
    }
  };

  return (
    <div
      className={cn(
        "bg-pagesBg flex flex-col gap-2 w-full rounded-xl px-4 md:px-8 py-4",
        {
          "border border-perfBlue": active,
        }
      )}
    >
      <div className="flex justify-between">
        <h3 className="text-perfGray1 text-sm md:text-md">
          {type + " " + num}
        </h3>
        <div className="flex items-center gap-2">
          <EditSignleAction
            type={type}
            actionData={data}
            opened={openUpdate}
            setOpened={setOpenUpdate}
          />
          <div
            onClick={() => setOpenUpdate(true)}
            className="hover:text-perfBlue text-perfGray3  hover:scale-125 cursor-pointer transform"
          >
            <AppIcons icon="PencilSquareIcon:outline" className=" w-4 h-4 " />
          </div>
          <div>
            <DeleteButton
              type="Note"
              name={data.name}
              deleteFun={() => {
                deleteMethods();
              }}
            />
          </div>
          <div>
            <SimpleRadioButton item_id={data.id} type={type} active={active} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start">
        <h3>{data.name}</h3>
        <p className="text-perfGray3">{data.description}</p>
      </div>
    </div>
  );
};

const SimpleRadioButton = ({
  active,
  item_id,
  type,
}: {
  active: boolean;
  item_id: number;
  type: "Action" | "Recommendation";
}) => {
  console.log("item_id", item_id);

  const [selectAction] = useSelectActionMutation();
  const [selectRecommendation] = useSelectRecommendationMutation();

  return (
    <div
      onClick={() => {
        if (type === "Action") {
          selectAction({ action_id: item_id });
        } else {
          selectRecommendation({ recommendation_id: item_id });
        }
      }}
      className={cn(
        "outer border rounded-full w-3 h-3 flex justify-center items-center cursor-pointer",
        {
          "border-perfBlue": active,
          "border-perfGray3": !active,
        }
      )}
    >
      <div
        className={cn("inner w-2 h-2 rounded-full", {
          "bg-perfBlue": active,
          "bg-perfGray3": !active,
        })}
      ></div>
    </div>
  );
};
