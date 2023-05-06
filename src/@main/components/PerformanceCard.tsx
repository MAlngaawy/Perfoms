import { PerformanceCardProps } from "app/store/types/user-types";
import { HoverCard, Group, Skeleton } from "@mantine/core";
import NoReport from "~/app/pages/reports/components/NoReport";

export const PerformanceCard = ({
  number,
  name,
  bgColor,
  textColor,
  children,
  data,
}: // data,
PerformanceCardProps) => {
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
                  data
                    ?.filter((item: any) => item.avg_score > 0) // Don't show the item if avg score is 0
                    .map((power: any) => {
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
                          {power.avg_score && (
                            <h3
                              style={{ color: textColor }}
                              className={`font-semibold ${textColor} text-sm`}
                            >
                              {power.avg_score}
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
