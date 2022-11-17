import React, { useState } from "react";
import AppRadioGroub from "~/@main/components/AppRadioGroub";
import Sports from "./Components/Sports";
import Teams from "./Components/Teams";

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
        <h1>Uers Here</h1>
      </div>
    </div>
  );
};

export default AdminPage;