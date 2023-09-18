// @flow
import * as React from "react";
import { Image, RingProgress, ActionIcon } from "@mantine/core";
import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import moment from "moment"
import { DatePicker } from "@mantine/dates";
import { useFitDataMutation } from "~/app/store/health/healthApi";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useUserQuery } from "~/app/store/user/userApi";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";
import { useSelector } from "react-redux";
import { Player } from "~/app/store/types/parent-types";
type Props = {};
const HealthSleep = (props: Props) => {

  const [dateValue, setDateValue] = React.useState<Date>(new Date());
  const [data, setData] = React.useState<[{ value: number, color: "#E19809" }, { value: number, color: "#2563EB" }]>([{ value: 0, color: "#E19809" }, { value: 0, color: "#2563EB" }]);
  const { data: user } = useUserQuery({});
  const selectedPlayer: Player = useSelector(selectedPlayerFn);




  const [
    FitDataActivity,
    { data: DataActivity, isSuccess: isSuccessActivity, isLoading: isLoadingActivity, isError: isErrorActivity, error: errorActivity },
  ] = useFitDataMutation();
  const [
    FitDataSleep,
    { data: DataSleep, isSuccess: isSuccessSleep, isLoading: isLoadingSleep, isError: isErrorSleep, error: errorSleep },
  ] = useFitDataMutation();


  React.useEffect(() => {
    if (!!user || !!selectedPlayer) {
      if (user?.user_type === "Player") {
        FitDataSleep({
          dataType: "com.google.sleep.segment",
          Date: moment(dateValue).format("L"),
          playerId: user?.id,
        });
        FitDataActivity({
          dataType: "com.google.activity.segment",
          Date: moment(dateValue).format("L"),
          playerId: user?.id,
        });
      } else {
        FitDataSleep({
          dataType: "com.google.sleep.segment",
          Date: moment(dateValue).format("L"),
          playerId: selectedPlayer?.id,
        });
        FitDataActivity({
          dataType: "com.google.activity.segment",
          Date: moment(dateValue).format("L"),
          playerId: selectedPlayer?.id,
        });
      }
    }
  }, [dateValue,user, selectedPlayer]);

  React.useEffect(() => {
    if (isSuccessActivity) {
      setData((prev) => {
        prev[0] = { ...prev[0], value: (((calculateActivity() || 0) / 24) * 100) };
        return [...prev];
      })
    }
  }, [DataActivity, isSuccessActivity, isLoadingActivity, isErrorActivity, errorActivity]);
  React.useEffect(() => {
    if (isSuccessSleep) {
      setData((prev) => {
        prev[1] = { ...prev[1], value: (((calculateSleep() || 0) / 24) * 100) };
        return [...prev];
      })
    }
  }, [DataSleep, isSuccessSleep, isLoadingSleep, isErrorSleep, errorSleep]);

  const calculateActivity = React.useCallback(() => {

    const startTime = [
      ...DataActivity?.map(
        (bucket: { dataset: [point: [{ startTimeNanos: string }]] }) =>
          bucket?.dataset?.map((pointItem: any) =>
            pointItem?.point?.map(
              (pointValue: any) => pointValue.startTimeNanos / (1000000000 * 60 * 60)

            )
          )
      ),
    ]
    const endTime = [
      ...DataActivity?.map(
        (bucket: { dataset: [point: [{ endTimeNanos: string }]] }) =>
          bucket?.dataset?.map((pointItem: any) =>
            pointItem?.point?.map((pointValue: any) => pointValue.endTimeNanos / (1000000000 * 60 * 60))
          )
      ),
    ]

    const Time = (endTime.map((num, idx) => (parseInt(num)) - (parseInt(startTime[idx]))))
      ?.reduce((a: number, b: number): number => Number(a) + Number(b), 0)
      ;
    return Time
  }, [DataActivity, dateValue,user, selectedPlayer, isSuccessActivity]);

  const calculateSleep = React.useCallback(() => {

    const startTime = [
      ...DataSleep?.map(
        (bucket: { dataset: [point: [{ startTimeNanos: string }]] }) =>
          bucket?.dataset?.map((pointItem: any) =>
            pointItem?.point?.map(
              (pointValue: any) => pointValue.startTimeNanos / (1000000000 * 60 * 60)

            )
          )
      ),
    ]
    const endTime = [
      ...DataSleep?.map(
        (bucket: { dataset: [point: [{ endTimeNanos: string }]] }) =>
          bucket?.dataset?.map((pointItem: any) =>
            pointItem?.point?.map((pointValue: any) => pointValue.endTimeNanos / (1000000000 * 60 * 60))
          )
      ),
    ]

    const Time = (endTime.map((num, idx) => (parseInt(num)) - (parseInt(startTime[idx]))))
      ?.reduce((a: number, b: number): number => Number(a) + Number(b), 0)


    return Time
  }, [DataSleep, dateValue,user, selectedPlayer, isSuccessSleep]);



  return (
    <div className="HealthSleep bg-white rounded-3xl w-full grid gap-9 p-4 h-full">
      <div className="flex justify-between items-center ">
        <h2 className="text-lg font-normal text-perfGray1 pb-4">Sleep</h2>
        <span className="text-sm  text-perfGray3">{moment(dateValue).format('DD MMM')} </span>
      </div>

      <Swiper

        modules={[Navigation]}
        loop={true}
        dir="rtl" className="mySwiper w-full "
        navigation={{
          nextEl: '.slider__next',
          prevEl: '.slider__prev',
        }}
      >
        {[6, 5, 4, 3, 2, 1, 0].map((item, index) => (
          <SwiperSlide key={item} dir="ltr">
            <div className=" w-full flex justify-center gap-2 px-3">
              <div className=" gap-4 flex flex-col">
                <div className="flex-1 gap-2 flex flex-col">
                  <div className=" gap-2 flex justify-start items-center ">
                    <div className="w-[15px] h-[15px] rounded-full bg-perfBlue" />{" "}
                    {((data[1].value / 100) * 24).toFixed(0)} hr
                  </div>
                  sleep
                </div>
                <div className="flex-1 gap-4 flex flex-col">
                  <div className="flex-1 gap-2 flex flex-col">
                    <div className=" gap-2 flex justify-start items-center ">
                      <div className="w-[15px] h-[15px] rounded-full bg-[#E19809]" />{" "}
                      {((data[0].value / 100) * 24).toFixed(0)} hr
                    </div>
                    activities
                  </div>
                </div>
              </div>
              <div className="relative rounded-full flex justify-center ">
                <RingProgress
                  size={200}
                  thickness={25}
                  sections={data}
                  classNames={{
                    label:
                      "shadow bg-white h-[55%] w-[55%] text-center grid justify-center items-center rounded-full  m-auto z-0 left-auto right-auto ",
                    root: `[&_circle]:duration-1000	 [&_circle]:transition-all   duration-1000  transition-all last:[&_circle]:!stroke-[45px] [&:nth-child(2)]:[&_circle]:!stroke-[36px] last:[&_circle]:drop-shadow-xl [&:nth-child(2)]:[&_circle]:!stroke-[36px] [&:nth-child(2)]:[&_circle]:!drop-shadow-xl drop-shadow-lg 
                    first:[&_circle]:drop-shadow	first:[&_circle]:stroke-[#BDBDBD] relative flex justify-center items-center`,
                  }}
                  label={
                    <div className="grid justify-center items-center gap-2">
                      <Image
                        width={29}
                        height={29}
                        src={
                          ((data[0].value / 100) * 24 < 8 || (data[1].value / 100) * 24 > 8) ? "/assets/images/GroupBadFace.png" :
                            ((data[0].value / 100) * 24 < 8 && (data[0].value / 100) * 24 > 6 &&
                              (data[1].value / 100) * 24 < 12) && (data[1].value / 100) * 24 > 8 ? "/assets/images/Groupface.png" :
                              ((data[0].value / 100) * 24 < 8 && (data[0].value / 100) * 24 > 6 &&
                                (data[1].value / 100) * 24 > 12) ? "/assets/images/GroupExcellentFace.png" : "/assets/images/Groupface.png"

                        }
                        alt={"footprint"}
                        className="mx-auto"
                      />
                      <div className={`text-lg ${((data[0].value / 100) * 24 < 8 || (data[1].value / 100) * 24 > 8) ? "text-red" :
                        ((data[0].value / 100) * 24 < 8 && (data[0].value / 100) * 24 > 6 &&
                          (data[1].value / 100) * 24 < 12) && (data[1].value / 100) * 24 > 8 ? "text-green" : "text-perfGray1"}`}>
                        {((data[0].value / 100) * 24 < 8 || (data[1].value / 100) * 24 > 8) ? "bad" :
                          ((data[0].value / 100) * 24 < 8 && (data[0].value / 100) * 24 > 6 &&
                            (data[1].value / 100) * 24 < 12) && (data[1].value / 100) * 24 > 8 ? "good" :
                            ((data[0].value / 100) * 24 < 8 && (data[0].value / 100) * 24 > 6 &&
                              (data[1].value / 100) * 24 > 12) ? "Excellent" : "good"}
                      </div>
                    </div>

                  }
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="flex justify-between items-center absolute inset-0 z-30 slider pb-16">
          <ActionIcon onClick={() => {
            if (moment(dateValue).format("L") !== moment().format("L")) {
              setDateValue((prev) => {
                const newDate = new Date(prev);
                newDate.setDate(newDate.getDate() + 1);
                return newDate;
              });
            }
          }}
            disabled={moment(dateValue).format("L") == moment().format("L") ? true : false} className="slider__prev border-[.5px] border-[#99999995] rounded-full w-10 h-10  shadow-lg  text-xl !bg-white text-blue hover:!bg-white/90">
            <ChevronRightIcon
              className="w-6 h-6 "
            />
          </ActionIcon> <ActionIcon onClick={() => {
            setDateValue((prev) => {
              const newDate = new Date(prev);
              newDate.setDate(newDate.getDate() - 1);
              return newDate;
            });
          }} className="slider__next  border-[.5px] border-[#99999995] rounded-full w-10 h-10  shadow-lg  text-xl !bg-white text-blue hover:!bg-white/90">
            <ChevronLeftIcon
              className="w-6 h-6 "
            />
          </ActionIcon></div>
      </Swiper>


    </div>
  );
};
export default HealthSleep;
