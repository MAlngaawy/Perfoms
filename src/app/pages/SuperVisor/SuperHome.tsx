import React, { useState } from "react";
import AppRadioGroub from "~/@main/components/AppRadioGroub";
import Sports from "~/@main/components/ManagerComponents/Sports";
import Teams from "~/@main/components/ManagerComponents/Teams";
import Users from "~/@main/components/ManagerComponents/Users";
import { useKpisQuery } from "~/app/store/Supervisor/supervisorApi";

type Props = {};

const SuperHome = (props: Props) => {
  const [checked, setChecked] = useState<"Teams" | "Sports">("Teams");

  const data = useKpisQuery({ page: 1 });

  console.log(data);

  return (
    <div>
      <div className="flex gap-2 xs:gap-4  p-2 sm:p-6 sm:pb-0">
        <AppRadioGroub
          values={["Teams", "Sports", "Users"]}
          checked={checked}
          setChecked={setChecked}
        />
        {/* <Button onClick={() => setChecked("Attendance")}>Attendances</Button>
        <Button onClick={() => setChecked("Performance")}>Performance</Button>
        <Button onClick={() => setChecked("Team info")}>Team info</Button> */}
      </div>

      <div className={checked !== "Teams" ? "hidden" : "block"}>
        {/* <Teams /> */}
      </div>
      <div className={checked !== "Sports" ? "hidden" : "block"}>
        <Sports />
      </div>
    </div>
  );
};

export default SuperHome;
