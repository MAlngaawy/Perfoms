import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import EditPillar from "./Components/EditPillar";
import AddPillar from "./Components/AddPillar";
import { Pillars } from "~/app/store/types/supervisor-types";
import { Avatar, Breadcrumbs } from "@mantine/core";
import { useSuperPillarsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminPillarsQuery } from "~/app/store/clubManager/clubManagerApi";

type Props = {};

const SportPillars = (props: Props) => {
  const [pillars, setPillars] = useState<Pillars>();
  const { sport_id } = useParams();
  const location = useLocation();
  const user = location.pathname.split("/")[1];

  const { data: adminPillars, refetch: refetchAdminPillars } =
    useAdminPillarsQuery({ sport_id: sport_id }, { skip: !sport_id });

  const { data: superPillars, refetch: refetchSuperPillars } =
    useSuperPillarsQuery({ sport_id: sport_id }, { skip: !sport_id });

  const items = [
    { title: "Home", href: `/${user}` },
    { title: "Pillars", href: `` },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  useEffect(() => {
    if (superPillars) setPillars(superPillars);
    if (adminPillars) setPillars(adminPillars);
  }, [superPillars, adminPillars]);

  return (
    <div className="admin-teams   m-2 sm:mx-10 my-2">
      <div className="mx-4 my-6">
        <Breadcrumbs className="text-perfGray3" separator="→">
          {items}
        </Breadcrumbs>
      </div>
      <div className="flex xs:flex-row flex-wrap justify-center sm:justify-start items-stretch gap-4 ">
        {pillars?.results.map((kpi) => {
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
                <EditPillar kpiName={kpi.name} kpiId={kpi.id} />
                <DeleteButton
                  deleteFun={() => console.log("delete")}
                  name={kpi.name}
                  type="Kpi"
                />
              </div>
            </div>
          );
        })}

        <AddPillar />
      </div>
    </div>
  );
};

export default SportPillars;
