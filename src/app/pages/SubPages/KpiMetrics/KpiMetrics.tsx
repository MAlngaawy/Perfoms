import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Metric, Metrics } from "~/app/store/types/supervisor-types";
import DeleteButton from "../../../../@main/components/ManagerComponents/SubComponents/DeleteButton";
import AddMetric from "./Components/AddMetric";
import CreateActionsAndRecomm from "./Components/CreateActionsAndRecomm";
import EditMetric from "./Components/EditMetric";
import { Avatar, Breadcrumbs } from "@mantine/core";
import {
  useSuperDeleteMetricMutation,
  useSuperMetricsQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import {
  useAdminDeleteMetricMutation,
  useAdminMetricsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { useEffect } from "react";
import { useUserQuery } from "~/app/store/user/userApi";
import AppUtils from "~/@main/utils/AppUtils";
import SharedBreadCrumbs from "~/@main/components/shared/SharedBreadCrumbs";

type Props = {};

const KpiMetrics = (props: Props) => {
  const { kpi_id } = useParams();
  const [metrics, setMetrics] = useState<Metrics>();
  const { data: user } = useUserQuery({});
  const { data: superMetrics } = useSuperMetricsQuery(
    { kpi_id },
    { skip: !kpi_id || user?.user_type !== "Supervisor" }
  );
  const { data: adminMetrics } = useAdminMetricsQuery(
    { kpi_id },
    { skip: !kpi_id || user?.user_type !== "Admin" }
  );

  const [superDeleteMetric] = useSuperDeleteMetricMutation();
  const [adminDeleteMetric] = useAdminDeleteMetricMutation();

  useEffect(() => {
    if (superMetrics) setMetrics(superMetrics);
    if (adminMetrics) setMetrics(adminMetrics);
  }, [superMetrics, adminMetrics]);

  const deleteFun = (metric_id: string) => {
    if (user?.user_type === "Admin") {
      adminDeleteMetric({ metric_id: metric_id })
        .then((res) => {
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Metric Deleted successfully"
          );
        })
        .catch((err) => {
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Can't delete Metric now , try again later"
          );
        });
    } else {
      superDeleteMetric({ metric_id: metric_id })
        .then((res) => {
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Metric Deleted successfully"
          );
        })
        .catch((err) => {
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Can't delete Metric now , try again later"
          );
        });
    }
  };

  return (
    <div className="admin-teams   m-2 sm:mx-10 my-2">
      <div className="mx-4 my-6">
        <SharedBreadCrumbs />
      </div>
      <div className="admin-teams  flex xs:flex-row flex-wrap justify-center sm:justify-start items-stretch gap-4 ">
        {metrics?.results.map((metric: Metric) => {
          return (
            <div
              key={metric.id}
              className="sport-card relative bg-white rounded-3xl p-12 flex flex-col justify-center items-center gap-4"
            >
              <div className="bg-pagesBg rounded-full w-24 h-24 flex justify-center items-center">
                <Avatar
                  radius={"xl"}
                  className="w-3/5 h-3/5"
                  src={metric.icon_url || metric.icon}
                  alt="icon"
                />
              </div>
              <h2 className="text-xl break-words text-perfBlue w-28 text-center mx-auto">
                {metric.name}
              </h2>
              {/* Edit and Delete Buttons */}
              <div className="flex absolute left-2 top-5 gap-2">
                <EditMetric metricData={metric} />
                <DeleteButton
                  deleteFun={() => deleteFun(JSON.stringify(metric.id))}
                  name={metric.name}
                  type="Metric"
                />
              </div>
              <div className="flex absolute right-2 top-5 gap-2">
                <CreateActionsAndRecomm metricId={metric.id} />
              </div>
            </div>
          );
        })}
        <AddMetric />
      </div>
    </div>
  );
};

export default KpiMetrics;
