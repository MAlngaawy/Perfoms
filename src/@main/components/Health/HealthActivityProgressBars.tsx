// @flow 
import * as React from 'react';
import { Select } from "@mantine/core";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import AppUtils from '~/@main/utils/AppUtils';
import { DatePicker} from '@mantine/dates';
import {  useFitDataActivityMutation } from '~/app/store/health/healthApi';
import moment from 'moment';
import { number } from 'yup';

type Props = {

};
const HealthActivityProgressBars = (props: Props) => {
;

  const [FitDataActivity, { data:DataActivity, isSuccess, isLoading, isError, error }] = useFitDataActivityMutation()

  const [dateValue, setDateValue] = React.useState( new Date());
  const [data, setData] = React.useState<[{day:string,value:number}]>()
  const [maxValue, setMaxValue] = React.useState<number>(1)
 
  
  React.useEffect(() => {
    FitDataActivity({ dataType: "activity-data",Date:moment(dateValue).format('L'),type:"bar"})


  }, [dateValue])


  React.useEffect(() => {
    if (isSuccess) {

     setData( DataActivity)
     setMaxValue(Math.max(...DataActivity?.map((i:{day:string,value:number})=>i.value)))
    
     
    } 
  }, [DataActivity, isSuccess, isLoading, isError, error])

  return (
    <div className="HealthActivityProgressBars bg-white rounded-3xl w-full grid gap-9 p-4 h-full">
      <div className="flex justify-between items-center ">

        <h2 className="text-lg font-normal text-perfGray1 pb-4">
          Activity
        </h2>
        <div className='border-none relative  shadow-[0px_5px_25px_#0000001A] max-w-[200px] text-[#828282] rounded-md bg-white'>
          <DatePicker
            maxDate={new Date()}
            value={dateValue}
            onChange={(val) => setDateValue(val as Date)}
            placeholder={"today"}
            maw={400}
            firstDayOfWeek={"sunday"}
       
            clearable={false}
            variant="unstyled"
            mx="auto"
            inputFormat="MM/DD/YYYY"
            classNames={{input:'text-center'}}
            sx={{
              ".mantine-DatePicker-input": {
                background: "none",

              },
            }}
          
          />
        </div>
      </div>
      <div className="min-h-[300px] w-full flex justify-between ">

        {data?.map(item => (
          <div key={item.day?.slice(0,3)} className="grid content-between justify-center items-center text-center gap-6 ">
            <div style={{ backgroundColor: `${(item.value/+maxValue)*100>=50  ? "#FCF5E7" :( item.value/+maxValue)*100<50&&item.value!=0  ? "#EBF3FE" : "#BDBDBD"}` }}
              className={`w-2 h-[300px]  rounded-full rotate-180  relative mx-auto ${maxValue==item.value&& "ring-1 border-2 border-white !w-[12px] ring-[#BDBDBD]"}`}
            >
              <div
                role="progressbar"
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={(item.value/maxValue)*100}
                className={`  rounded-full  bg-[${(item.value/maxValue)*100>=50 ? "#E19809" : (item.value/maxValue)*100<50&&item.value!=0 ? "#2563EB" : "#BDBDBD"}]`}
                style={{ height: `${(item.value/maxValue)*100}%` }}
              />
            </div>
            <p>{item.day?.slice(0,3)}</p>
          </div>))}
      </div>
    </div>
  );
};
export default HealthActivityProgressBars;