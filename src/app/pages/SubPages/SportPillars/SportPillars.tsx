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
  const sportName: string = location.state.sportName;

  const { data: adminPillars, refetch: refetchAdminPillars } =
    useAdminPillarsQuery({ sport_id: sport_id }, { skip: !sport_id });

  const { data: superPillars, refetch: refetchSuperPillars } =
    useSuperPillarsQuery({ sport_id: sport_id }, { skip: !sport_id });

  useEffect(() => {
    if (superPillars) setPillars(superPillars);
    if (adminPillars) setPillars(adminPillars);
  }, [superPillars, adminPillars]);

  const items = [
    { title: "Home", href: `/${user}` },
    { title: sportName + " Pillars", href: "" },
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
      <div className="flex xs:flex-row flex-wrap justify-center sm:justify-start items-stretch gap-4 ">
        {pillars?.results.map((pillar) => {
          return (
            <div className="sport-card relative bg-white rounded-3xl p-12 flex flex-col justify-center items-center gap-4">
              <Link
                to={`${pillar.id}/kpis`}
                state={{
                  pillarName: pillar.name,
                  sportName: sportName,
                }}
                className="bg-pagesBg rounded-full w-24 h-24 flex justify-center items-center"
              >
                <Avatar
                  radius={"xl"}
                  className="w-3/5 h-3/5"
                  src={pillar.icon}
                  alt="icon"
                />
              </Link>
              <h2 className="text-xl text-perfBlue w-28 text-center mx-auto">
                {pillar.name}
              </h2>
              {/* Edit and Delete Buttons */}
              <div className="flex absolute right-2 top-5 gap-2">
                <EditPillar pillarData={pillar} />
                <DeleteButton
                  deleteFun={() => console.log("delete")}
                  name={pillar.name}
                  type="pillar"
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
