import { PlayerButton } from "../molecules/PlayerButton";
import { SecondNavProps } from "~/app/store/types/user-types";
import AddPlayer from "../molecules/AddPlayer";

const SecondNav = ({
  players,
  selectedplayer,
  setSelectedPlayer,
}: SecondNavProps) => {
  return (
    <div className="second_nav flex">
      <div className="players flex gap-4">
        {players &&
          players?.map((player, index) => (
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
        <AddPlayer />
      </div>
    </div>
  );
};

export default SecondNav;
