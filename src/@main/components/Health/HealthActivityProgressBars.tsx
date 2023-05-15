// @flow 
import * as React from 'react';
import {  Select } from "@mantine/core";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import AppUtils from '~/@main/utils/AppUtils';
import { DatePicker } from '@mantine/dates';

type Props = {

};
const HealthActivityProgressBars = (props: Props) => {
    const dataStatic = [
        { label: "fri", value: 60, status: "active" },
        { label: "sat", value: 30, status: "sleep" },
        { label: "sun", value: 38, status: "sleep" },
        { label: "mon", value: 60, status: "active",last:true },
        { label: "tue", value: 0, status: null },
        { label: "wed", value: 0, status: null },
        { label: "thu", value: 0, status: null },
      ];


      const [dateValue, setDateValue] = React.useState(new Date())
  
    return (
        <div className="HealthActivityProgressBars bg-white rounded-3xl w-full grid gap-9 p-4 h-full">
                    <div className="flex justify-between items-center ">
                     
                      <h2 className="text-lg font-normal text-perfGray1 pb-4">
                        Activity
                      </h2>
                      <div className='border-none relative shadow-[0px_5px_25px_#0000001A] w-[115px] text-[#828282] rounded-md bg-white'>
               <DatePicker
              maxDate={new Date()}
              value={dateValue}
              onChange={(val)=>setDateValue( val as Date)}
              placeholder={"today"}
              maw={400}
              variant="unstyled"
              mx="auto"
              inputFormat="YYYY-MM-DD"
             
            
              sx={{
                ".mantine-DatePicker-input": {
                  background: "none",
                
                },
              }}
            />
          </div>
                    </div>
                    <div className="min-h-[300px] w-full flex justify-between ">
                    {dataStatic.map(item=>( 
                       <div key={item.label} className="grid content-between justify-center items-center text-center gap-6 ">
                        <div style={{backgroundColor:`${item.status==="active"?"#FCF5E7":item.status==="sleep"?"#EBF3FE":"#BDBDBD"}`}}
                          className={`w-2 h-[300px]  rounded-full rotate-180  relative mx-auto ${item.last&&"ring-1 border-2 border-white !w-[12px] ring-[#BDBDBD]"}`}
                        >
                          <div
                            role="progressbar"
                            aria-valuemax={100}
                            aria-valuemin={0}
                            aria-valuenow={item.value}
                            className={`  rounded-full  bg-[${item.status==="active"?"#E19809":item.status==="sleep"?"#2563EB":"#BDBDBD"}]`}
                            style={{ height: `${item.value}%` }}
                          />
                        </div>
                        <p>{item.label}</p>
                      </div>))}
                    </div>
                  </div>
    );
};
export default HealthActivityProgressBars;