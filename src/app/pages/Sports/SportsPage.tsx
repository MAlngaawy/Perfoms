import { Checkbox, Grid, Menu, Input, Image } from "@mantine/core";
import AddPlayer from "../home/molecules/AddPlayer";
import { useSelector } from "react-redux";
import {
  selectedPlayerFn,
  selectedPlayerTeamFn,
} from "~/app/store/parent/parentSlice";
import { Player } from "~/app/store/types/parent-types";
import TimeFilter from "~/@main/components/TimeFilter";
import TeamFilter from "~/@main/components/TeamFilter";
import HomePlayerInfoCard from "../../../@main/components/HomePlayerInfoCard";
import { MagnifyingGlassIcon, PaperAirplaneIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";


export type Players = {
  name: string;
  icon_url: string;
};
const SportsPage = () => {
  const [value, setValue] = useState<string[]>([]);

 

  const dataFilter = [
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'vue', label: 'Vue' },
    { value: 'riot', label: 'Riot' },
    { value: 'next', label: 'Next.js' },
    { value: 'blitz', label: 'Blitz.js' },
  ];
  const resultsData = [{
    id: 1, title: "Football", description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .`,img:"/assets/images/Football.png"},
{
  id: 2, title: "Taekwondo", description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .`,img:"/assets/images/Football.png" },
{
  id: 3, title: "Basketball", description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .`,img:"/assets/images/Football.png" },
{
  id: 4, title: "Volleyball", description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .`,img:"/assets/images/Football.png" },
  ]
  return (
    <div className="Sports grid gap-10 p-5 mb-20">

      <div className="p-2 bg-white rounded-[10px] flex gap-3">
        <div className="border border-[#BDBDBD] rounded-[10px] flex flex-1 p-3 divide-x divide-[#BDBDBD] ">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <button className="flex gap-2 p-1 px-4 "><Bars3BottomLeftIcon className="w-5 h-5" />   Filter</button>
            </Menu.Target>

            <Menu.Dropdown>

              <Checkbox.Group value={value} onChange={setValue}>
                <div className="grid gap-2">
                  {dataFilter.map(item => (<Checkbox value={item.value} label={item.label} />))}
                </div>
              </Checkbox.Group>
            </Menu.Dropdown>
          </Menu>
          <Input
            icon={<MagnifyingGlassIcon className="w-5 h-5 text-perfGray3 " />}
            placeholder="Search here .."
            classNames={{ input: 'border-0  ', wrapper: " w-full flex-1", rightSection: 'w-1/2' }}
            rightSection={
              <div className=" flex gap-4  p-2 justify-end">
                {value.length > 0 && (value.map(item => (
                  <div className=" bg-[#EBF3FE] flex justify-between items-center p-1 h-[32px] rounded-2xl text-perfBlue"> {item}
                    <XCircleIcon className="w-5 h-5 text-perfGray3 " />

                  </div>
                )))}
              </div>
            }
          />

        </div>
        <button type="submit" className="text-white w-44 h-full bg-perfBlue shadow rounded-xl ">Search </button>
      </div>

      <h2 className="text-perfGray3 text-sm  space-x-3">results <span className="font-bold text-perfGray1 ">4</span> </h2>
      <div className="grid gap-5 grid-cols-12 ">
        {resultsData.map(item => (
        <Link to={`/sports/${item.title}`} key={item.id} className="bg-white col-span-12 md:col-span-6 xl:col-span-4 rounded-[10px] grid gap-2 ">
               <img
            width={'100%'}
            height={210}
            src={item.img}
            className="rounded-t-lg"
            alt="icon"
          />
         <div className="p-5 grid gap-5">
          <h3 className="font-medium text-center text-2xl">
{item.title}
          </h3>
          <p className={''}>
            {item.description}
          </p>
         </div>
        </Link>))}

      </div>

    </div>


  );
};


export default SportsPage;
