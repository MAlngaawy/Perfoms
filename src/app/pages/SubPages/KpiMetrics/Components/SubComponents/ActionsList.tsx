import { Avatar, Indicator, Modal } from "@mantine/core";
import { useState } from "react";
import cn from "classnames";
import useWindowSize from "~/@main/hooks/useWindowSize";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import AppIcons from "~/@main/core/AppIcons";

type Props = {
  type: "Action" | "Recommendation";
  metricName: string;
  metricIcon: string;
  opened: boolean;
  setOpened: any;
  data: {
    id: number;
    name: string;
    description: string;
  }[];
};

const ActionsList = ({
  type,
  metricName,
  metricIcon,
  data,
  opened,
  setOpened,
}: Props) => {
  const screenWidth = useWindowSize().width;
  const isMobile = screenWidth < 700;

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
          <span className=" w-full text-xs text-perfGray2">
            You can select wich {type} should appear to the players when you
            click on it.
          </span>
          {data.map((single, index) => {
            return (
              <SignleAction
                active={false}
                type={type}
                num={index + 1}
                data={single}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-center my-6">
          <button className="p-2 px-6 bg-blue-500 text-white rounded-md">
            Add New Recommendation
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ActionsList;

type SingleActionsProps = {
  data: {
    id: number;
    name: string;
    description: string;
  };
  num: number;
  type: "Action" | "Recommendation";
  active: boolean;
};

const SignleAction = ({ data, num, type, active }: SingleActionsProps) => {
  const [activeStatus, setActiveStatus] = useState<boolean>(active);

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
          <div>
            <AppIcons
              icon="PencilSquareIcon:outline"
              className=" w-4 h-4 text-perfGray3"
            />
          </div>
          <div>
            <DeleteButton
              type="Recom"
              name={data.name}
              deleteFun={() => console.log("LOL")}
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
