import React, { useState } from "react";
import AppRadioGroub from "~/@main/components/AppRadioGroub";
import PlayerInfo from "./Tabs/PlayerInfo/PlayerInfo";
import PlayerBio from "./Tabs/PlayerBio/PlayerBio";
import PlayerMedia from "./Tabs/PlayerMedia/PlayerMedia";

const PlayerDetails = () => {
  const [checked, setChecked] = useState<"Info" | "Bio" | "Media">("Info");

  return (
    <div>
      <div className="m-6">
        <AppRadioGroub
          values={["Info", "Bio", "Media"]}
          checked={checked}
          setChecked={setChecked}
        />
      </div>
      <div>
        <div className={checked !== "Info" ? "hidden" : "block px-8"}>
          <PlayerInfo />
        </div>
        <div className={checked !== "Bio" ? "hidden" : "block px-8"}>
          <PlayerBio />
        </div>
        <div className={checked !== "Media" ? "hidden" : "block px-8"}>
          <PlayerMedia />
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
