import React from "react";
import { Flex, Radio } from "@mantine/core";

interface PlayerNavProps {
  showCard: string;
  setShowCard: (cardName: string) => void;
}

const PlayerNav = ({ showCard, setShowCard }: PlayerNavProps) => {
  console.log(showCard);
  return (
    <div className="flex flex-col m-1 md:m-3 md:flex-row gap-3 md:gap-0 items-center justify-between">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Radio.Group
          name="player data"
          withAsterisk
          sx={{
            ".mantine-Radio-root": {
              paddingTop: 0,
            },
            ".mantine-Group-root": {
              display: "flex",
              justifyContent: "center",
            },
            "@media (max-width: 518px)": {
              display: "flex",
              flexDirection: "column",
            },
          }}
          className="flex flex-col"
        >
          <Radio
            value="info"
            label="Player info"
            className={`bg-white py-2 px-2 md:px-4 ${
              showCard === "playerInfo" && "shadow-lg"
            } rounded-full flex flex-row`}
            sx={{
              ".mantine-Radio-icon": {
                color: "#2F80ED",
              },
              ".mantine-Radio-label": {
                fontSize: 18,
                color: showCard === "playerInfo" ? "#2F80ED" : "#000",
                cursor: "pointer",
              },
            }}
            onClick={() => setShowCard("playerInfo")}
          />
          <Radio
            value="attendance"
            label="Attendance"
            className={`bg-white py-2 px-4 ${
              showCard === "attendance" && "shadow-lg"
            } rounded-full flex flex-row`}
            sx={{
              ".mantine-Radio-icon": {
                color: "#2F80ED",
              },
              ".mantine-Radio-label": {
                fontSize: 18,
                color: showCard === "attendance" ? "#2F80ED" : "#000",
                cursor: "pointer",
              },
            }}
            onClick={() => setShowCard("attendance")}
          />
          <Radio
            value="perfomance"
            label="Performance"
            className={`bg-white py-2 px-4 ${
              showCard === "performance" && "shadow-lg"
            } rounded-full flex flex-row`}
            sx={{
              ".mantine-Radio-icon": {
                color: "#2F80ED",
              },
              ".mantine-Radio-label": {
                fontSize: 18,
                color: showCard === "performance" ? "#2F80ED" : "#000",
                cursor: "pointer",
              },
            }}
            onClick={() => setShowCard("performance")}
          />
        </Radio.Group>
        <button className="bg-perfBlue text-white text-lg py-1 px-5 shadow-lg md:self-end rounded-full flex flex-row">
          Certificate
        </button>
      </div>
      <button className="bg-perfBlue text-white text-sm py-1 px-5 shadow-lg md:self-end rounded-sm flex flex-row">
        Notify parent
      </button>
    </div>
  );
};

export default PlayerNav;
