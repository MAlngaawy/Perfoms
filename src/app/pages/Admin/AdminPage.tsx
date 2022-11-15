import React, { useState } from "react";
import AppRadioGroub from "~/@main/components/AppRadioGroub";

type Props = {};

const AdminPage = (props: Props) => {
  const [checked, setChecked] = useState<"Teams" | "Sports" | "Users">("Teams");

  return (
    <div>
      <div className="flex gap-4 my-4 mx-8">
        <AppRadioGroub
          values={["Teams", "Sports", "Users"]}
          checked={checked}
          setChecked={setChecked}
        />
        {/* <Button onClick={() => setChecked("Attendance")}>Attendances</Button>
        <Button onClick={() => setChecked("Performance")}>Performance</Button>
        <Button onClick={() => setChecked("Team info")}>Team info</Button> */}
      </div>
    </div>
  );
};

export default AdminPage;
