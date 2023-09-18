import { Checkbox, Grid, Menu, Input, Textarea } from "@mantine/core";
import AddPlayer from "../../home/molecules/AddPlayer";
import { useSelector } from "react-redux";
import {
  selectedPlayerFn,
  selectedPlayerTeamFn,
} from "~/app/store/parent/parentSlice";
import { Player } from "~/app/store/types/parent-types";
import TimeFilter from "~/@main/components/TimeFilter";
import TeamFilter from "~/@main/components/TeamFilter";
import HomePlayerInfoCard from "../../../../@main/components/HomePlayerInfoCard";
import { MagnifyingGlassIcon, PaperAirplaneIcon, SunIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";


export type Players = {
  name: string;
  icon_url: string;
};
const HelpCenterDetailsPage = () => {
  const [value, setValue] = useState<string[]>([]);

  const PopularQuestions = [{
    id: 1, title: "Scoring engine", description: `Defining Sentence Defining Sentence Defining 
 Sentence Defining Sentence Defining Sentence.`},
  {
    id: 2, title: "Scoring engine", description: `Defining Sentence Defining Sentence Defining 
 Sentence Defining Sentence Defining Sentence.`}, {
    id: 3, title: "Scoring engine", description: `Defining Sentence Defining Sentence Defining 
 Sentence Defining Sentence Defining Sentence.`}, {
    id: 4, title: "Scoring engine", description: `Defining Sentence Defining Sentence Defining 
 Sentence Defining Sentence Defining Sentence.`},]

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
    id: 1, title: "How to Detect Progress ?", router: ["Home", "report", "Daily Actions"], link: "/help-center/501121353",
    description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .` , descriptionIdea: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .` }, {
    id: 2, title: "How to Detect Progress ?", router: ["Home", "report", "Daily Actions"], link: "/help-center/5232901253",
    description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .` , descriptionIdea: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .` },
  {
    id: 3, title: "How to Detect Progress ?", router: ["Home", "report", "Daily Actions"], link: "/help-center/502621533",
    description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .` , descriptionIdea: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .` },
  {
    id: 4, title: "How to Detect Progress ?", router: ["Home", "report", "Daily Actions"], link: "/help-center/13213",
    description: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .` , descriptionIdea: `more details more details more details more details more details more details more details more details more details more details more details more details more details more details 
more details more details more details more details more details .` },
  ]
  const { slug } = useParams();
  return (
    <div className="Help-Center-Details-Page grid gap-10 p-5 mb-20">
      <h2 className="text-perfGray3 text-sm ">Help Center / {slug} </h2>

     

     <div className="grid gap-5  ">
        {resultsData.filter(items=>items.link.endsWith(slug as any)).map(item => (<div key={item.id} className="bg-white p-4 rounded-[10px] grid gap-2 ">
          <div className="flex justify-between "><h3 className="flex-1 text-2xl text-perfGray1 ">{item.title}</h3></div>
          <div className="flex gap-3">{item.router.map((rout,index)=>(<span className={`${(item.router.length-1)!==index&&item.router.length!=1?"text-perfGray3":"text-perfBlue"} flex gap-3`}> {rout}<span>{item.router.length-1==index?"":"/"}</span></span>))}</div>
          <p className="text-perfGray1">{item.description}</p>
          <div className="flex my-3 border rounded-[10px] p-4 gap-6">
            <SunIcon className="w-6 h-6 text-perfBlue"/>
<div className="flex-1">{item.descriptionIdea}</div>
          </div>
        </div>))}

      </div>

    </div>


  );
};


export default HelpCenterDetailsPage;
