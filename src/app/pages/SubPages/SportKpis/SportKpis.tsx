import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import EditKpi from "./Components/EditKpi";
import AddKpi from "./Components/AddKpi";

import { Avatar, Breadcrumbs } from "@mantine/core";
import { useSuperKpisQuery } from "~/app/store/supervisor/supervisorMainApi";

type Props = {};

const items = [
  { title: "Home", href: "/supervisor" },
  { title: "Kpis", href: `` },
].map((item, index) => (
  <Link to={item.href} key={index}>
    {item.title}
  </Link>
));
const SportKpis = (props: Props) => {
  const { data: kpis } = useSuperKpisQuery({});
  return (
    <div className="admin-teams   m-2 sm:mx-10 my-2">
      <div className="mx-4 my-6">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="flex xs:flex-row flex-wrap justify-center sm:justify-start items-stretch gap-4 ">
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
                  src={kpi.icon_url}
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
    </div>
  );
};

export default SportKpis;
