import React, { useState } from "react";
import "./styles.css";
import { Grid, Menu, Button } from "@mantine/core";
import Card from "~/@main/components/Card";
import { playerData } from "../home/HomePage";
import SecondNav from "../home/organisms/SecondNav";
import { players } from "../home/HomePage";
import AppIcons from "~/@main/core/AppIcons";
import AttendanceTable from "./components/AttendanceTable";
import TotalAttendance from "./components/TotalAttendance";
import AttendanceCalender from "~/@main/components/AttendanceCalendar";
import CustomCalendar from "~/@main/components/Calendar";

// ===== dummy data =====

const playerSummary = [
  {
    name: "Strengths",
    number: 8,
    bgColor: "#00E0961A",
    textColor: "#27AE60",
    icon: "/assets/images/gym.png",
  },
  {
    name: "Weaknesses",
    number: 8,
    bgColor: "#EB57571A",
    textColor: "#EB5757",
    icon: "/assets/images/weakness.png",
  },
  {
    name: "Actions",
    number: 8,
    bgColor: "#2F80ED1A",
    textColor: "#2F80ED",
    icon: "/assets/images/tasks.png",
  },
  {
    name: "Recommendations",
    number: 8,
    bgColor: "#00A1FF1A",
    textColor: "#00A1FF",
    icon: "/assets/images/discussion.png",
  },
];

const scores = [
  {
    name: "kick",
    score: "2",
  },
  {
    name: "kick",
    score: "2",
  },
  {
    name: "kick",
    score: "2",
  },
  {
    name: "kick",
    score: "2",
  },
  {
    name: "kick",
    score: "2",
  },
  {
    name: "kick",
    score: "2",
  },
];

const text = {
  firstText: "Name of the metric “ left leg” ",
  secondText: "Name of the action “ need more practicing” ",
  detailedText:
    "10 Exercises to Improve Your Flexibility 1. Standing Quad Stretch. Stand with your feet together. ... 2. Standing Side Stretch. Standing with your feet together, lift your arms overhead. ... 3. Seated Hamstring Stretch. ... 4.",
};
// ==============

const ReportPage = () => {
  const [selectedplayer, setSelectedPlayer] = useState<any>(null);

  const [reportType, setReportType] =
    useState<"Performances" | "Attendances">("Performances");

  return (
    <div className="report-page px-5 mb-20">
      <div className="flex flex-col gap-4 sm:flex-row my-4 justify-between items-center">
        <SecondNav
          players={players}
          selectedplayer={selectedplayer}
          setSelectedPlayer={setSelectedPlayer}
        />
        <div className="flex flex-col md:flex-row justify-center items-center md:pt-0">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <button className="flex gap-2 text-sm justify-center items-center text-white bg-perfBlue py-2 px-6 rounded-3xl">
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
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
      {reportType === "Performances" ? (
        <div>
          <Grid columns={12} gutter={"sm"}>
            <Grid.Col sm={3} span={12}>
              <Card type="playerInfo" playerData={playerData} />
            </Grid.Col>
            <Grid.Col sm={9} span={12}>
              <Card type="performanceSummary" playerSummary={playerSummary} />
            </Grid.Col>
          </Grid>
          <Grid columns={12} gutter={"sm"} className="info mt-3">
            <Grid.Col sm={4} span={12}>
              <Card
                type="power"
                color="text-[#27AE60]"
                bg="bg-fadedGreen"
                powerType="Strength"
                scores={scores}
              />
            </Grid.Col>
            <Grid.Col sm={4} span={12}>
              <Card
                type="power"
                color="text-[#F2C94C]"
                bg="bg-fadedYellow"
                powerType="Strength"
                scores={scores}
              />
            </Grid.Col>
            <Grid.Col sm={4} span={12}>
              <Card
                type="power"
                color="text-[#EB5757]"
                bg="bg-fadedRed"
                powerType="Strength"
                scores={scores}
              />
            </Grid.Col>
          </Grid>
          <Grid columns={12} gutter={"sm"} className="info mt-3">
            <Grid.Col sm={6} span={12}>
              <Card
                type="action"
                header="Actions"
                firstText={text.firstText}
                secondText={text.secondText}
                detailedText={text.detailedText}
              />
            </Grid.Col>
            <Grid.Col sm={6} span={12}>
              <Card
                type="recommendation"
                header="Recommendations"
                firstText={text.firstText}
                secondText={text.secondText}
                detailedText={text.detailedText}
              />
            </Grid.Col>
          </Grid>{" "}
        </div>
      ) : (
        <div className="attendances">
          {/* Left Columns ( User Info And Note ) */}
          <Grid gutter={"sm"}>
            <Grid.Col span={12} sm={3}>
              <div className="flex flex-col gap-2">
                <Card type="playerInfo" playerData={playerData} />
                <div className="note bg-white rounded-3xl w-full p-4">
                  <h2 className="text-lg font-normal text-perfGray1 pb-4">
                    Overall notes
                  </h2>
                  <p className=" text-base font-normal text-perfGray3">
                    Fitness Flexibility 10 Exercises to Improve Your Flexibility
                    1. Standing Quad Stretch. Stand with your feet together. ...
                    2. Standing Side Stretch. Standing with your feet together,
                    lift your arms overhead. ... 3. Seated Hamstring Stretch.
                    ... 4. Standing Calf Stretch. ... 5. Shoulder Stretch. ...
                    6. The Forward Hang. ... 7. Back stretch. ... 8. Butterfly
                    Groin Stretch.
                  </p>
                </div>
              </div>
            </Grid.Col>

            {/* Right Column Attendance Charts And numbers */}
            <Grid.Col span={12} sm={9}>
              <Grid gutter={"sm"}>
                <Grid.Col span={12}>
                  <div className="main-teams bg-white p-4 rounded-3xl">
                    <h2 className="text-lg mb-4">
                      Attendance Report summary - main team
                    </h2>
                    <div className="flex gap-6 flex-wrap">
                      <PerformanceCard
                        bgColor="rgba(0, 224, 150, 0.1)"
                        textColor="#27AE60"
                        name="Attendance"
                        number={16}
                      >
                        <img
                          className="w-8 h-8"
                          src="/assets/images/gym_1.png"
                          alt="gym icon"
                        />
                      </PerformanceCard>

                      <PerformanceCard
                        bgColor="rgba(235, 87, 87, 0.1)"
                        textColor="#EB5757"
                        name="Absence"
                        number={3}
                      >
                        <img
                          className="w-8 h-8"
                          src="/assets/images/weakness_1.png"
                          alt="weakness icon"
                        />
                      </PerformanceCard>

                      <PerformanceCard
                        bgColor="rgba(47, 128, 237, 0.1)"
                        textColor="#2F80ED"
                        name="Total"
                        number={19}
                      >
                        <img
                          className="w-8 h-8"
                          src="/assets/images/tasks.png"
                          alt="weakness icon"
                        />
                      </PerformanceCard>
                    </div>
                  </div>
                </Grid.Col>
                {/* Attedance Summary Table */}
                <Grid.Col span={12} sm={8}>
                  <div className="bg-white flex flex-col xs:flex-row rounded-3xl p-4">
                    <AttendanceTable
                      data={[
                        { day: "2/10/2017", attendance: "ATTENDED" },
                        { day: "2/10/2017", attendance: "ATTENDED" },
                        { day: "2/10/2017", attendance: "ATTENDED" },
                        { day: "2/10/2017", attendance: "ATTENDED" },
                        { day: "2/10/2017", attendance: "ABSENT" },
                        { day: "2/10/2017", attendance: "ABSENT" },
                        { day: "2/10/2017", attendance: "ABSENT" },
                        { day: "2/10/2017", attendance: "ATTENDED" },
                        { day: "2/10/2017", attendance: "UPCOMING" },
                        { day: "2/10/2017", attendance: "UPCOMING" },
                        { day: "2/10/2017", attendance: "ATTENDED" },
                        { day: "2/10/2017", attendance: "ATTENDED" },
                      ]}
                    />
                    <AttendanceTable
                      data={[
                        { day: "2/10/2017", attendance: "ATTENDED" },
                        { day: "2/10/2017", attendance: "ATTENDED" },
                        { day: "2/10/2017", attendance: "ATTENDED" },
                        { day: "2/10/2017", attendance: "ATTENDED" },
                        { day: "2/10/2017", attendance: "ABSENT" },
                        { day: "2/10/2017", attendance: "ABSENT" },
                        { day: "2/10/2017", attendance: "ABSENT" },
                        { day: "2/10/2017", attendance: "ATTENDED" },
                        { day: "2/10/2017", attendance: "UPCOMING" },
                        { day: "2/10/2017", attendance: "UPCOMING" },
                        { day: "2/10/2017", attendance: "ATTENDED" },
                        { day: "2/10/2017", attendance: "ATTENDED" },
                      ]}
                    />
                  </div>
                </Grid.Col>

                <Grid.Col span={12} sm={4}>
                  <div className="flex flex-col gap-4">
                    {/* Total Attendace Pie Chart  */}
                    <div className="bg-white rounded-3xl">
                      <TotalAttendance
                        data={[
                          { day: "2/10/2017", attendance: "ATTENDED" },
                          { day: "2/10/2017", attendance: "ATTENDED" },
                          { day: "2/10/2017", attendance: "ATTENDED" },
                          { day: "2/10/2017", attendance: "ATTENDED" },
                          { day: "2/10/2017", attendance: "ABSENT" },
                          { day: "2/10/2017", attendance: "ABSENT" },
                          { day: "2/10/2017", attendance: "ABSENT" },
                          { day: "2/10/2017", attendance: "ATTENDED" },
                          { day: "2/10/2017", attendance: "UPCOMING" },
                          { day: "2/10/2017", attendance: "UPCOMING" },
                          { day: "2/10/2017", attendance: "ATTENDED" },
                          { day: "2/10/2017", attendance: "ATTENDED" },
                        ]}
                      />
                    </div>

                    {/* Attendance Calender */}
                    <CustomCalendar
                      pageName="report"
                      data={[
                        { day: "11/4/2022", attendance: "ATTENDED" },
                        { day: "11/6/2022", attendance: "ABSENT" },
                        { day: "11/11/2022", attendance: "ATTENDED" },
                        { day: "11/15/2022", attendance: "ATTENDED" },
                        { day: "11/22/2022", attendance: "ABSENT" },
                        { day: "11/25/2022", attendance: "ATTENDED" },
                        { day: "11/29/2022", attendance: "UPCOMING" },
                      ]}
                    />
                  </div>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default ReportPage;

export const PerformanceCard = ({
  number,
  name,
  bgColor,
  textColor,
  children,
}: {
  number: number;
  name: string;
  bgColor: string;
  textColor: string;
  children: any;
}) => {
  return (
    <div
      style={{ background: bgColor }}
      className="card flex items-start py-1 px-8 gap-4 font-semibold rounded-full cursor-pointer"
    >
      <div className="icon flex justify-center items-center">{children}</div>
      <div
        style={{ color: textColor }}
        className="info flex flex-col leading-4 text-xs"
      >
        <h2>{number}</h2>
        <h2>{name}</h2>
      </div>
    </div>
  );
};
