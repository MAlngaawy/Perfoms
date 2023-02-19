import React, { createContext, useState } from "react";
import AppRadioGroub from "~/@main/components/AppRadioGroub";
import PlayerInfo from "./Tabs/PlayerInfo/PlayerInfo";
import PlayerBio from "./Tabs/PlayerBio/PlayerBio";
import PlayerAlbums from "./Tabs/PlayerMedia/PlayerAlbums";
import PrintComp from "~/@main/PrintComp";

const EditModeContext = createContext<boolean>(false);
const PlayerDetails = () => {
  const [checked, setChecked] = useState<"Info" | "Bio" | "Media">("Info");
  const [editModeState, setEditModeState] = useState(false);

  return (
    <EditModeContext.Provider value={editModeState}>
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-center mx-8">
          <div className="my-6">
            <AppRadioGroub
              values={["Info", "Bio", "Media"]}
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
          <div className={checked !== "Info" ? "hidden" : "block px-4"}>
            <PlayerInfo />
          </div>
          <div className={checked !== "Bio" ? "hidden" : "block px-4"}>
            <PrintComp>
              <PlayerBio />
            </PrintComp>
          </div>
          <div className={checked !== "Media" ? "hidden" : "block px-4"}>
            <PlayerAlbums />
          </div>
        </div>
      </div>
    </EditModeContext.Provider>
  );
};

export { EditModeContext };

export default PlayerDetails;
