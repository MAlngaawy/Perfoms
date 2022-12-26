import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Metric, Metrics } from "~/app/store/types/supervisor-types";
import DeleteButton from "../../../../@main/components/ManagerComponents/SubComponents/DeleteButton";
import AddMetric from "./Components/AddMetric";
import CreateActionsAndRecomm from "./Components/CreateActionsAndRecomm";
import EditMetric from "./Components/EditMetric";
import { Avatar, Breadcrumbs } from "@mantine/core";
import { useSuperMetricsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminMetricsQuery } from "~/app/store/clubManager/clubManagerApi";
import { useEffect } from "react";

type Props = {};

const KpiMetrics = (props: Props) => {
  const { kpi_id } = useParams();
  const [metrics, setMetrics] = useState<Metrics>();
  const { data: superMetrics, refetch: superRefetchMetrics } =
    useSuperMetricsQuery({ kpi_id }, { skip: !kpi_id });
  const { data: adminMetrics, refetch: adminRefetchMetrics } =
    useAdminMetricsQuery({ kpi_id }, { skip: !kpi_id });

  useEffect(() => {
    if (superMetrics) setMetrics(superMetrics);
    if (adminMetrics) setMetrics(adminMetrics);
  }, [superMetrics, adminMetrics]);

  const items = [
    { title: "Home", href: "/supervisor" },
    { title: "Kpis", href: `/supervisor/sports/${kpi_id}` },
    { title: "Metrics", href: `` },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <div className="admin-teams   m-2 sm:mx-10 my-2">
      <div className="mx-4 my-6">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="admin-teams  flex xs:flex-row flex-wrap justify-center sm:justify-start items-stretch gap-4 ">
        {metrics?.results.map((metric: Metric) => {
          return (
            <div className="sport-card relative bg-white rounded-3xl p-12 flex flex-col justify-center items-center gap-4">
              <div className="bg-pagesBg rounded-full w-24 h-24 flex justify-center items-center">
                <Avatar
                  radius={"xl"}
                  className="w-3/5 h-3/5"
                  src={metric.icon_url || metric.icon}
                  alt="icon"
                />
              </div>
              <h2 className="text-xl text-perfBlue w-28 text-center mx-auto">
                {metric.name}
              </h2>
              {/* Edit and Delete Buttons */}
              <div className="flex absolute left-2 top-5 gap-2">
                <EditMetric metricName={metric.name} metricId={metric.id} />
                <DeleteButton
                  deleteFun={() => console.log("Delete")}
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
