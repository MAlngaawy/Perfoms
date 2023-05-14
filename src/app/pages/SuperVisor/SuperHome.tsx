import React, { useEffect, useState } from "react";
import AppRadioGroub from "~/@main/components/AppRadioGroub";
import Sports from "~/@main/components/ManagerComponents/Sports";
import Teams from "~/@main/components/ManagerComponents/Teams";
import Users from "~/@main/components/ManagerComponents/Users";
import SwitchButton from "~/@main/components/SwitchButton";

type Props = {};

const SuperHome = (props: Props) => {
  const [checked, setChecked] = useState<"Teams" | "Sports" | "Users">(
    //@ts-ignore
    localStorage.getItem("checked") || "Teams"
  );

  useEffect(() => {
    localStorage.setItem("checked", checked);
  }, [checked]);

  return (
    <div className="m-6">
      <div className="flex items-center flex-wrap gap-1 xs:gap-4">
        {/* <AppRadioGroub
            values={["Attendance", "Performance", "Team info"]}
            checked={checked}
            setChecked={setChecked}
          /> */}
        <SwitchButton
          checked={checked}
          setChecked={setChecked}
          type={"Teams"}
        />
        <SwitchButton
          checked={checked}
          setChecked={setChecked}
          type={"Sports"}
        />
      </div>

      <div className={checked !== "Teams" ? "hidden" : "block"}>
        <Teams />
      </div>
      <div className={checked !== "Sports" ? "hidden" : "block"}>
        <Sports />
      </div>
    </div>
  );
};

export default SuperHome;
