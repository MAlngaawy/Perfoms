import { useEffect, useState } from "react";
import { Breadcrumbs, Switch } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { Menu } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import TimeFilter from "~/@main/components/TimeFilter";
import OverAll from "./Component/OverAll";
// import { useGetPlayerInfoQuery } from "~/app/store/coach/coachApi";
import { useGetSuperPlayerInfoQuery } from "~/app/store/supervisor/supervisorMainApi";
import { CoachPlayerInfo } from "~/app/store/types/coach-types";
import Detailed from "./Component/Detailed";
import { useAdminPlayerInfoQuery } from "~/app/store/clubManager/clubManagerApi";
import classNames from "classnames";
import TeamFilter from "~/@main/components/TeamFilter";
import { useGetPlayerInfoQuery } from "~/app/store/user/userApi";

type Props = {
  asComponent?: boolean;
};

const Player = ({ asComponent }: Props) => {
  const [showTimeFilter, setShowTimeFiter] = useState<boolean>(true);
  const [checked, setChecked] = useState(false);
  const [playerInfo, setPlayerInfo] = useState<CoachPlayerInfo>();
  const [reportType, setReportType] =
    useState<"Performances" | "Attendances" | "Certificates">("Performances");
  const { id } = useParams();

  const { data: generalsPlayerInfo } = useGetPlayerInfoQuery(
    { player_id: id },
    { skip: !id }
  );

  useEffect(() => {
    if (checked === true && reportType === "Attendances") {
      setShowTimeFiter(false);
    } else {
      setShowTimeFiter(true);
    }
  }, [checked, reportType]);

  useEffect(() => {
    if (generalsPlayerInfo) setPlayerInfo(generalsPlayerInfo);
  }, [generalsPlayerInfo]);

  const items = [
    { title: "Reports", href: "/main-reports" },
    { title: "Search Players", href: "/main-reports/search-players" },
    { title: playerInfo?.name, href: "" },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <div
      className={classNames("conatiner mx-auto", {
        "w-11/12 ": !asComponent,
      })}
    >
      {!asComponent && (
        <div className="mt-4">
          <Breadcrumbs className="text-perfGray3" separator="→">
            {items}
          </Breadcrumbs>
        </div>
      )}
      <div className="flex flex-col my-4 xs:flex-row items-center gap-4 justify-between">
        <div className="switch flex ">
          <Switch
            size="xl"
            sx={{
              ".mantine-Switch-track": {
                cursor: "pointer",
              },
            }}
            onLabel="Overall"
            offLabel="Detailed"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
        </div>
        <div className="flex gap-4 xs:justify-end items-center flex-wrap">
          <TeamFilter player_id={id} />
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <button className="flex gap-2 text-xs h-fit sm:text-sm justify-center items-center text-white bg-perfBlue py-2 px-2 xs:px-4 rounded-3xl">
                <span>{reportType}</span>
                <AppIcons
                  className="w-3 h-3"
                  icon="ChevronDownIcon:outline"
                />{" "}
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => setReportType("Performances")}>
                Performances
              </Menu.Item>
              <Menu.Item onClick={() => setReportType("Attendances")}>
                Attendances
              </Menu.Item>
              {!checked && (
                <Menu.Item onClick={() => setReportType("Certificates")}>
                  Certificates
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
          {showTimeFilter && <TimeFilter />}
        </div>
      </div>
      <div className="my-6">
        {checked ? (
          <div>
            <OverAll playerInfo={playerInfo} reportType={reportType} />
          </div>
        ) : (
          <div>
            <Detailed reportType={reportType} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
