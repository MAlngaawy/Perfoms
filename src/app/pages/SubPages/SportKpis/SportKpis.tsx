import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import EditKpi from "./Components/EditKpi";
import AddKpi from "./Components/AddKpi";

import { Avatar } from "@mantine/core";
import { useSuperKpisQuery } from "~/app/store/supervisor/supervisorMainApi";

type Props = {};

const SportKpis = (props: Props) => {
  const { data: kpis } = useSuperKpisQuery({});
  return (
    <div className="admin-teams  flex xs:flex-row flex-wrap justify-center sm:justify-start items-stretch gap-4 sm:m-6 p-2 sm:p-6">
      {kpis?.results.map((kpi) => {
        return (
          <div className="sport-card relative bg-white rounded-3xl p-12 flex flex-col justify-center items-center gap-4">
            <Link
              to={`kpis/${kpi.id}`}
              className="bg-pagesBg rounded-full w-24 h-24 flex justify-center items-center"
            >
              <Avatar
                radius={"xl"}
                className="w-3/5 h-3/5"
                src={kpi.icon}
                alt="icon"
              />
            </Link>
            <h2 className="text-xl text-perfBlue w-28 text-center mx-auto">
              {kpi.name}
            </h2>
            {/* Edit and Delete Buttons */}
            <div className="flex absolute right-2 top-5 gap-2">
              <EditKpi kpiName={kpi.name} kpiId={kpi.id} />
              <DeleteButton name={kpi.name} id={kpi.id} type="Kpi" />
            </div>
          </div>
        );
      })}
      <AddKpi />
    </div>
  );
};

export default SportKpis;
