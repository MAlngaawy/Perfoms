import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./../../Components/SubComponents/DeleteButton";
import EditKpi from "./Components/EditKpi";
import AddKpi from "./Components/AddKpi";

type Props = {};

const kpis = [
  {
    name: "Kpi One",
    id: 1,
    icon: "https://cdn-icons-png.flaticon.com/512/2736/2736150.png",
  },
  {
    name: "Kpi Two",
    id: 2,
    icon: "https://cdn-icons-png.flaticon.com/512/2736/2736150.png",
  },
  {
    name: "Kpi Three",
    id: 3,
    icon: "https://cdn-icons-png.flaticon.com/512/2736/2736150.png",
  },
  {
    name: "Kpi Four",
    id: 4,
    icon: "https://cdn-icons-png.flaticon.com/512/2736/2736150.png",
  },
  {
    name: "Kpi Five",
    id: 5,
    icon: "https://cdn-icons-png.flaticon.com/512/2736/2736150.png",
  },
];

const SportKpis = (props: Props) => {
  return (
    <div className="admin-teams  flex flex-col xs:flex-row flex-wrap items-stretch gap-4 sm:m-6 p-2 sm:p-6">
      {kpis.map((kpi) => {
        return (
          <div className="sport-card relative bg-white rounded-3xl p-12 flex flex-col justify-center items-center gap-4">
            <Link
              to={`kpis/${kpi.id}`}
              className="bg-pagesBg rounded-full w-24 h-24 flex justify-center items-center"
            >
              <img className="w-3/5" src={kpi.icon} alt="icon" />
            </Link>
            <h2 className="text-xl text-perfBlue">{kpi.name}</h2>
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
