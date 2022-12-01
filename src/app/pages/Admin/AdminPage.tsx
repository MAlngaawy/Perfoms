import React, { useState } from "react";
import AppRadioGroub from "~/@main/components/AppRadioGroub";
import { useKpisQuery } from "~/app/store/Supervisor/supervisorApi";
import Sports from "../../../@main/components/ManagerComponents/Sports";
import Teams from "../../../@main/components/ManagerComponents/Teams";
import Users from "../../../@main/components/ManagerComponents/Users";

type Props = {};

const AdminPage = (props: Props) => {
  const [checked, setChecked] = useState<"Teams" | "Sports" | "Users">("Teams");

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
        <Teams
          data={[
            {
              id: 1,
              icon: "https://freepngimg.com/thumb/football/1-football-ball-png-image-thumb.png",
              name: "14Th Team",
              sport: "Taekwondo",
              age: { from: 12, to: 15 },
              players: 30,
            },
            {
              id: 2,
              icon: "https://freepngimg.com/thumb/football/1-football-ball-png-image-thumb.png",
              name: "14Th Team",
              sport: "Taekwondo",
              age: { from: 15, to: 18 },
              players: 15,
            },
          ]}
        />
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
