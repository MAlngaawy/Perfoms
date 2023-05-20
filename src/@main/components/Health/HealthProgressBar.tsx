// @flow 

import { Progress } from "@mantine/core";
import { Link } from 'react-router-dom';
import React, { PureComponent, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { useMediaQuery } from "@mantine/hooks";
import { useFitDataActivityMutation } from "~/app/store/health/healthApi";
import moment from "moment";

type Props = {

};


const HealthProgressBar = (props: Props) => {
    const [viewChart, setViewChart] = useState(false)
    const BiggerScreen = useMediaQuery('(min-width: 1536px)');
    const LargeXScreen = useMediaQuery('(min-width: 1324px)');
    const LargeScreen = useMediaQuery('(min-width: 992px)');
    const MidScreen = useMediaQuery('(min-width: 768px)');
    const SmallScreen = useMediaQuery('(max-width: 768px)');

    const [FitDataActivity, { data:DataActivity, isSuccess, isLoading, isError, error }] = useFitDataActivityMutation()

    const [dateValue, setDateValue] = React.useState( new Date());
    const [data, setData] = React.useState<[{day:string,value:number}]>()
    const [valueProgress, setValueProgress] = React.useState<number>(1)
    const [ValueDis, setValueDis] = React.useState<number>(1)
   
    function convertData(inputData) {
        const outputData = [
          { name: 'sun', uv: 0, pv: 0 },
          { name: 'mon', uv: 0, pv: 0 },
          { name: 'tue', uv: 0, pv: 0 },
          { name: 'wed', uv: 0, pv: 0 },
          { name: 'thu', uv: 0, pv: 0 },
          { name: 'fri', uv: 0, pv: 0 },
          { name: 'sat', uv: 0, pv: 0 },
        ];
      
        for (const item of inputData) {
          const dayIndex = getDayIndex(item.day);
          if (dayIndex !== -1) {
            outputData[dayIndex].uv = item.value;
          }
        }
      
        return outputData;
      }
      
      function getDayIndex(day:string) {
        switch (day) {
          case 'Sunday':
            return 0;
          case 'Monday':
            return 1;
          case 'Tuesday':
            return 2;
          case 'Wednesday':
            return 3;
          case 'Thursday':
            return 4;
          case 'Friday':
            return 5;
          case 'Saturday':
            return 6;
          default:
            return -1;
        }
      }
    React.useEffect(() => {
      FitDataActivity({ dataType: "activity-data",Date:moment(dateValue).format('L')})
  
  
    }, [dateValue])
  React.useEffect(() => {
      if (isSuccess) {
  
       setData(convertData(DataActivity));

    
       
       let sumData1= DataActivity?.slice(0,6).map((i:{day:string,value:number})=>i.value).reduce((accumulator:number, currentValue:number) => accumulator + currentValue,0)
       let sumData2= DataActivity?.slice(7,).map((i:{day:string,value:number})=>i.value).reduce((accumulator:number, currentValue:number) => accumulator + currentValue,0)||1
       let sumDataAll= DataActivity?.map((i:{day:string,value:number})=>i.value).reduce((accumulator:number, currentValue:number) => accumulator + currentValue,0)||1
       setValueProgress((sumData2/sumDataAll)*100)
       setValueDis((((sumData2-sumData1)/sumDataAll)*100))
   
    
     
      
      
      } 
    }, [DataActivity, isSuccess, isLoading, isError, error])
  

  
    return (
        <div
            className={`p-5 absolute overflow-hidden top-0 right-0 left-0 gap-4 sm:gap-5 lg:gap-x-7  xl:gap-x-10  2xl:gap-x-14 flex justify-between   shadow items-start flex-wrap !bg-white rounded-3xl w-full transition-[height] !duration-1000  ${viewChart ? "h-[400px] sm:h-[300px]  z-50" : "h-[140px]  sm:h-[75px]"
                }`}
        >
            {viewChart ? (<div className={`grid gap-4 columns-6 sm:h-full`}>

                <div className=" row-span-2 grid  gap-4">

                    <h3 className="text-lg text-black">
                        progress <span className="font-semibold">vs</span> last week
                    </h3>
                    <div className={`${ValueDis>0?"text-perfBlue":"text-red"} text-lg flex items-center gap-x-1`}><ArrowDownIcon className={` h-5 ${ValueDis>0&& "rotate-180"}`} />  {ValueDis} %</div>
                </div>
                <div className=" row-span-4 sm:grid flex flex-wrap gap-4 items-center content-center sm:gap-2 ">
                    <div className="flex gap-4">
                        <div className="w-5 h-5 rounded bg-perfBlue" />
                        <span>this week</span>
                    </div><div className="flex gap-4">
                        <div className="w-5 h-5 rounded bg-orange" />
                        <span>last week</span>
                    </div>
                </div>
            </div>) : (<h3 className="text-lg text-black">
                progress <span className="font-semibold">vs</span> last week
            </h3>)}
            <div className={`flex-1 order-last sm:order-none min-w-[300px]`}>
            {viewChart ?    
                    (<div className={`${viewChart ? " opacity-100":" opacity-0"} Z-[100]  !delay-1000 flex justify-center transition-opacity !duration-1000  `}>

                        <LineChart
                            width={BiggerScreen?700:LargeXScreen?500:LargeScreen?370:MidScreen?450:SmallScreen?300:350}
                            height={SmallScreen?230:270}
                            barSize={6}
                            barGap={1}
                            margin={{
                                top: SmallScreen?0:20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                            data={data}
                        >
                            <CartesianGrid strokeDasharray="0" />
                            <XAxis
                                dataKey="name"
                                padding={{ left: 20, right: 20 }}
                                allowDataOverflow
                            />

                            <Tooltip />
                            <Line
                                type="natural"
                                dataKey="pv"
                                stroke="#E19809"
                                dot={false}
                            />
                            <Line
                                type="natural"
                                dataKey="uv"
                                stroke="#2563EB"
                                dot={false}
                            />
                        </LineChart>
                    </div>):
                (
                    <div className={`${!viewChart ? " opacity-100":" opacity-0"}    transition-opacity !duration-1000 `}>
                        <p>{valueProgress}%</p>
                        <Progress
                            radius="xl"
                            size={8}
                            value={valueProgress}
                            classNames={{
                                root: "bg-[#E19809]",
                                bar: "bg-[#2563EB] rounded-r-sm",
                            }}
                        />
                    </div>)
               }
            </div>
            <button
                type="button"
                onClick={() => setViewChart(!viewChart)}
                className="underline text-perfBlue "
            >
                {viewChart ? "hide" : "view"}
            </button>
        </div>
    );
};
export default HealthProgressBar;