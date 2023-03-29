import React, { useState } from "react";
import AppRadioGroub from "~/@main/components/AppRadioGroub";
import Sports from "../../../@main/components/ManagerComponents/Sports";
import Teams from "../../../@main/components/ManagerComponents/Teams";
import Users from "../../../@main/components/ManagerComponents/Users";

type Props = {};

const AdminPage = (props: Props) => {
  const [checked, setChecked] = useState<"Teams" | "Sports" | "Users">("Teams");

  return (
    <div>
      <div className="flex gap-2 xs:gap-4  p-2 sm:p-6 sm:pb-0">
        <AppRadioGroub
          values={["Teams", "Sports", "Users"]}
          checked={checked}
          setChecked={setChecked}
        />
      </div>

      <div className={checked !== "Teams" ? "hidden" : "block"}>
        <Teams />
      </div>
      <div className={checked !== "Sports" ? "hidden" : "block"}>
        <Sports />
      </div>
      <div className={checked !== "Users" ? "hidden" : "block"}>
        <h1>
          <Users />
        </h1>
      </div>
    </div>
  );
};

export default AdminPage;
