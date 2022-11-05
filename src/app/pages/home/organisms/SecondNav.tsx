import { PlayerData } from 'app/store/types/user-types';
import { PlayerButton } from '../molecules/PlayerButton';
import { Players } from '../HomePage';
import React from 'react'
import { SecondNavProps } from 'app/store/types/user-types';


const SecondNav = ({players , selectedplayer , setSelectedPlayer}:SecondNavProps) => {
    return (
        <div className="second_nav flex py-6 overflow-scroll">
            <div className="players flex gap-4">
                {players && players?.map((player, index) => (
                <PlayerButton
                    key={index}
                    name={player.name}
                    img={player.icon_url}
                    active={player === selectedplayer}
                    onClick={() => {
                        setSelectedPlayer(player);
                    }}
                />
                ))}
                {/* <AddPlayerButton /> */}
            </div>
        </div>
    )
}

export default SecondNav