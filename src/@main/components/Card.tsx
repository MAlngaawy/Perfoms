import React from 'react'
import { CardProps , PerformanceCardProps, PlayerData } from '../../app/store/types/user-types'
import Info from './Info';
import { PerformanceCard } from './PerformanceCard';




const Card = ({
    type,
    header,
    firstText,
    secondText,
    detailedText,
    powerType,
    scores,
    playerData,
    playerSummary
    }: CardProps) => {

    if(type === 'action' || type === 'recommendation'){
        return (
            <div className='info-card flex flex-col p-6 bg-white gap-1 rounded-3xl'>
                <h2 className="text-perfGray1 text-base font-semibold">{header}</h2>
                <p>{firstText}</p>
                <p>{secondText}</p>
                <p className=" text-perfGray3 text-sm">{detailedText}</p>
            </div>
        )
    }

    if(type === 'playerInfo'){
        return (
                <div className="p-6 bg-white h-full rounded-3xl">
                    <div className="playerName">
                        <h2>{playerData?.name.split(" ")[0]}'s info</h2>
                    </div>
                    <div className="img my-2">
                        <img
                        src={playerData?.iconURL}
                        className="w-1/2 h-28 rounded-lg object-cover"
                        alt="player_image"
                        />
                    </div>
                    <div className="infos">
                        <Info label="Name" value={playerData?.name} />
                        <Info label="Age" value={playerData?.dob} />
                        <div className="flex justify-between">
                        <Info label="Weight" value={`${playerData?.weight} kgm`} />
                        <Info label="height" value={`${playerData?.height} cm`} />
                        </div>
                        <Info label="Sport" value={playerData?.sportName} />
                    </div>
                    </div>
        )
    }
    
    if(type === 'performanceSummary'){
        return (
            <div className="bg-white rounded-3xl p-6">
                <div className="title">
                    <h1 className="text-lg font-normal">Performance Report summary</h1>
                </div>
                <div className="mt-2 flex flex-col sm:flex-row justify-between gap-4">
                    {playerSummary?.map((item, idx:number) => {
                    return (
                        <div key={idx} className="w-full sm:w-1/2">
                        <PerformanceCard
                            name={item.name}
                            number={item.number}
                            bgColor={item.bgColor}
                            textColor={item.textColor}
                        >
                            <img className=" w-6 max-w-full" src={item.icon} alt="icon" />
                        </PerformanceCard>
                        </div>
                    );
                    })}
                </div>
                </div>
            )
    }

    return (
        <div className='flex flex-col bg-white rounded-3xl'>
            <div className='power_type px-5 py-2 flex flex-row justify-between'>
                <span className={` font-semibold power_type_name`}>{powerType}</span>
                <p>Score is out of 5</p>
            </div>
            <div className={`power_header  px-5 py-2 bg-white flex flex-row justify-between`}>
                <h3 className="text-sm">Name</h3>
                <h3 className="text-sm">Score</h3>
            </div>
                {scores?.map((power,index)=>{
                    return (
                        <div key={index} className='power_score  px-5 py-2 flex flex-row justify-between'>
                            <h3 className="text-sm">{power.name}</h3>
                            <h3 className={`font-semibold text-sm`}>{power.score}</h3>
                        </div>
                    )
                })}
        </div>
        )
    
    
}

export default Card