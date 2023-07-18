// @flow
import React, { useEffect, useState } from "react";
import { Image, RingProgress, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import moment from "moment";
import { useFitDataMutation } from "~/app/store/health/healthApi";
import { useUserQuery } from "~/app/store/user/userApi";

import { useAdminPlayerInfoQuery } from "~/app/store/clubManager/clubManagerApi";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { Player } from "~/app/store/types/parent-types";

import { useDispatch, useSelector } from "react-redux";
import { useOnePlayerQuery } from "~/app/store/parent/parentApi";
import { useGetPlayerInfoQuery } from "~/app/store/coach/coachApi";
import { useGetSuperPlayerInfoQuery } from "~/app/store/supervisor/supervisorMainApi";
type Props = {
  player_id?: number | string | undefined;
};
type Analytics = { Gender?: string | undefined;
  Age?: number | string | undefined;}
 type CoachPlayerInfo = {
  id?: number;
  world_weight?: string | undefined;
  olympic_weight?: number | string | undefined;
  height?: number | string | undefined;
  analytics?: Analytics;
}

const HealthCalories = ({ player_id }: Props) => {
  const [maxCalories, setMaxCalories] = useState(1000); 
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const [playerInfoData, setPlayerInfoData] = useState<any>({
    olympic_weight: "70",
    height: "170",
    analytics: {
      Gender: "male",
      Age: "20"
    },
  });
  const { data: user } = useUserQuery({});

  const { data: parentPlayerInfoData, refetch: refetchPlayerData } =
    useOnePlayerQuery(
      { id: selectedPlayer?.id },
      {
        skip: !selectedPlayer?.id,
      }
    );

  const { data: coachPlayerInfo } = useGetPlayerInfoQuery(
    { player_id: player_id },
    { skip: user?.user_type !== "Coach" }
  );

  const { data: superPlayerInfo } = useGetSuperPlayerInfoQuery(
    { player_id: player_id },
    { skip: !player_id || user?.user_type !== "Supervisor" }
  );

  const { data: adminPlayerInfo, refetch: refetchAdminPlayerData } =
    useAdminPlayerInfoQuery(
      { player_id: player_id },
      { skip: !player_id || user?.user_type !== "Admin" }
    );

  const calculateMaxCalories = () => {
    const weightInKg = (+playerInfoData.olympic_weight) * 0.4536;
    const heightInCm = (+playerInfoData.height) * 2.54;
    let bmr: number;
    if (playerInfoData?.analytics?.Gender === "male") {
      // Calculate BMR for men
      bmr =
        66 +
        6.23 * weightInKg +
        12.7 * heightInCm -
        6.8 * parseFloat(playerInfoData?.analytics?.Age);
    } else {
      // Calculate BMR for women
      bmr =
        655 +
        4.35 * weightInKg +
        4.7 * heightInCm -
        4.7 * parseFloat(playerInfoData?.analytics?.Age);
    }

    // Adjust BMR based on activity level
    const activityFactor = 1.375; // Assuming lightly active
    const tdee = bmr * activityFactor;

    setMaxCalories(+tdee.toFixed(2)); // Set calculated calories with 2 decimal places
  };
  useEffect(() => {
    if (parentPlayerInfoData) setPlayerInfoData(parentPlayerInfoData);
    if (coachPlayerInfo) setPlayerInfoData(coachPlayerInfo);
    if (superPlayerInfo) setPlayerInfoData(superPlayerInfo);
    if (adminPlayerInfo) setPlayerInfoData(adminPlayerInfo);
  }, [parentPlayerInfoData, coachPlayerInfo, superPlayerInfo, adminPlayerInfo]);
  useEffect(() => {
    calculateMaxCalories();
  }, [playerInfoData]);
  const [
    fitData,
    { data: DataCalories, isSuccess, isLoading, isError, error },
  ] = useFitDataMutation();

  const [dateValue, setDateValue] = React.useState(new Date());
  const [data, setData] = React.useState({ progressValue: 0, Calories: 0 });

  React.useEffect(() => {
   
      user?.user_type==="Player"?
      fitData({
     dataType: "com.google.calories.expended",
     Date: moment(dateValue).format("L"),
     playerId:user?.id
   }):  fitData({
     dataType: "com.google.calories.expended",
     Date: moment(dateValue).format("L"),
     playerId:selectedPlayer?.id
   })
  }, [dateValue,user, selectedPlayer]);
  const calculateCalories = React.useCallback(() => {
    const Calories = [
      ...DataCalories?.map(
        (bucket: { dataset: [point: [{ value: [{ fpVal: number }] }]] }) =>
          bucket?.dataset?.map((pointItem: any) =>
            pointItem?.point?.map((pointValue: any) =>
              pointValue.value.map((val: { fpVal: number }) => val.fpVal)
            )
          )
      ),
    ]?.reduce((a: number, b: number): number => Number(a) + Number(b), 0);

    const progressValue = (+Calories / +maxCalories) * 100;
    return { progressValue: +progressValue || 0, Calories: +Calories || 0 };
  }, [dateValue,user, selectedPlayer, DataCalories]);

  React.useEffect(() => {
    if (isSuccess) {
      setData(calculateCalories());
    }
  }, [, isSuccess, isLoading, isError, error]);

  return (
    <div className="HealthCalories bg-white rounded-3xl w-full grid gap-9 p-4 h-full">
      <div className="flex justify-between items-center ">
        <h2 className="text-lg font-normal text-perfGray1 pb-4">Calories</h2>
        <div className="border-none   relative shadow-[0px_5px_25px_#0000001A] w-[115px] text-[#828282] rounded-md bg-white">
          <DatePicker
            maxDate={new Date()}
            value={dateValue}
            onChange={(val) => setDateValue(val as Date)}
            placeholder={"today"}
            maw={400}
            variant="unstyled"
            mx="auto"
            inputFormat="YYYY-MM-DD"
            classNames={{ input: "text-center" }}
            clearable={false}
            sx={{
              ".mantine-DatePicker-input": {
                background: "none",
              },
            }}
          />
        </div>
      </div>
      <div className=" w-full flex justify-center ">
        <div className="relative rounded-full flex justify-center ">
          <RingProgress
            size={250}
            thickness={10}
            roundCaps
            sections={[
              {
                value: data.progressValue > 100 ? 100 : data.progressValue,
                color: "#2563EB",
              },
            ]}
            classNames={{
              label:
                " border-[20px] border-[#FCF5E7] text-center grid justify-center items-center rounded-full bg-white h-[78%] w-[78%] m-auto z-0 left-auto right-auto ",
              root: "[&_circle]:duration-1000	 [&_circle]:transition-all   duration-1000  transition-all	first:[&_circle]:!stroke-[#FCF5E7] relative flex justify-center items-center",
            }}
            label={
              <div className=" grid justify-center items-center  rounded-full !w-full h-full  gap-5 ">
                <div className=" absolute inset-0 w-full h-full rounded-full shadow " />
                <Image
                  width={38}
                  height={38}
                  src={"/assets/images/fire.png"}
                  alt={"footprint"}
                  className="mx-auto"
                />
                <div className="text-2xl text-perfGray1">
                  {" "}
                  {data.Calories?.toFixed(1)} kcal
                  <p className="text-lg text-perfGray">Burned</p>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};
export default HealthCalories;
