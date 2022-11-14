import React, { useState } from "react";
import { Grid, Button, Modal, Group } from "@mantine/core";
import AppIcons from "../core/AppIcons";

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
  editMode?: boolean;
};

const CoachPersonalInfo = (props: Props) => {
  return (
    <div className="bg-white flex flex-col gap-4 h-full rounded-lg md:rounded-2xl p-4">
      <h3 className="text-base font-medium text-center">
        {props.role ? props.role : "Coach"}
      </h3>
      <div className="flex md:flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center">
          <img
            className="w-32 h-32 object-cover transition-all delay-75 rounded-lg group-hover:border border-white box-border"
            src={props.photo ? props.photo : "/assets/images/avatar.webp"}
            alt="Profile_Picture"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-xl uppercase">{props.name}</h2>
          <h4 className="text-perfBlue group-hover:text-white text-xs">
            {props.sport} Coach
          </h4>
          <Button className=" border border-perfBlue rounded-lg font-normal text-perfBlue hover:text-white">
            Send Message
          </Button>
        </div>
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
              <li>{team}</li>
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

      {props.editMode && <EditCoachData />}
    </div>
  );
};

export default CoachPersonalInfo;

// Edit Coach Personal Data Modal
function EditCoachData() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <h1>This is Modal Content</h1>
      </Modal>

      <Group position="center">
        <button
          onClick={() => setOpened(true)}
          className="text-sm flex gap-2 xl:text-base p-2 transform hover:scale-105 duration-100 bg-white border border-perfGray3 rounded-lg text-perfGray3"
        >
          <AppIcons
            className="w-5 h-5 text-perfGray3"
            icon="PencilSquareIcon:outline"
          />{" "}
          <span>Edit Coach Data</span>
        </button>
      </Group>
    </>
  );
}
