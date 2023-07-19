import { Grid } from "@mantine/core";
import Card from "~/@main/components/Card";
import AttendanceDaysReports from "~/app/pages/reports/components/AttendanceDaysReports";
import TotalAttendance from "~/app/pages/reports/components/TotalAttendance";
import ActionsCard from "~/@main/components/ActionsCard";
import RecommendationsCard from "~/@main/components/RecommendationsCard";
import HomePlayerInfoCard from "~/@main/components/HomePlayerInfoCard";
import PerformanceSummaryCard from "~/@main/components/PerformanceSummaryCard";
import AttendancesSmallCards from "~/app/pages/reports/components/AttendancesSmallCards";
import PrintComp from "~/@main/PrintComp";
import { useParams } from "react-router-dom";
import { usePlayerCertificatesQuery } from "~/app/store/parent/parentApi";
import PlayerCertificatePage from "~/app/pages/player-certificate/PlayerCertificatePage";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { useSelector } from "react-redux";
import { useGetPlayerInfoQuery } from "~/app/store/user/userApi";

type Props = {
  reportType:
    | "Performances"
    | "Attendances"
    | "Certificates"
    | "OverAll"
    | "Health";
};

const Detailed = ({ reportType }: Props) => {
  const selectedPlayer = useSelector(selectedPlayerFn);
  const { id: player_id } = useParams();
  const id = player_id || JSON.stringify(selectedPlayer.id);
  const { data: playerCertificates } = usePlayerCertificatesQuery(
    { player_id: id },
    { skip: !id }
  );

  const { data: playerData } = useGetPlayerInfoQuery(
    { player_id: id },
    { skip: !id }
  );

  return (
    <>
      {reportType === "Performances" ? (
        <PrintComp
          documentTitle={
            playerData?.name || selectedPlayer.name || "Player Name"
          }
        >
          <div className="bg-pagesBg">
            <Grid columns={12} gutter={"sm"}>
              <Grid.Col sm={3} md={2.5} span={12}>
                <HomePlayerInfoCard player_id={id} />
              </Grid.Col>
              <Grid.Col sm={9} md={9.5} span={12}>
                <PerformanceSummaryCard />
              </Grid.Col>
            </Grid>
            <Grid columns={12} gutter={"sm"} className="info mt-3">
              <Grid.Col sm={4} span={12}>
                <Card
                  color="text-[#27AE60]"
                  bg="bg-fadedGreen"
                  powerType="Strengths"
                  player_id={id}
                />
              </Grid.Col>
              <Grid.Col sm={4} span={12}>
                <Card
                  color="text-[#F2C94C]"
                  bg="bg-fadedYellow"
                  powerType="Moderate"
                  player_id={id}
                />
              </Grid.Col>
              <Grid.Col sm={4} span={12}>
                <Card
                  color="text-[#EB5757]"
                  bg="bg-fadedRed"
                  powerType="Weaknesses"
                  player_id={id}
                />
              </Grid.Col>
            </Grid>
            <Grid columns={12} gutter={"sm"} className="info mt-3">
              <Grid.Col sm={6} span={12}>
                <ActionsCard player_id={id} />
              </Grid.Col>
              <Grid.Col sm={6} span={12}>
                <RecommendationsCard player_id={id} />
              </Grid.Col>
            </Grid>{" "}
          </div>
        </PrintComp>
      ) : reportType === "Attendances" ? (
        <PrintComp documentTitle={playerData?.name || selectedPlayer.name}>
          <div className="attendances">
            <Grid gutter={"sm"}>
              <Grid.Col span={12} sm={2.5}>
                <div className="flex flex-col xs:flex-row md:flex-col gap-2 h-full w-full">
                  <HomePlayerInfoCard player_id={id} />
                </div>
              </Grid.Col>

              {/* Right Column Attendance Charts And numbers */}
              <Grid.Col span={12} sm={9.5}>
                <Grid gutter={"sm"}>
                  <Grid.Col span={12}>
                    <AttendancesSmallCards player_id={id} />
                  </Grid.Col>
                  {/* Attedance Summary Table */}
                  <Grid.Col span={12} md={8}>
                    <div className="bg-white overflow-scroll max-h-700 rounded-3xl p-4">
                      <AttendanceDaysReports player_id={id} />
                    </div>
                  </Grid.Col>

                  <Grid.Col span={12} md={4}>
                    <div className="flex flex-col gap-4">
                      <div className="bg-white rounded-3xl">
                        <TotalAttendance player_id={id} />
                      </div>
                      {/* <CustomCalendar player_id={id} pageName="reports" /> */}
                    </div>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </Grid>
          </div>
        </PrintComp>
      ) : (
        // <PlayerCertificatePage />
        <div className="m-2">
          <div className="overflow-scroll md:overflow-hidden max-w-full">
            {playerCertificates && playerCertificates?.results.length > 0 ? (
              playerCertificates?.results.map((certificate) => (
                <PlayerCertificatePage
                  key={certificate.id}
                  certificateId={certificate.id}
                />
              ))
            ) : (
              <div className="flex justify-center items-center">
                <h2 className="bg-white text-perfGray3 p-6 rounded-lg mt-10">
                  This player has no certificates yet
                </h2>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Detailed;
