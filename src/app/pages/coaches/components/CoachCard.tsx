import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Team } from "~/app/store/types/coach-types";

interface Props {
  id: number;
  role?: "Coach" | "Supervisor";
  name: string;
  education: string;
  teams: Partial<Team>[];
  photo?: string;
  sport?: string;
}

const CoachCard = ({
  id,
  role,
  name,
  education,
  teams,
  photo,
  sport,
}: Props) => {
  const navigate = useNavigate();
  return (
    <div className="coachCard h-full transition-all group hover:bg-perfBlue hover:text-white bg-white text-perfLightBlack rounded-3xl text-center p-5 font-medium">
      <h3 className="text-base font-medium text-center">
        {role ? role : "Coach"}
      </h3>
      <div className="flex justify-center items-center">
        <img
          className="my-4 w-32 h-32 object-cover transition-all delay-75 rounded-lg group-hover:border border-white box-border"
          src={photo ? photo : "/assets/images/avatar.webp"}
          alt="Profile_Picture"
        />
      </div>
      <h2 className="text-xl">{name}</h2>
      <h4 className="text-perfBlue group-hover:text-white text-xs">
        {sport} Coach
      </h4>

      <div className="flex justify-around gap-4 my-4 text-left">
        <div className="education flex flex-col">
          <h3 className="text-base">Education</h3>
          <p className=" text-perfGray3 group-hover:text-white text-xs font-normal">
            {education}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="teams flex flex-col">
            <h3 className="text-base ">Teams</h3>
            <div className="flex flex-col">
              {teams.map((item) => (
                <h4
                  className="text-perfGray3 group-hover:text-white text-xs font-normal"
                  key={item.id}
                >
                  {" "}
                  {item.name}{" "}
                </h4>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <Link to={`${location.pathname}/single-coach/${id}`}> */}
      <Button
        onClick={() => navigate(`${id}`)}
        className="text-perfBlue border border-perfBlue  group-hover:text-white group-hover:border-white font-normal text-base py-2 px-4 my-4 rounded-xl"
      >
        View full profile
      </Button>
      {/* </Link> */}
    </div>
  );
};

export default CoachCard;
