import React from "react";
import cn from "classnames";
type Props = {
  values: string[];
  selectedValue: string;
  selectValueFun: any;
};

const TabsContainer = ({ values, selectedValue, selectValueFun }: Props) => {
  return (
    <div className="p-1 flex w-fit rounded-full gap-1 border bg-[#F8F8FF]">
      {values.map((value) => {
        return (
          <div
            onClick={() => selectValueFun(value)}
            className={cn(
              "py-1 px-2  text-xs sm:text-sm rounded-full cursor-pointer transition-all ",
              {
                "bg-perfBlue text-white": selectedValue === value,
              }
            )}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
};

export default TabsContainer;
