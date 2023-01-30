import React, { useEffect, useState } from "react";
import { PerformanceCardProps } from "app/store/types/user-types";
import { HoverCard, Group, Skeleton } from "@mantine/core";
import NoReport from "~/app/pages/reports/components/NoReport";
import { useUserQuery } from "~/app/store/user/userApi";
// import {
//   useCoachPlayerKpisMetricsStrengthScoreQuery,
//   useCoachPlayerKpisMetricsWeaknessScoreQuery,
// } from "~/app/store/coach/coachApi";
// import {
//   usePlayerStrengthQuery,
//   usePlayerWeaknessQuery,
// } from "~/app/store/parent/parentApi";
// import {
//   useSuperPlayerKpisMetricsStrengthScoreQuery,
//   useSuperPlayerKpisMetricsWeaknessScoreQuery,
// } from "~/app/store/supervisor/supervisorMainApi";
// import {
//   useAdminPlayerKpisMetricsStrengthScoreQuery,
//   useAdminPlayerKpisMetricsWeaknessScoreQuery,
// } from "~/app/store/clubManager/clubManagerApi";

export const PerformanceCard = ({
  number,
  name,
  bgColor,
  textColor,
  children,
  powerType,
  player_id,
  data,
}: // data,
PerformanceCardProps) => {
  // const [data, setData] = useState<any>();
  // const { data: user } = useUserQuery({});

  // Fetch data for Parent
  // const { data: strength } = usePlayerStrengthQuery(
  //   { player_id: player_id },
  //   { skip: !player_id || user?.user_type !== "Parent" }
  // );
  // const { data: weakness } = usePlayerWeaknessQuery(
  //   { player_id: player_id },
  //   { skip: !player_id || user?.user_type !== "Parent" }
  // );

  // // Fetch data for coach
  // const { data: coachPlayerStrength } =
  //   useCoachPlayerKpisMetricsStrengthScoreQuery(
  //     { player_id: player_id },
  //     { skip: !player_id || user?.user_type !== "Coach" }
  //   );
  // const { data: coachPlayerWeakness } =
  //   useCoachPlayerKpisMetricsWeaknessScoreQuery(
  //     { player_id: player_id },
  //     { skip: !player_id || user?.user_type !== "Coach" }
  //   );

  // // Fetch Supervisor Data
  // const { data: superPlayerStrength } =
  //   useSuperPlayerKpisMetricsStrengthScoreQuery(
  //     { player_id: player_id },
  //     { skip: !player_id || user?.user_type !== "Supervisor" }
  //   );
  // const { data: superPlayerWeakness } =
  //   useSuperPlayerKpisMetricsWeaknessScoreQuery(
  //     { player_id: player_id },
  //     { skip: !player_id || user?.user_type !== "Supervisor" }
  //   );

  // // Fetch Supervisor Data
  // const { data: adminPlayerStrength } =
  //   useAdminPlayerKpisMetricsStrengthScoreQuery(
  //     { player_id: player_id },
  //     { skip: !player_id || user?.user_type !== "Admin" }
  //   );
  // const { data: adminPlayerWeakness } =
  //   useAdminPlayerKpisMetricsWeaknessScoreQuery(
  //     { player_id: player_id },
  //     { skip: !player_id || user?.user_type !== "Admin" }
  //   );

  // useEffect(() => {

  //   if (name === "Strengths") {
  //     if (strength) setData(strength);
  //     // if (coachPlayerStrength) setData(coachPlayerStrength);
  //     // if (superPlayerStrength) setData(superPlayerStrength);
  //     // if (adminPlayerStrength) setData(adminPlayerStrength);
  //   } else if (name === "Weaknesses") {
  //     if (weakness) setData(weakness);
  //     // if (coachPlayerWeakness) setData(coachPlayerWeakness);
  //     // if (superPlayerWeakness) setData(superPlayerWeakness);
  //     // if (adminPlayerWeakness) setData(adminPlayerWeakness);
  //   }
  // }, [
  //   strength,
  //   weakness,
  //   // coachPlayerStrength,
  //   // coachPlayerWeakness,
  //   // superPlayerStrength,
  //   // superPlayerWeakness,
  //   // adminPlayerStrength,
  //   // adminPlayerWeakness,
  // ]);

  return (
    <Group position="apart" className="rounded-sm p-0">
      <HoverCard width={300} shadow="md">
        <HoverCard.Target>
          <div
            style={{ background: bgColor }}
            className="card xs:w-1/4 min-w-fit flex py-2 pr-10 pl-4 gap-2 font-semibold rounded-full"
          >
            <div className="icon flex justify-center items-center">
              {children}
            </div>
            <div
              style={{ color: textColor }}
              className="info flex flex-col leading-4 text-xs"
            >
              <h2>{number}</h2>
              <h2>{name}</h2>
            </div>
          </div>
        </HoverCard.Target>
        {data && (
          <HoverCard.Dropdown className="p-0 ">
            <div
              style={{ background: bgColor }}
              className={`flex flex-col min-h-fit`}
            >
              <div className="power_type px-5 py-2 flex flex-row justify-between items-center">
                <span style={{ color: textColor }} className={` text-lg `}>
                  {name}
                </span>
              </div>
              <div
                style={{ background: bgColor }}
                className={`power_header  px-5 py-2 w-full flex justify-between`}
              >
                <h3 className="text-sm">Name</h3>
                {name !== "Actions" && name !== "Recommendations" && (
                  <h3 className="text-sm">Score</h3>
                )}
              </div>
              <div className="h-44 overflow-scroll">
                {data ? (
                  data?.map((power: any) => {
                    return (
                      <div
                        key={power.id}
                        className={`power_score px-5 py-2 flex flex-row justify-between`}
                      >
                        {power.name ? (
                          <div>
                            <h3 className="text-xs">
                              {" "}
                              name of the metric "{power.metric}"
                            </h3>
                            <h3 className="text-xs mt-1">
                              name of the action "{power.name}"
                            </h3>
                          </div>
                        ) : (
                          <h3 className="text-sm">{power.metric}</h3>
                        )}
                        {power.last_score && (
                          <h3
                            style={{ color: textColor }}
                            className={`font-semibold ${textColor} text-sm`}
                          >
                            {power.last_score}
                          </h3>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-2 w-full h-full">
                    <Skeleton width={"100%"} height={"100%"} radius="lg" />
                  </div>
                )}
                {data && data?.results?.length < 1 && <NoReport />}
              </div>
            </div>
          </HoverCard.Dropdown>
        )}
      </HoverCard>
    </Group>
  );
};
