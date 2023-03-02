import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import DeleteButton from "~/@main/components/ManagerComponents/SubComponents/DeleteButton";
import EditKpi from "./Components/EditKpi";
import AddKpi from "./Components/AddKpi";
import { Avatar, Breadcrumbs } from "@mantine/core";
import {
  useSuperDeleteKpiMutation,
  useSuperKpisQuery,
} from "~/app/store/supervisor/supervisorMainApi";
import { Kpis } from "~/app/store/types/supervisor-types";
import {
  useAdminDeleteKpiMutation,
  useAdminKpisQuery,
} from "~/app/store/clubManager/clubManagerApi";
import AppUtils from "~/@main/utils/AppUtils";
import { useUserQuery } from "~/app/store/user/userApi";
import SharedBreadCrumbs from "~/@main/components/shared/SharedBreadCrumbs";
import ItemBox from "~/@main/components/shared/ItemBox";

type Props = {};

const PillarKpis = (props: Props) => {
  const [kpis, setKpis] = useState<Kpis>();
  // const { pillarName, sportName } = useLocation().state;
  const location = useLocation();
  // const user = location.pathname.split("/")[1];
  const { data: user } = useUserQuery({});
  const { pillar_id, sport_id } = useParams();

  const { data: superKpis, refetch: superRefetchKpis } = useSuperKpisQuery(
    { pillar_id },
    { skip: !pillar_id || user?.user_type !== "Supervisor" }
  );
  const { data: adminKpis, refetch: adminRefetchKpis } = useAdminKpisQuery(
    { pillar_id },
    { skip: !pillar_id || user?.user_type !== "Admin" }
  );

  const [superDeleteKpi] = useSuperDeleteKpiMutation();
  const [adminDeleteKpi] = useAdminDeleteKpiMutation();

  useEffect(() => {
    if (superKpis) setKpis(superKpis);
    if (adminKpis) setKpis(adminKpis);
  }, [superKpis, adminKpis]);

  return (
    <div className="admin-teams   m-2 sm:mx-10 my-2">
      <div className="mx-4 my-6">
        <SharedBreadCrumbs />
      </div>
      <div className="flex xs:flex-row flex-wrap justify-center sm:justify-start items-stretch gap-4 ">
        {kpis?.results.map((kpi) => {
          return (
            <ItemBox
              icon={kpi.icon || kpi.icon_url}
              name={kpi.name}
              url={`${kpi.id}/metrics`}
            >
              <EditKpi kpiData={kpi} />
              <DeleteButton
                deleteFun={() => {
                  if (user?.user_type === "Admin") {
                    adminDeleteKpi({ kpi_id: kpi.id })
                      .then(() => {
                        AppUtils.showNotificationFun(
                          "Success",
                          "Deleted",
                          "Kpi Deleted Successfully"
                        );
                        adminRefetchKpis();
                      })
                      .catch(() => {
                        AppUtils.showNotificationFun(
                          "Error",
                          "Wrong",
                          "Sorry Can't delete kpi now"
                        );
                      });
                  } else if (user?.user_type === "Supervisor") {
                    superDeleteKpi({ kpi_id: kpi.id })
                      .then(() => {
                        AppUtils.showNotificationFun(
                          "Success",
                          "Deleted",
                          "Kpi Deleted Successfully"
                        );
                        superRefetchKpis();
                      })
                      .catch(() => {
                        AppUtils.showNotificationFun(
                          "Error",
                          "Wrong",
                          "Sorry Can't delete kpi now"
                        );
                      });
                  }
                }}
                name={kpi.name}
                type="Kpi"
              />
            </ItemBox>
          );
        })}

        <AddKpi />
      </div>
    </div>
  );
};

export default PillarKpis;
