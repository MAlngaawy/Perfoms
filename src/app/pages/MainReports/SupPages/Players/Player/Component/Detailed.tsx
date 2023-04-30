import { Grid } from "@mantine/core";
import Card from "~/@main/components/Card";
import AttendanceDaysReports from "~/app/pages/reports/components/AttendanceDaysReports";
import TotalAttendance from "~/app/pages/reports/components/TotalAttendance";
import CustomCalendar from "~/@main/components/Calendar";
import ActionsCard from "~/@main/components/ActionsCard";
import RecommendationsCard from "~/@main/components/RecommendationsCard";
import HomePlayerInfoCard from "~/@main/components/HomePlayerInfoCard";
import PerformanceSummaryCard from "~/@main/components/PerformanceSummaryCard";
import AttendancesSmallCards from "~/app/pages/reports/components/AttendancesSmallCards";
import PrintComp from "~/@main/PrintComp";
import { useParams } from "react-router-dom";

type Props = {
  reportType: "Performances" | "Attendances";
};

const Detailed = ({ reportType }: Props) => {
  const { id } = useParams();

  return (
    <>
      {reportType === "Performances" ? (
        <PrintComp>
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
        <PrintComp>
          <div className="attendances">
            <Grid gutter={"sm"}>
              <Grid.Col span={12} sm={2.5}>
                <div className="flex flex-col xs:flex-row md:flex-col gap-2 h-full w-full">
                  <HomePlayerInfoCard player_id={id} />
                  {/* <div className="note bg-white rounded-3xl w-full p-4 h-full">
                    <h2 className="text-lg font-normal text-perfGray1 pb-4">
                      Overall notes
                    </h2>
                    <p className=" text-base font-normal text-perfGray3">
                      Fitness Flexibility 10 Exercises to Improve Your
                      Flexibility 1. Standing Quad Stretch. Stand with your feet
                      together. ... 2. Standing Side Stretch
                    </p>
                  </div> */}
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
                      <CustomCalendar player_id={id} pageName="reports" />
                    </div>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </Grid>
          </div>
        </PrintComp>
      ) : (
        "LOL"
      )}
    </>
  );
};

export default Detailed;
