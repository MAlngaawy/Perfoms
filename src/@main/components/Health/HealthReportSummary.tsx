// @flow 
import * as React from 'react';
import {  Image, LoadingOverlay } from "@mantine/core";
import { useFitDataMutation } from '~/app/store/health/healthApi';

type Props = {

};
const HealthReportSummary = (props: Props) => {
  const dataStatic2 = [{name:"Blood Pressure",imgSrc:"/assets/images/BloodPressure.png",label:"mmhg",value:"130/90"},
  {name:"Body Temperature",imgSrc:"/assets/images/BodyTemperature.png",label:"38ْ C",value:"38ْ"},
  {name:"Blood Glucose",imgSrc:"/assets/images/BloodGlucose.png",label:"140",value:"mg/dl"},
  {name:"Respiration Rate",imgSrc:"/assets/images/RespirationRate.png",label:"beats/min",value:"--"},]
  const customLoader = (
    <div className="h-full w-full grid justify-center items-center  inset-0">
    
      <h1 className="text-black text-center text-xl font-semibold animate-bounce  "> no data available </h1>
    </div>
  );
  
    return (
      <div className="Health-Report-summary relative bg-white rounded-3xl w-full grid gap-4 p-4 h-full">
   <LoadingOverlay visible={true} loader={ customLoader} overlayBlur={2} />
      
      <h2 className="text-lg font-normal text-perfGray1 ">
        Health Report summary
      </h2>
      <div className="grid gap-6 content-center">
     {dataStatic2.map(item=>( 
        <div key={item.name} className="flex gap-2">
          <Image
            width={60}
            height={60}
            src={item.imgSrc}
            alt={item.name}
          />
          <div ><p className="text-black text-lg font-medium  ">{item.value}{' '}{item.label}</p>
            <p className="text-base text-[#828282]">{item.name}</p></div>
        </div>))}
      </div>
    </div>
    );
};
export default HealthReportSummary;