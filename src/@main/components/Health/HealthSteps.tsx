// @flow 
import * as React from 'react';
import { Image, RingProgress, Select } from "@mantine/core";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { DatePicker } from '@mantine/dates';
import AppUtils from '~/@main/utils/AppUtils';
type Props = {

};
const HealthSteps = (props: Props) => {
  const progress = 90;
  const data = { progressValue: 60, steps: 1250, info: [{ name: "Duration", label: "1h 20m", imgSrc: "/assets/images/time.png" }, { name: "Total Distance", label: "2.3 km", imgSrc: "/assets/images/map.png" }] }
  const [dateValue, setDateValue] = React.useState(new Date())
  
  return (
    <div className="HealthSteps bg-white rounded-3xl w-full grid gap-9 p-4 h-full">
      <div className="flex justify-between items-center ">
        <h2 className="text-lg font-normal text-perfGray1 pb-4">Steps</h2>

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
          </div></div>
      <div className=" w-full flex justify-center ">

        <div className='relative rounded-tl-[50%] p-5 pr-6 pb-0 rounded-tr-[50%] flex justify-center h-[152px] overflow-hidden'> <RingProgress className='-rotate-90 '
          size={250}
          thickness={12}
          roundCaps
          sections={[
            { value: data.progressValue > 0 ? data.progressValue / 2 : 0, color: '#E19809' },

          ]}
          label={
            <div className='rotate-90 mx-auto relative text-center grid justify-center items-center translate-x-5 text-2xl text-perfGray1'>
              <Image
                width={38}
                height={38}
                src={'/assets/images/footprint.png'}
                alt={'footprint'}
                className='mx-auto'
              />
              {data.steps} steps
            </div>
          }
        />
          <div className='absolute bottom-0 left-0 text-[#BDBDBD] text-base'>0</div>
          <div className='absolute bottom-[35%] left-[4%] text-[#BDBDBD] text-base'>1 km</div>
          <div className='absolute bottom-[65%] left-[15%] text-[#BDBDBD] text-base'>2 km</div>
          <div className='absolute top-2 left-auto right-auto text-[#BDBDBD] text-base'>3 km</div>

          <div className='absolute bottom-[65%] right-[15%] text-[#BDBDBD] text-base'>4 km</div>
          <div className='absolute bottom-[35%] right-[5%] text-[#BDBDBD] text-base'>5 km</div>
          <div className='absolute bottom-0 right-0 text-[#BDBDBD] text-base'>6 km</div>
        </div>
      </div>
      <div className='flex gap-x-5    ' >
        {data.info.map(item => (<div key={item.name} className="flex gap-2 flex-1">
          <Image
            width={60}
            height={60}
            src={item.imgSrc}
            alt={item.name}
          />
          <div ><p className="text-black text-lg font-medium  ">{item.label}</p>
            <p className="text-base text-[#828282]">{item.name}</p></div>
        </div>))}
      </div>
    </div>
  );
};
export default HealthSteps;