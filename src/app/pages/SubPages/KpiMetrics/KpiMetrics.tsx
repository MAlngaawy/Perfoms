import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../../../../@main/components/ManagerComponents/SubComponents/DeleteButton";
import AddMetric from "./Components/AddMetric";
import CreateActionsAndRecomm from "./Components/CreateActionsAndRecomm";
import EditMetric from "./Components/EditMetric";

type Props = {};

const metrics = [
  {
    name: "Metric One",
    id: 1,
    icon: "https://icon-library.com/images/leg-icon/leg-icon-3.jpg",
  },
  {
    name: "Metric Two",
    id: 2,
    icon: "https://icon-library.com/images/leg-icon/leg-icon-3.jpg",
  },
  {
    name: "Metric Three",
    id: 3,
    icon: "https://icon-library.com/images/leg-icon/leg-icon-3.jpg",
  },
  {
    name: "Metric Four",
    id: 4,
    icon: "https://icon-library.com/images/leg-icon/leg-icon-3.jpg",
  },
  {
    name: "Metric Five",
    id: 5,
    icon: "https://icon-library.com/images/leg-icon/leg-icon-3.jpg",
  },
];

const KpiMetrics = (props: Props) => {
  return (
    <div className="admin-teams  flex flex-col xs:flex-row flex-wrap items-stretch gap-4 sm:m-6 p-2 sm:p-6">
      {metrics.map((metric) => {
        return (
          <div className="sport-card relative bg-white rounded-3xl p-12 flex flex-col justify-center items-center gap-4">
            <div className="bg-pagesBg rounded-full w-24 h-24 flex justify-center items-center">
              <img className="w-3/5" src={metric.icon} alt="icon" />
            </div>
            <h2 className="text-xl text-perfBlue">{metric.name}</h2>
            {/* Edit and Delete Buttons */}
            <div className="flex absolute left-2 top-5 gap-2">
              <EditMetric metricName={metric.name} metricId={metric.id} />
              <DeleteButton name={metric.name} id={metric.id} type="Metric" />
            </div>
            <div className="flex absolute right-2 top-5 gap-2">
              <CreateActionsAndRecomm />
            </div>
          </div>
        );
      })}
      <AddMetric />
    </div>
  );
};

export default KpiMetrics;
