import React from "react";
import ReportNav from "./components/ReportNav";
import Card from "@main/components/Card";
import "./styles.css";

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

const ReportPage = () => {
  return (
    <div className="report-page">
      <ReportNav />
      <Card type="performanceSummary" playerSummary={playerSummary} />
    </div>
  );
};

export default ReportPage;
