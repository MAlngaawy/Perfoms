import React from "react";
import cn from "classnames";
import { Avatar } from "@mantine/core";
import useWindowSize from "~/@main/hooks/useWindowSize";
type Props = {
  data: {
    metric: string;
    icon: string;
    score: number;
  }[];
};

const Performance = ({ data }: Props) => {
  const windowSize = useWindowSize();

  return (
    <div className="bg-white rounded-2xl p-4 sm:mx-4 ">
      <h2>Performances</h2>
      <div className="flex flex-col gap-4 gap-x-12 md:gap-x-40 sm:flex-wrap h-700 overflow-scroll  mt-6">
        {data.map((item, idx) => {
          return (
            <div className="flex gap-6 justify-between xs:px-6" key={idx}>
              <div className="self-stretch flex items-center gap-2">
                {" "}
                <Avatar
                  bg={"#eee"}
                  className="p-2"
                  radius={"xl"}
                  src={item.icon}
                  size={
                    windowSize.width && windowSize.width < 768 ? "sm" : "md"
                  }
                />{" "}
                <h3 className="text-xs sm:text-sm"> {item.metric} </h3>
              </div>
              <div className="flex gap-1 xs:gap-2 justify-center items-center">
                {[1, 2, 3, 4, 5].map((number) => (
                  <span
                    key={number}
                    onClick={() =>
                      console.log({
                        newScore: number,
                        metric: item.metric,
                      })
                    }
                    className={cn(
                      "p-1 px-2 sm:px-3 font-bold bg-gray-300 rounded-md cursor-pointer text-xs xs:text-sm",
                      {
                        "bg-green text-white":
                          item.score > 3 && item.score === number,
                        "bg-red text-white":
                          item.score < 3 && item.score === number,
                        "bg-yellow text-white":
                          item.score === 3 && item.score === number,
                      }
                    )}
                  >
                    {number}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        <div className="flex"></div>
      </div>
    </div>
  );
};

export default Performance;
