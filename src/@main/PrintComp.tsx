import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import AppIcons from "./core/AppIcons";

type Props = {
  children: any;
  documentTitle: string;
};

const PrintComp = (props: Props) => {
  const compRef = useRef<HTMLInputElement>(null);
  const handlePrint = useReactToPrint({
    content: (): any => compRef.current,
    documentTitle: props.documentTitle,
    pageStyle: `
    @media print {
      @page { size: landscape; }
    }
    @page {
      size: 330mm 450mm;
      margin: 0
    }
  
    @media all {
      .pagebreak {
        display: none;
      }
    }
  
    @media print {
      .pagebreak {
        page-break-before: always;
      }
    }
    `,
  });
  return (
    <div className="">
      <div
        onClick={handlePrint}
        className="z-50 flex flex-col items-center justify-center  fixed right-4 bottom-4 opacity-50 hover:opacity-100 w-12 h-12 rounded-full cursor-pointer bg-perfBlue text-white"
      >
        <AppIcons
          className="w-5 h-5 text-white"
          icon="DocumentArrowDownIcon:outline"
        />
        <span className=" text-xs">PDF</span>
      </div>
      <div className="bg-pagesBg" ref={compRef}>
        {props.children}
      </div>
    </div>
  );
};

export default PrintComp;
