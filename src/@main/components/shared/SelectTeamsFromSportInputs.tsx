import { Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  useAdminSportsQuery,
  useAdminTeamsStatisticsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { PlayerSport, SportTeam } from "~/app/store/types/parent-types";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {
  setFormInputsData: any;
  formInputsData: any;
  setSelectedTeam: any;
  selectedTeam: any;
  handleChange: any;
  errors: any;
};

const SelectTeamsFromSportInputs = ({
  setFormInputsData,
  formInputsData,
  setSelectedTeam,
  selectedTeam,
  handleChange,
  errors,
}: Props) => {
  const { data: user } = useUserQuery(null);
  const [sports, setSports] = useState<any>([]);
  const [teams, setTeams] = React.useState<any>([]);
  const [selectedSport, setSelectedSport] = useState<number>(0);

  // Handle fetching club Sport Teams to select wich team will be added
  // fetch club sports
  const { data: clubSports } = useAdminSportsQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );
  // fetch sport Teams data
  const { data: sportTeams } = useAdminTeamsStatisticsQuery(
    { sport_id: selectedSport },
    { skip: !selectedSport }
  );

  useEffect(() => {
    setTeams([]);
    setFormInputsData({
      ...formInputsData,
      team: "",
    });
    setSelectedTeam(null);

    if (clubSports && clubSports.results) {
      setSports(clubSports.results);
    }
    if (sportTeams && sportTeams.results.length > 0) {
      setTeams(sportTeams.results);
    } else {
      setTeams([]);
      setFormInputsData({
        ...formInputsData,
        team: "",
      });
      setSelectedTeam(null);
    }
  }, [clubSports, sportTeams, selectedSport]);

  return (
    <>
      {/* Sport and team */}
      <div className="flex gap-4 w-full my-4">
        <div className="w-1/2">
          <Select
            error={errors.sport}
            id="sport"
            required
            className="w-full"
            label="Sport"
            name="sport"
            sx={{
              ".mantine-Select-input": {
                background: "none",
                border: 0,
                borderBottom: "1px solid",
                borderRadius: 0,
                width: "100%",
              },
            }}
            data={sports?.map((item: Partial<PlayerSport>) => {
              return { value: item.id, label: item.name };
            })}
            onChange={(e) => {
              e && setSelectedSport(+e);
              if (e) {
                handleChange("sport", +e);
              }
            }}
          />
        </div>

        <div className="w-1/2">
          <Select
            id="team"
            error={errors.team}
            required
            className="w-full"
            label="Team"
            name="team"
            value={selectedTeam}
            onChange={(e) => {
              if (e) {
                setSelectedTeam(e);
                handleChange("team", +e);
              }
            }}
            sx={{
              ".mantine-Select-input": {
                background: "none",
                border: 0,
                borderBottom: "1px solid",
                borderRadius: 0,
                width: "100%",
              },
            }}
            data={teams?.map((item: Partial<SportTeam>) => {
              return { label: item.name, value: item.id };
            })}
          />
        </div>
      </div>
    </>
  );
};

export default SelectTeamsFromSportInputs;
