import { Grid } from "@mantine/core";

import CoachPersonalInfo from "~/@main/components/CoachPersonalInfo";
import CoachExperince from "~/@main/components/CoachExperince";
import CoachAchievements from "~/@main/components/CoachAchievements";
import { useState } from "react";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {};

const coachAchev = [
  {
    type: "Gold medal",
    year: 2015,
    place: "olymbec games",
  },
  {
    type: "Gold medal",
    year: 2015,
    place: "olymbec games",
  },
  {
    type: "Gold medal",
    year: 2015,
    place: "olymbec games",
  },
  {
    type: "Gold medal",
    year: 2015,
    place: "olymbec games",
  },
  {
    type: "Gold medal",
    year: 2015,
    place: "olymbec games",
  },
];

const coachExp = {
  experinces: [
    {
      start: "10/10/2020",
      end: "10/10/2022",
      title: "Martial Arts Instructor ",
      works: [
        "Voluptatibus sequi deserunt id.",
        "quaerat optio ullam atque aut eligendi ea commodi?",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        "Eaque aspernatur suscipit fuga perferendis numquam quisquam non nesciunt error,",
      ],
    },
    {
      start: "10/10/2020",
      end: "10/10/2022",
      title: "Martial Arts Instructor ",
      works: [
        "Voluptatibus sequi deserunt id.",
        "quaerat optio ullam atque aut eligendi ea commodi?",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        "Eaque aspernatur suscipit fuga perferendis numquam quisquam non nesciunt error,",
      ],
    },
  ],
  qualifications: [
    "Voluptatibus sequi deserunt id.",
    "quaerat optio ullam atque aut eligendi ea commodi?",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    "Eaque aspernatur suscipit fuga perferendis numquam quisquam non nesciunt error,",
  ],
  courses: [
    "Voluptatibus sequi deserunt id.",
    "quaerat optio ullam atque aut eligendi ea commodi?",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    "Eaque aspernatur suscipit fuga perferendis numquam quisquam non nesciunt error,",
  ],
};

const CoachProfilePage = (props: Props) => {
  const [editMode, setEditMode] = useState(false);
  const { data: user, refetch } = useUserQuery(null);

  return (
    <>
      <div className="edit w-full px-20 flex justify-end items-center mt-2">
        {editMode ? (
          <button
            className="bg-perfBlue  border rounded-lg text-white py-2 px-6 cursor-pointer transform hover:scale-105"
            onClick={() => setEditMode(false)}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-transparent rounded-lg border-perfBlue border text-perfBlue py-2 px-6 cursor-pointer transform hover:scale-105"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}
      </div>
      <Grid className="p-4" gutter="sm">
        <Grid.Col xs={12} md={3}>
          <CoachPersonalInfo
            editMode={editMode}
            refetch={refetch}
            data={user}
            type={"profile"}
          />
        </Grid.Col>
        <Grid.Col xs={12} md={7}>
          <CoachExperince editMode={editMode} {...coachExp} />
        </Grid.Col>
        <Grid.Col xs={12} md={2}>
          <CoachAchievements editMode={editMode} data={coachAchev} />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default CoachProfilePage;
