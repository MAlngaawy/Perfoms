import React from "react";
import { Link } from "react-router-dom";

import AddSport from "./SubComponents/AddSport";
import DeleteButton from "./SubComponents/DeleteButton";
import EditSport from "./SubComponents/EditSport";
import { Avatar } from "@mantine/core";
import { useSuperSportQuery } from "~/app/store/supervisor/supervisorMainApi";
import {
  useAdminDeleteSportMutation,
  useAdminSportsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import { showNotification } from "@mantine/notifications";

type Props = {};

const Sports = (props: Props) => {
  const { data: sport } = useSuperSportQuery({});
  const { data: sports, refetch: adminRefetchSports } = useAdminSportsQuery({});

  const [adminDeleteSport] = useAdminDeleteSportMutation();

  const deleteSport = (sport_id: string) => {
    adminDeleteSport({
      sport_id: sport_id,
    })
      .then(() => {
        showNotification({
          message: "Sport Successfly Deleted",
          color: "green",
          title: "Deleted",
          styles: {
            root: {
              backgroundColor: "#27AE60",
              borderColor: "#27AE60",
              "&::before": { backgroundColor: "#fff" },
            },
            title: { color: "#fff" },
            description: { color: "#fff" },
            closeButton: {
              color: "#fff",
            },
          },
        });
        adminRefetchSports();
      })
      .catch((err) => {
        showNotification({
          message: "Can't delete sport",
          color: "red",
          title: "Wrong",
          styles: {
            root: {
              backgroundColor: "#EB5757",
              borderColor: "#EB5757",
              "&::before": { backgroundColor: "#fff" },
            },

            title: { color: "#fff" },
            description: { color: "#fff" },
            closeButton: {
              color: "#fff",
            },
          },
        });
      });
  };

  return (
    <div className="admin-teams flex flex-col xs:flex-row flex-wrap items-stretch gap-4 p-2 sm:p-6">
      {sports &&
        sports?.results.map((sport) => {
          return (
            <div
              key={sport.id}
              className="sport-card relative bg-white rounded-3xl p-12 flex flex-col justify-center items-center gap-4"
            >
              <Link
                to={`sports/${sport.id}/pillars`}
                state={{ sportName: sport.name }}
                className="bg-pagesBg rounded-full w-24 h-24 flex justify-center items-center"
              >
                <Avatar size={"lg"} src={sport?.icon_url} alt="icon" />
              </Link>
              <h2 className="text-xl text-perfBlue">{sport?.name}</h2>
              {/* Edit and Delete Buttons */}
              <div className="flex absolute right-2 top-5 gap-2">
                <EditSport sportData={sport} />
                <DeleteButton
                  name={sport.name}
                  deleteFun={() => deleteSport(JSON.stringify(sport.id))}
                  type="Sport"
                />
              </div>
            </div>
          );
        })}
      {sport && (
        <div className="sport-card relative bg-white rounded-3xl p-12 flex flex-col justify-center items-center gap-4">
          <Link
            to={`sports/${sport.id}/pillars`}
            state={{ sportName: sport.name }}
            className="bg-pagesBg rounded-full w-24 h-24 flex justify-center items-center"
          >
            <Avatar size={"xl"} src={sport?.icon_url} alt="icon" />
          </Link>
          <h2 className="text-xl text-perfBlue">{sport?.name}</h2>
        </div>
      )}
      {sports && <AddSport />}
    </div>
  );
};

export default Sports;
