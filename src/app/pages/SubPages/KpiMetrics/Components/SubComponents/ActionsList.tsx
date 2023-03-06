import { Avatar, Indicator, Modal, Input } from "@mantine/core";
import { useState, ReactNode } from "react";
import cn from "classnames";
import useWindowSize from "~/@main/hooks/useWindowSize";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import AppIcons from "~/@main/core/AppIcons";
import AddRecomendationModal from "../AddRecommendationModal";
import AddActionModal from "../AddActionModal";
import { ActionCruds } from "~/app/store/types/clubManager-types";
import EditSignleAction from "./UpdateActionModal";
import {
  useDeleteMetricActionMutation,
  useDeleteMetricRecommendationMutation,
} from "~/app/store/clubManager/clubManagerApi";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {
  type: "Action" | "Recommendation";
  metricName: string;
  metricIcon: string;
  opened: boolean;
  setOpened: any;
  data: ActionCruds[] | undefined;
  metricId: number;
};

const ActionsList = ({
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
              <SignleAction
                active={false}
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

export default ActionsList;

type SingleActionsProps = {
  data: ActionCruds;
  num: number;
  type: "Action" | "Recommendation";
  active: boolean;
};

const SignleAction = ({ data, num, type, active }: SingleActionsProps) => {
  const [activeStatus, setActiveStatus] = useState<boolean>(active);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [deleteAction] = useDeleteMetricActionMutation();
  const [deleteRecommendation] = useDeleteMetricRecommendationMutation();

  return (
    <div
      className={cn(
        "bg-pagesBg flex flex-col gap-2 w-full rounded-xl px-4 md:px-8 py-4",
        {
          "border border-perfBlue": activeStatus,
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
              type="Recom"
              name={data.name}
              deleteFun={() => {
                if (type === "Recommendation") {
                  deleteRecommendation({ recommendation_id: data.id }).then(
                    (res) =>
                      AppUtils.showNotificationFun(
                        "Success",
                        "Done",
                        "Recommendation deleted Successfully"
                      )
                  );
                } else {
                  deleteAction({ action_id: data.id }).then((res) =>
                    AppUtils.showNotificationFun(
                      "Success",
                      "Done",
                      "Action deleted Successfully"
                    )
                  );
                }
              }}
            />
          </div>
          <div>
            <SimpleRadioButton
              setActiveStatus={setActiveStatus}
              active={activeStatus}
            />
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
  setActiveStatus,
}: {
  active: boolean;
  setActiveStatus: any;
}) => {
  return (
    <div
      onClick={() => setActiveStatus(!active)}
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
