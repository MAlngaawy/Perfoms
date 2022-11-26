import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Team } from "~/app/store/types/coach-types";
import classNames from "classnames";

interface Props {
  id: number | undefined;
  role?: "Coach" | "Supervisor";
  name: string;
  education: string;
  teams: Partial<Team>[] | undefined;
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
    <div
      className={classNames(
        "coachCard h-full transition-all group   rounded-3xl text-center p-5 font-medium",
        {
          "bg-white text-perfLightBlack": role === "Coach",
        },
        {
          "bg-perfBlue text-white": role === "Supervisor",
        }
      )}
    >
      <h3 className="text-base font-medium text-center">
        {role ? role : "Coach"}
      </h3>
      <div className="flex justify-center items-center">
        <img
          className={classNames(
            "my-4 w-32 h-32 object-cover transition-all delay-75 rounded-lg border-white box-border",
            {
              "border border-white": role === "Supervisor",
            }
          )}
          src={photo ? photo : "/assets/images/avatar.webp"}
          alt="Profile_Picture"
        />
      </div>
      <h2 className="text-xl">{name}</h2>
      <h4
        className={classNames(
          "text-xs",
          {
            "text-perfBlue ": role === "Coach",
          },
          {
            "text-white ": role === "Supervisor",
          }
        )}
      >
        {sport} Coach
      </h4>

      <div className="flex justify-around gap-4 my-4 text-left">
        <div className="education flex flex-col">
          <h3 className="text-base">Education</h3>
          <p className=" text-xs font-normal">{education}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="teams flex flex-col">
            <h3 className="text-base ">Teams</h3>
            <div className="flex flex-col">
              {teams?.map((item) => (
                <h4 className="text-xs font-normal" key={item.id}>
                  {item.name}
                </h4>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <Link to={`${location.pathname}/single-coach/${id}`}> */}
      <Button
        onClick={() => navigate(`${id}`)}
        className={classNames(
          " font-normal border text-base py-2 px-4 my-4 rounded-xl",
          {
            "text-perfBlue border-perfBlue  hover:text-white hover:bg-perfBlue":
              role === "Coach",
          },
          {
            "text-white bg-perfBlue border-white  hover:bg-white hover:text-perfBlue":
              role === "Supervisor",
          }
        )}
      >
        View full profile
      </Button>
      {/* </Link> */}
    </div>
  );
};

export default CoachCard;
