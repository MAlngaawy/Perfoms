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
import SharedBreadCrumbs from "~/@main/components/shared/SharedBreadCrumbs";
import ItemBox from "~/@main/components/shared/ItemBox";

type Props = {};

const SportPillars = (props: Props) => {
  const [pillars, setPillars] = useState<Pillars>();
  const { sport_id } = useParams();
  const location = useLocation();
  // const user = location.pathname.split("/")[1];
  const { data: user } = useUserQuery({});

  const { data: adminPillars, refetch: refetchAdminPillars } =
    useAdminPillarsQuery(
      { sport_id: sport_id },
      { skip: !sport_id || user?.user_type !== "Admin" }
    );

  const { data: superPillars, refetch: refetchSuperPillars } =
    useSuperPillarsQuery(
      { sport_id: sport_id },
      { skip: !sport_id || user?.user_type !== "Supervisor" }
    );

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
          //@ts-ignore
          if (res.error) {
            //@ts-ignore
            AppUtils.showNotificationFun("Error", "Sorry", error.data.message);
          } else {
            AppUtils.showNotificationFun(
              "Success",
              "Done",
              "Pillar Deleted successfully"
            );
            refetchSuperPillars();
          }
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
          //@ts-ignore
          if (res.error) {
            //@ts-ignore
            AppUtils.showNotificationFun("Error", "Sorry", error.data.message);
          } else {
            AppUtils.showNotificationFun(
              "Success",
              "Done",
              "Pillar Deleted successfully"
            );
            refetchSuperPillars();
          }
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

  // const items = [
  //   { title: "Home", href: `/` },
  //   { title: "Pillars", href: `` },
  // ].map((item, index) => (
  //   <Link to={item.href} key={index}>
  //     {item.title}
  //   </Link>
  // ));
  console.log("LOLL");
  return (
    <div className="admin-teams   m-2 sm:mx-10 my-2">
      <div className="mx-4 my-6">
        <SharedBreadCrumbs />
      </div>
      <div className="flex xs:flex-row flex-wrap justify-center sm:justify-start items-stretch gap-4 ">
        {pillars?.results.map((pillar) => {
          return (
            <ItemBox
              icon={pillar.icon || pillar.icon_url}
              name={pillar.name}
              url={`${pillar.id}/kpis`}
            >
              <EditPillar pillarData={pillar} />
              <DeleteButton
                deleteFun={() => deletePillarFun(pillar.id)}
                name={pillar.name}
                type="pillar"
              />
            </ItemBox>
          );
        })}

        <AddPillar />
      </div>
    </div>
  );
};

export default SportPillars;
