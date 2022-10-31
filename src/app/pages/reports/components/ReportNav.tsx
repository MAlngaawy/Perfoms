import { Button } from "@main/components/Button";
import React from "react";

function ReportNav() {
  return (
    <div className="top_nav flex justify-between items-center">
      <div className="flex flex-col items-start">
        <Button label="< back" />
        <span className="text-perfGray3 text-sm">Home / report</span>
      </div>
      <div className="club_logo">
        <h1>CLUB LOGO</h1>
      </div>
    </div>
  );
}

export default ReportNav;
