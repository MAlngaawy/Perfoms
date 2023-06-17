import { Grid, Switch, Menu } from "@mantine/core";
import CustomCalendar from "../../../@main/components/Calendar";
import AddPlayer from "./molecules/AddPlayer";
import { useSelector } from "react-redux";
import {
  selectedPlayerFn,
  selectedPlayerTeamFn,
} from "~/app/store/parent/parentSlice";
import { Player } from "~/app/store/types/parent-types";
import TimeFilter from "~/@main/components/TimeFilter";
import TeamFilter from "~/@main/components/TeamFilter";
import {
  useMyPlayersQuery,
  usePlayerCertificatesQuery,
} from "~/app/store/parent/parentApi";
import UpcomingEventsCard from "~/@main/components/UpcomingEventsCard";
import HomeLoading from "./organisms/HomeLoading";
import HomePlayerInfoCard from "../../../@main/components/HomePlayerInfoCard";
import HomeTeamInfoCard from "../../../@main/components/HomeTeamInfoCard";
import PerformanceSummaryCard from "~/@main/components/PerformanceSummaryCard";
import NoPlayersComp from "~/@main/components/NoPlayersComp";
import { useGetPlayerInfoQuery, useUserQuery } from "~/app/store/user/userApi";
import { useState } from "react";
import TabsContainer from "~/@main/components/shared/TabsContainer";
import PlayerBio from "../players/player-details/Tabs/PlayerBio/PlayerBio";
import PlayerCertificatePage from "../player-certificate/PlayerCertificatePage";
import AppIcons from "~/@main/core/AppIcons/AppIcons";
import TotalAttendance from "../reports/components/TotalAttendance";
import AttendanceDaysReports from "../reports/components/AttendanceDaysReports";
import AttendancesSmallCards from "../reports/components/AttendancesSmallCards";
import Card from "~/@main/components/Card";
import PrintComp from "~/@main/PrintComp";
import ActionsCard from "~/@main/components/ActionsCard";
import RecommendationsCard from "~/@main/components/RecommendationsCard";
import OverAll from "../MainReports/SupPages/Players/Player/Component/OverAll";
import HealthPageContent from "../health/content/HealthPageContent";

export type Players = {
  name: string;
  icon_url: string;
};
const HomePage = () => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const { data: players, isLoading } = useMyPlayersQuery({});
  const { data: user } = useUserQuery({});
  const [reportType, setReportType] =
    useState<"Performances" | "Attendances" | "OverAll" | "Health">("OverAll");

  const [detailed, setDetailed] = useState<boolean>(false);

  const { data: playerCertificates } = usePlayerCertificatesQuery(
    { player_id: selectedPlayer?.id },
    { skip: !selectedPlayer }
  );

  const { data: generalsPlayerInfo } = useGetPlayerInfoQuery(
    { player_id: selectedPlayer?.id },
    { skip: !selectedPlayer?.id }
  );

  console.log("generalsPlayerInfo", generalsPlayerInfo);

  const [checked, setChecked] =
    useState<"Info" | "Bio" | "Certificates">("Info");

  if (isLoading)
    return (
      <div className="m-10">
        <HomeLoading />
      </div>
    );

  if (players?.results?.length === 0) {
    return <NoPlayersComp />;
  } else {
    return (
      <div className="home-page px-5 mb-20">
        <div className="my-4 flex xs:flex-row gap-2 justify-between items-center flex-wrap">
          <div className="flex gap-3 items-center">
            {user?.user_type === "Parent" && <AddPlayer />}

            {reportType === "OverAll" && (
              <TabsContainer
                selectedValue={checked}
                selectValueFun={setChecked}
                values={["Info", "Bio", "Certificates"]}
              />
            )}
          </div>
          <div className="flex gap-1 justify-center items-center md:pt-0 flex-wrap">
            {!["Health", "OverAll"].includes(reportType) && (
              <Switch
                size="xl"
                sx={{
                  ".mantine-Switch-track": {
                    cursor: "pointer",
                  },
                }}
                onLabel="Overall"
                offLabel="Detailed"
                checked={detailed}
                onChange={(event) => setDetailed(event.currentTarget.checked)}
                disabled={reportType === "Health" || reportType === "OverAll"}
              />
            )}
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <button className="flex gap-2 text-xs sm:text-sm justify-center items-center text-white bg-perfBlue py-2 px-4 xs:px-6 rounded-3xl">
                  <span>{reportType}</span>
                  <AppIcons
                    className="w-3 h-3"
                    icon="ChevronDownIcon:outline"
                  />{" "}
                </button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={() => setReportType("OverAll")}>
                  Over All
                </Menu.Item>
                <Menu.Item onClick={() => setReportType("Performances")}>
                  Performances
                </Menu.Item>
                <Menu.Item onClick={() => setReportType("Attendances")}>
                  Attendances
                </Menu.Item>
                {user?.user_type === "Parent" && (
                  <Menu.Item onClick={() => setReportType("Health")}>
                    Health
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
            <TeamFilter />
            <TimeFilter />
          </div>
        </div>
        {reportType === "OverAll" && selectedPlayer && selectedPlayerTeam ? (
          <>
            {checked === "Info" && (
              <div className="flex flex-col gap-4">
                <Grid columns={12} gutter={"md"}>
                  <Grid.Col sm={3} md={2.5} span={12}>
                    <HomePlayerInfoCard />
                  </Grid.Col>
                  <Grid.Col sm={9} md={9.5} span={12}>
                    {/* <Link to="/reports"> */}
                    <PerformanceSummaryCard />
                    {/* </Link> */}
                  </Grid.Col>
                </Grid>
                <Grid columns={12} gutter={"md"}>
                  <Grid.Col sm={4} span={12}>
                    <HomeTeamInfoCard />
                  </Grid.Col>
                  <Grid.Col sm={5} span={12}>
                    <CustomCalendar />
                  </Grid.Col>
                  <Grid.Col sm={3} span={12}>
                    <UpcomingEventsCard />
                  </Grid.Col>
                </Grid>
              </div>
            )}

            {checked === "Bio" && <PlayerBio />}
            {checked === "Certificates" && (
              <>
                {playerCertificates &&
                  playerCertificates?.results.map((certificate) => (
                    <PlayerCertificatePage
                      key={certificate.id}
                      certificateId={certificate.id}
                    />
                  ))}
              </>
            )}
          </>
        ) : reportType === "Health" ? (
          <div>
            <HealthPageContent />
          </div>
        ) : reportType === "Performances" && !detailed ? (
          <PrintComp>
            <div className="bg-pagesBg">
              <Grid columns={12} gutter={"xs"}>
                <Grid.Col sm={3} md={2.5} span={12}>
                  <HomePlayerInfoCard />
                </Grid.Col>
                <Grid.Col sm={9} md={9.5} span={12}>
                  <PerformanceSummaryCard />
                </Grid.Col>
              </Grid>
              <Grid columns={12} gutter={"xs"} className="info mt-3">
                <Grid.Col sm={4} span={12}>
                  <Card
                    color="text-[#27AE60]"
                    bg="bg-fadedGreen"
                    powerType="Strengths"
                    player_id={selectedPlayer?.id}
                  />
                </Grid.Col>
                <Grid.Col sm={4} span={12}>
                  <Card
                    color="text-[#F2C94C]"
                    bg="bg-fadedYellow"
                    powerType="Moderate"
                    player_id={selectedPlayer?.id}
                  />
                </Grid.Col>
                <Grid.Col sm={4} span={12}>
                  <Card
                    color="text-[#EB5757]"
                    bg="bg-fadedRed"
                    powerType="Weaknesses"
                    player_id={selectedPlayer?.id}
                  />
                </Grid.Col>
              </Grid>
              <Grid columns={12} gutter={"xs"} className="info mt-3">
                <Grid.Col sm={6} span={12}>
                  <ActionsCard player_id={selectedPlayer?.id} />
                </Grid.Col>
                <Grid.Col sm={6} span={12}>
                  <RecommendationsCard player_id={selectedPlayer?.id} />
                </Grid.Col>
              </Grid>{" "}
            </div>
          </PrintComp>
        ) : reportType === "Attendances" && !detailed ? (
          <PrintComp>
            <div className="attendances">
              <Grid gutter={"xs"}>
                <Grid.Col span={12} md={2.5}>
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 h-full">
                    <HomePlayerInfoCard />
                  </div>
                </Grid.Col>

                {/* Right Column Attendance Charts And numbers */}
                <Grid.Col span={12} md={9.5}>
                  <Grid gutter={"xs"}>
                    <Grid.Col span={12}>
                      <AttendancesSmallCards player_id={selectedPlayer.id} />
                    </Grid.Col>
                    {/* AtPlayerCertificatePagetedance Summary Table */}
                    <Grid.Col span={12} sm={7}>
                      <div className="bg-white h-full rounded-3xl p-4">
                        <AttendanceDaysReports />
                      </div>
                    </Grid.Col>

                    <Grid.Col span={12} sm={5}>
                      <div className="flex flex-col gap-4">
                        {/* Total Attendace Pie Chart  */}
                        <div className="bg-white rounded-3xl">
                          <TotalAttendance />
                        </div>

                        {/* Attendance Calendar */}
                        <CustomCalendar pageName="reports" />
                      </div>
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
            </div>
          </PrintComp>
        ) : detailed ? (
          <OverAll playerInfo={generalsPlayerInfo} reportType={reportType} />
        ) : (
          <HomeLoading />
        )}

        {/* {detailed && <Detailed reportType={reportType} />} */}
      </div>
    );
  }
};

export default HomePage;
