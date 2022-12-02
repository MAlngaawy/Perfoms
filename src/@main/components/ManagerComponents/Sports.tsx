import React from "react";
import { Link } from "react-router-dom";

import AddSport from "./SubComponents/AddSport";
import DeleteButton from "./SubComponents/DeleteButton";
import EditSport from "./SubComponents/EditSport";
import { Avatar } from "@mantine/core";
import { useSuperSportQuery } from "~/app/store/supervisor/supervisorMainApi";

type Props = {};

const Sports = (props: Props) => {
  const { data: sport } = useSuperSportQuery({});
  return (
    <div className="admin-teams flex flex-col xs:flex-row flex-wrap items-stretch gap-4 p-2 sm:p-6">
      {/* {sports.map((sport) => { */}
      {/* return ( */}
      <div className="sport-card relative bg-white rounded-3xl p-12 flex flex-col justify-center items-center gap-4">
        <Link
          to={`sports/1`}
          className="bg-pagesBg rounded-full w-24 h-24 flex justify-center items-center"
        >
          <Avatar className="w-3/5" src={sport?.icon} alt="icon" />
        </Link>
        <h2 className="text-xl text-perfBlue">{sport?.name}</h2>
        {/* Edit and Delete Buttons */}
        <div className="flex absolute right-2 top-5 gap-2">
          {/* <EditSport sportName={sport.name} sportId={sport.id} />
              <DeleteButton name={sport.name} id={sport.id} type="Sport" /> */}
        </div>
      </div>
      {/* ); */}
      {/* })} */}
      {/* <AddSport /> */}
    </div>
  );
};

export default Sports;
