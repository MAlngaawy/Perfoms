import AppIcons from "../../../../../../@main/core/AppIcons";
import AddPlayer from "./AddPLayerToTeam";
import DeletePlayerFromTeam from "./DeletePlayerFromTeam";

type Props = {};

const players = [
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
  {
    name: "Adham abdelmoniem",
    image:
      "https://glamourshots.com/wp-content/uploads/2015/08/Glamour_Shots_kids_boy_bowtie_portraits-799x600.jpg",
    id: 1,
  },
];

const TeamPlayers = (props: Props) => {
  return (
    <div>
      <h2>Payers</h2>
      <div className="flex gap-4 flex-wrap mt-6">
        {players.map((player) => {
          return <SinglePlayer {...player} />;
        })}
        <AddPlayer />
      </div>
    </div>
  );
};

const SinglePlayer = ({ id, image, name }: any) => {
  return (
    <div
      key={id}
      className="shadow-lg relative items-stretch rounded-lg w-36 text-center bg-white h-full flex flex-col justify-center"
    >
      <div className="overlay flex justify-center items-stretch flex-col gap-2 rounded-lg w-full h-full absolute left-0 top-0 bg-transparent group hover:bg-black/60">
        <div className="hidden group-hover:flex text-white gap-2 cursor-pointer justify-center items-center bg-perfBlue p-2 w-full">
          <AppIcons className="w-5 h-5 text-white" icon="UserIcon:outline" />
          <span className="text-white">View profile</span>
        </div>
        <DeletePlayerFromTeam id={id} name={name} type="player" />
        {/* <div className="hidden group-hover:flex justify-center items-center text-white gap-2 cursor-pointer hover:bg-perfGray1/90 p-2 w-full">
          <AppIcons className="w-5 h-5 text-white" icon="TrashIcon:outline" />
          <span className="text-white">Delete </span>
        </div> */}
      </div>
      <img
        className="rounded-lg w-full h-32 object-cover"
        src={image}
        alt="player Image"
      />
      <div>
        <h2 className="text-sm my-2 mx-2">{name}</h2>
      </div>
    </div>
  );
};

export default TeamPlayers;
