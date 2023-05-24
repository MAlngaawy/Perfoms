// @flow
import * as React from "react";
import { Image, RingProgress } from "@mantine/core";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

type Props = {};
const HealthSleep = (props: Props) => {
  const progress = 90;
  const data = [
    { value: 45, color: "#E19809" },
    { value: 30, color: "#2563EB" },
  ];
  let hours = [];

  for (let i = 1; i <= 12; i++) {
    hours.push(i + " AM");
  }

  for (let i = 1; i <= 12; i++) {
    hours.push(i + " PM");
  }

  return (
    <div className="HealthSleep bg-white rounded-3xl w-full grid gap-9 p-4 h-full">
      <div className="flex justify-between items-center ">
        <h2 className="text-lg font-normal text-perfGray1 pb-4">Sleep</h2>
        <span className="text-sm text-perfGray3">12 mar </span>
      </div>

      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper w-full"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <SwiperSlide>
            <div className=" w-full flex justify-center gap-2 px-3">
              <div className=" gap-4 flex flex-col">
                <div className="flex-1 gap-2 flex flex-col">
                  <div className=" gap-2 flex justify-start items-center ">
                    <div className="w-[15px] h-[15px] rounded-full bg-perfBlue" />{" "}
                    {data[0].value} hr
                  </div>
                  sleep
                </div>
                <div className="flex-1 gap-4 flex flex-col">
                  <div className="flex-1 gap-2 flex flex-col">
                    <div className=" gap-2 flex justify-start items-center ">
                      <div className="w-[15px] h-[15px] rounded-full bg-[#E19809]" />{" "}
                      {data[1].value} hr
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
                    root: ` last:[&_circle]:!stroke-[45px] [&:nth-child(2)]:[&_circle]:!stroke-[36px] last:[&_circle]:drop-shadow-xl [&:nth-child(2)]:[&_circle]:!stroke-[36px] [&:nth-child(2)]:[&_circle]:!drop-shadow-xl drop-shadow-lg 
                    first:[&_circle]:drop-shadow	first:[&_circle]:stroke-[#BDBDBD] relative flex justify-center items-center`,
                  }}
                  label={
                    <div className=" grid justify-center items-center  l  gap-2 ">
                      <Image
                        width={29}
                        height={29}
                        src={"/assets/images/Groupface.png"}
                        alt={"footprint"}
                        className="mx-auto"
                      />
                      <div className="text-lg text-perfGray1"> good</div>
                    </div>
                  }
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        modules={[A11y]}
        className="mySwiper w-full"
      >
        {hours.map((item) => (
          <SwiperSlide
            className={`w-10 h-[110px] p-2  grid content-between justify-center  `}

          >
            <div
              className={`w-10 h-[70px] p-2 rounded-[10px] text-white flex content-between justify-center
            text-center items-center  `}
              style={{ backgroundColor: `${parseInt(item) <= 7 ? "#2F80ED" : "#BDBDBD"}` }}
            >
              {item}</div>
            <div className="w-4 h-4 rounded-full mx-auto"
              style={{
                backgroundColor: `${parseInt(item) <= 7 ? "#2F80ED" : "#BDBDBD"}`,
                display: [5, 2, 8].includes(parseInt(item)) ? "flex" : "none"
              }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default HealthSleep;
