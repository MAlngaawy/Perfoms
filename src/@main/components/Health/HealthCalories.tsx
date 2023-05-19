// @flow 
import * as React from 'react';
import { Image, RingProgress, Select } from "@mantine/core";
import { DatePicker } from '@mantine/dates';
import moment from 'moment';
import { useFitDataMutation } from '~/app/store/health/healthApi';

type Props = {

};
const HealthCalories = (props: Props) => {



const [fitData, { data: DataCalories, isSuccess, isLoading, isError, error }] = useFitDataMutation()

const [dateValue, setDateValue] = React.useState(new Date())
 const [data, setData] = React.useState( {progressValue:0,Calories:0})

 React.useEffect(() => {
   fitData({ dataType: "com.google.calories.expended", Date: moment(dateValue).format('L')})


 }, [dateValue])
 const calculateCalories = React.useCallback(
   () => {
     const Calories = DataCalories?.data?.map(
       (bucket: { dataset: [point: [{ value: [{ fpVal: number }] }]] }) =>
         bucket?.dataset?.map((pointItem: any) =>
           pointItem?.point?.map((pointValue: any) =>
             pointValue.value.map((val: { fpVal: number }) => val.fpVal)
           )
         )
     )?.reduce((a: number, b: number): number => {
       return a + b;
     },)
     const progressValue = ((+Calories / 1000) * 100);
return { progressValue: +progressValue||0, Calories: +Calories||0 }
   },
   [dateValue],
 )

 React.useEffect(() => {
   if (isSuccess) {

    setData( calculateCalories())

   } 
 }, [DataCalories, isSuccess, isLoading, isError, error])




  return (
    <div className="HealthCalories bg-white rounded-3xl w-full grid gap-9 p-4 h-full">
      <div className="flex justify-between items-center ">
        <h2 className="text-lg font-normal text-perfGray1 pb-4">Calories</h2>
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
      <div className=" w-full flex justify-center ">

        <div className='relative rounded-full flex justify-center '> <RingProgress 
          size={250}
          thickness={10}
          roundCaps
          sections={[
            { value: data.progressValue , color: '#2563EB' },

          ]}
          classNames={{label:' border-[20px] border-[#FCF5E7] text-center grid justify-center items-center rounded-full bg-white h-[78%] w-[78%] m-auto z-0 left-auto right-auto ',
          root:"	first:[&_circle]:!stroke-[#FCF5E7] relative flex justify-center items-center" }}
          label={
            <div className=' grid justify-center items-center  rounded-full !w-full h-full  gap-5 '>

              <div className=' absolute inset-0 w-full h-full rounded-full shadow '/>
              <Image
                width={38}
                height={38}
                src={'/assets/images/fire.png'}
                alt={'footprint'}
                className='mx-auto'
              />
            <div className='text-2xl text-perfGray1'>  {data.Calories}  kcal
              <p className='text-lg text-perfGray'>Burned</p></div>
            </div>
          }
        />
          </div>
      </div>
     
    </div>
  );
};
export default HealthCalories;