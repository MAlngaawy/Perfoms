import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import EditPillar from "./Components/EditPillar";
import AddPillar from "./Components/AddPillar";
import { Pillars } from "~/app/store/types/supervisor-types";
import { Avatar, Breadcrumbs } from "@mantine/core";
import {
  useSuperDeletePillarMutation,
  useSuperPillarsQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import {
  useAdminDeletePillarMutation,
  useAdminPillarsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import AppUtils from "~/@main/utils/AppUtils";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {};

const SportPillars = (props: Props) => {
  const [pillars, setPillars] = useState<Pillars>();
  const { sport_id } = useParams();
  const location = useLocation();
  // const user = location.pathname.split("/")[1];
  const { data: user } = useUserQuery({});
  const sportName: string = location.state.sportName;

  const { data: adminPillars, refetch: refetchAdminPillars } =
    useAdminPillarsQuery({ sport_id: sport_id }, { skip: !sport_id });

  const { data: superPillars, refetch: refetchSuperPillars } =
    useSuperPillarsQuery({ sport_id: sport_id }, { skip: !sport_id });

  const [superDeletePillar] = useSuperDeletePillarMutation();
  const [adminDeletePillar] = useAdminDeletePillarMutation();

  useEffect(() => {
    if (superPillars) setPillars(superPillars);
    if (adminPillars) setPillars(adminPillars);
  }, [superPillars, adminPillars]);

  // Delete Pillar Fun
  const deletePillarFun = (pillar_id: number) => {
    if (user?.user_type === "Admin") {
      adminDeletePillar({
        pillar_id,
      })
        .then((res) => {
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Pillar Deleted Succcessfly"
          );
          refetchAdminPillars();
        })
        .catch(() => {
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Can't delete Pillar Now"
          );
        });
    } else if (user?.user_type === "Supervisor") {
      superDeletePillar({
        pillar_id,
      })
        .then((res) => {
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Pillar Deleted Succcessfly"
          );
          refetchSuperPillars();
        })
        .catch(() => {
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Can't delete Pillar Now"
          );
        });
    }
  };

  const items = [
    { title: "Home", href: `/` },
    { title: sportName + " Pillars", href: "/" },
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
                  deleteFun={() => deletePillarFun(pillar.id)}
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
