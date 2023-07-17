import React, { createContext, useState } from "react";
import AppRadioGroub from "~/@main/components/AppRadioGroub";
import PlayerBio from "./Tabs/PlayerBio/PlayerBio";
import PlayerAlbums from "./Tabs/PlayerMedia/PlayerAlbums";
import PrintComp from "~/@main/PrintComp";
import Player from "../../MainReports/SupPages/Players/Player/Player";
import PlayerDataAnalytics from "./Tabs/PlayerDataAnalytics/PlayerDataAnalytics";
import HealthPageContent from "../../health/content/HealthPageContent";
import { useSelector } from "react-redux";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";

const EditModeContext = createContext<boolean>(false);
const PlayerDetails = () => {
  const selectedPlayer = useSelector(selectedPlayerFn);
  const [checked, setChecked] =
    useState<"Reports" | "Bio" | "Media" | "Analytics" | "Health">("Bio");
  const [editModeState, setEditModeState] = useState(false);

  return (
    <EditModeContext.Provider value={editModeState}>
      <div>
        <div className="flex mt-6 flex-col gap-4 sm:flex-row justify-between items-start mx-4 xs:mx-8">
          <div className=" container">
            <AppRadioGroub
              values={["Bio", "Media", "Reports", "Analytics", "Health"]}
              checked={checked}
              setChecked={setChecked}
            />
          </div>
          {checked === "Bio" && (
            <div
              className="edit border border-perfBlue mb-2 sm:m-0 text-perfBlue py-1 px-4 rounded-lg cursor-pointer hover:bg-perfBlue hover:text-white transform transition-all hover:scale-105 "
              onClick={() => setEditModeState(!editModeState)}
            >
              {editModeState ? "Done" : "Edit"}
            </div>
          )}
        </div>
        <div>
          <div className={checked !== "Reports" ? "hidden" : "block px-4"}>
            <Player asComponent />
          </div>
          <div className={checked !== "Bio" ? "hidden" : "block px-4"}>
            <PrintComp documentTitle={selectedPlayer.name}>
              <PlayerBio />
            </PrintComp>
          </div>
          <div className={checked !== "Media" ? "hidden" : "block px-4"}>
            <PlayerAlbums />
          </div>
          <div className={checked !== "Analytics" ? "hidden" : "block px-4"}>
            <PlayerDataAnalytics />
          </div>

          <div className={checked !== "Health" ? "hidden" : "block px-4 pt-6"}>
            <HealthPageContent />
          </div>
        </div>
      </div>
    </EditModeContext.Provider>
  );
};

export { EditModeContext };

export default PlayerDetails;
