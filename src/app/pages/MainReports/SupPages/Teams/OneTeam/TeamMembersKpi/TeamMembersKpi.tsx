import { Breadcrumbs, Menu } from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppIcons from "~/@main/core/AppIcons";
import TeamInfoCard from "../components/TeamInfoCard";
import TimeFilter from "~/@main/components/TimeFilter";
import PrintComp from "~/@main/PrintComp";
import { useCoachTeamInfoQuery } from "~/app/store/coach/coachApi";
import { useSuperTeamInfoQuery } from "~/app/store/supervisor/supervisorMainApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { useAdminTeamInfoQuery } from "~/app/store/clubManager/clubManagerApi";
import PerformancesCards from "./SupComponents/PerformancesCards";
import AttendancesCards from "./SupComponents/AttendancesCards";

type Props = {};

const TeamMembersKpi = (props: Props) => {
  const [reportType, setReportType] =
    useState<"Performances" | "Attendances">("Performances");
  const { sport_id, team_id } = useParams();
  const [kpiName, setKpiName] = useState<string>();

  // Fetch Team info
  const { data: coachTeamInfo } = useCoachTeamInfoQuery(
    { team_id: team_id },
    { skip: !team_id }
  );
  const { data: superTeamInfo } = useSuperTeamInfoQuery(
    { team_id: team_id },
    { skip: !team_id }
  );
  const { data: adminTeamInfo } = useAdminTeamInfoQuery(
    { team_id: team_id },
    { skip: !team_id }
  );

  const items = [
    { title: "Reports", href: "/main-reports" },
    { title: "Teams", href: `/main-reports/sports/${sport_id}/teams` },
    {
      title: `Team ${
        coachTeamInfo?.name || superTeamInfo?.name || adminTeamInfo?.name
      }`,
      href: `/main-reports/sports/${sport_id}/teams/${team_id}/kpis`,
    },
    {
      title: reportType === "Performances" ? kpiName : "Attendance",
      href: ``,
    },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  const navigate = useNavigate();

  return (
    <div className="container w-11/12 mx-auto">
      <div className="mt-4 mb-2">
        <Breadcrumbs className="text-perfGray3 flex-wrap gap-y-2" separator="→">
          {items}
        </Breadcrumbs>
      </div>

      <div className="flex gap-4 justify-end">
        {/* <Menu shadow="md" width={200}>
          <Menu.Target>
            <button className="flex gap-2 text-xs sm:text-sm justify-center items-center text-white bg-perfBlue py-2 px-2 xs:px-4 rounded-3xl">
              <span>{reportType}</span>
              <AppIcons className="w-3 h-3" icon="ChevronDownIcon:outline" />
            </button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={() => setReportType("Performances")}>
              Performances
            </Menu.Item>
            <Menu.Item onClick={() => setReportType("Attendances")}>
              Attendances
            </Menu.Item>
          </Menu.Dropdown>
        </Menu> */}
        <TimeFilter />
      </div>
      <PrintComp>
        <div className="reports items-stretch justify-center xs:justify-start flex flex-wrap gap-4 my-6">
          <div>
            <TeamInfoCard
              TeamInfoData={coachTeamInfo || superTeamInfo || adminTeamInfo}
            />
          </div>

          {reportType === "Performances" ? (
            <PerformancesCards setKpiName={setKpiName} />
          ) : (
            <AttendancesCards />
          )}
        </div>
      </PrintComp>
    </div>
  );
};

export default TeamMembersKpi;
