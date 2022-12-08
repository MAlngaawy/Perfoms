import React, { Children, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import AppIcons from "./core/AppIcons";

type Props = {
  children: any;
};

const PrintComp = (props: Props) => {
  const compRef = useRef<HTMLInputElement>(null);
  const handlePrint = useReactToPrint({
    content: (): any => compRef.current,
  });

  return (
    <div className="bg-pagesBg">
      <div
        onClick={handlePrint}
        className="z-50 flex flex-col items-center justify-center  fixed right-20 bottom-20 opacity-70 hover:opacity-100 w-20 h-20 rounded-full cursor-pointer bg-perfBlue text-white"
      >
        <AppIcons
          className="w-8 h-8 text-white"
          icon="DocumentArrowDownIcon:outline"
        />
        <span>PDF</span>
      </div>
      <div ref={compRef}>{props.children}</div>
    </div>
  );
};

export default PrintComp;
