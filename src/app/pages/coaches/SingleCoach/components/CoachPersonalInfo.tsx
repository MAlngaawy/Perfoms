import { Grid } from "@mantine/core";

import { Button } from "@mantine/core";

type Props = {
  id: number;
  role?: "Coach" | "Supervisor";
  photo?: string;
  name: string;
  sport?: string;
  bio?: string;
  teams: string[];
  education: {
    from?: string;
    to?: string;
    degree: string;
    universty?: string;
  }[];
};

const CoachPersonalInfo = (props: Props) => {
  return (
    <div className="bg-white flex flex-col gap-4 h-full rounded-lg md:rounded-2xl p-4">
      <h3 className="text-base font-medium text-center">
        {props.role ? props.role : "Coach"}
      </h3>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex justify-center items-center">
          <img
            className="my-4 w-32 h-32 object-cover transition-all delay-75 rounded-lg group-hover:border border-white box-border"
            src={props.photo ? props.photo : "/assets/images/avatar.webp"}
            alt="Profile_Picture"
          />
        </div>
        <h2 className="text-xl uppercase">{props.name}</h2>
        <h4 className="text-perfBlue group-hover:text-white text-xs">
          {props.sport} Coach
        </h4>
        <Button className=" border border-perfBlue rounded-lg font-normal text-perfBlue hover:text-white">
          Send Message
        </Button>
      </div>
      <div className="profile text-left">
        <h3 className="text-base font-medium text-perfLightBlack">Profile</h3>
        <p className="font-normal text-perfGray3 text-sm">
          {props.bio ? props.bio : "No Bio"}
        </p>
      </div>
      <div className="teams  text-left">
        <h3 className="text-base font-medium text-perfLightBlack">Teams</h3>
        <Grid gutter={5}>
          {props.teams.map((team) => (
            <Grid.Col className="font-normal text-perfGray3 text-sm" span={6}>
              {team}
            </Grid.Col>
          ))}
        </Grid>
      </div>
      <div className="education text-left">
        <h3 className="text-base font-medium text-perfLightBlack">Education</h3>
        {props.education.map((education) => (
          <div className="my-2">
            <p className="date text-xs font-normal text-perfGray3">
              {education.from || "-/--/----"} - {education.from || "-/--/----"}
            </p>
            <h2>{education.degree}</h2>
            <p className="date text-xs font-normal text-perfGray3">
              {education.universty}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachPersonalInfo;
