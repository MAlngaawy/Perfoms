import TimeFilter from "~/@main/components/TimeFilter";
import TeamFilter from "~/@main/components/TeamFilter";
import { useFitDataMutation } from "~/app/store/health/healthApi";
import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "@mantine/core";
import moment from "moment";
import HealthPageContent from "./content/HealthPageContent";
import { useSelector } from "react-redux";
import { useOnePlayerQuery } from "~/app/store/parent/parentApi";
import { Player } from "~/app/store/types/parent-types";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { useUserQuery } from "~/app/store/user/userApi";

export type Players = {
  name: string;
  icon_url: string;
};

const HealthPage = () => {

  const [fitData, { data, isSuccess, isLoading, isError, error }] =
  useFitDataMutation();
  
  const navigate = useNavigate();
  const [bool, setbool] = useState(true);
  const [auth, setauth] = useState(false);
  const { data: user } = useUserQuery({});
  const selectedPlayer: Player = useSelector(selectedPlayerFn);

  useEffect(() => {
  if(!!user||!!selectedPlayer)
    { 
    if (user?.user_type === "Player") {
    fitData({
      dataType: "com.google.step_count.delta",
      date: moment(new Date()).format("L"),
      playerId:user?.id
    })} else { fitData({
      dataType: "com.google.step_count.delta",
      Date: moment(new Date()).format("L"),
      playerId:selectedPlayer?.id
    })
  }
   }
  }, [user,selectedPlayer]);
  useEffect(() => {
    if (isSuccess) setbool(false);
    if (isError) {
      setauth(true);
     
      setTimeout(() => { 
        navigate("/health/authorize");
      }, 3000);
    }
  }, [isSuccess, isLoading, isError, error, data]);
  const customLoader = (
    <div className="h-screen w-full grid justify-center items-center fixed inset-0">
      <HeartIcon className="w-[25%] animate-ping text-red  m-auto" />
      <h1 className="text-black text-center text-3xl font-semibold animate-bounce  ">
        {" "}
        Please Wait....{" "}
      </h1>
    </div>
  );
  const customLoader2 = (
    <div className="h-screen w-full grid justify-center items-center fixed inset-0">
      <h1 className="text-black text-center text-3xl font-semibold   ">
        {" "}
    
         😥 {error?.data?.message? error?.data?.message as string:  `Some things was wrong   \n  Please Authorize by Google `}
      </h1>
    </div>
  );
  return (
    <div className="home-page px-5 mb-20 relative min-h-screen w-full">
      <LoadingOverlay
        visible={bool}
        loader={auth ? customLoader2 : customLoader}
        overlayBlur={2}
      />

      <div className="my-4 flex xs:flex-row gap-2 justify-between items-center">
        <div className="flex gap-3 items-center"></div>
        <div className="flex gap-1 justify-center items-center md:pt-0">
          <TeamFilter />
          <TimeFilter />
        </div>
      </div>
      <HealthPageContent />
    </div>
  );
};

export default HealthPage;
