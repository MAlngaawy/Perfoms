import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSuperMetricsQuery } from "~/app/store/Supervisor/supervisorApi";
import { Metric } from "~/app/store/types/supervisor-types";
import DeleteButton from "../../../../@main/components/ManagerComponents/SubComponents/DeleteButton";
import AddMetric from "./Components/AddMetric";
import CreateActionsAndRecomm from "./Components/CreateActionsAndRecomm";
import EditMetric from "./Components/EditMetric";
import { Avatar } from "@mantine/core";

type Props = {};

const KpiMetrics = (props: Props) => {
  const { id } = useParams();

  console.log("LOLLLLLLLL", id);

  const { data: metrics } = useSuperMetricsQuery({ kpi_id: id }, { skip: !id });

  return (
    <div className="admin-teams  flex xs:flex-row flex-wrap justify-center sm:justify-start items-stretch gap-4 sm:m-6 p-2 sm:p-6">
      {metrics?.results.map((metric: Metric) => {
        return (
          <div className="sport-card relative bg-white rounded-3xl p-12 flex flex-col justify-center items-center gap-4">
            <div className="bg-pagesBg rounded-full w-24 h-24 flex justify-center items-center">
              <Avatar
                radius={"xl"}
                className="w-3/5 h-3/5"
                src={metric.icon}
                alt="icon"
              />
            </div>
            <h2 className="text-xl text-perfBlue w-28 text-center mx-auto">
              {metric.name}
            </h2>
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
      <AddMetric kpiId={id ? +id : undefined} />
    </div>
  );
};

export default KpiMetrics;
