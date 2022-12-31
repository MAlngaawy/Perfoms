import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Button,
  Modal,
  Group,
  Input,
  Textarea,
  Avatar,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import AppIcons from "~/@main/core/AppIcons";
import SubmitButton from "~/@main/components/SubmitButton";
import __ from "lodash";
import { Education, User } from "~/app/store/types/user-types";
import { PlayerCoach } from "~/app/store/types/parent-types";
import { axiosInstance } from "~/app/configs/dataService";
import {
  useAddUserEducationMutation,
  useDeleteUserEducationMutation,
  useGetUserEducationsQuery,
} from "~/app/store/user/userApi";
import DeleteButton from "../ManagerComponents/SubComponents/DeleteButton";

// Props Types
type Props = {
  data: User | PlayerCoach | undefined;
  editMode?: boolean;
  refetch?: any;
  type: "profile" | "cv";
};

const CoachPersonalInfo = ({ data, editMode, refetch, type }: Props) => {
  const { data: userEducations } = useGetUserEducationsQuery({});
  const [deleteEducation] = useDeleteUserEducationMutation();

  return (
    <div className="bg-white flex flex-col gap-4 h-full rounded-lg md:rounded-2xl p-4">
      <h3 className="text-base font-medium text-center">Coach</h3>
      <div className="flex md:flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center">
          <Avatar
            className="w-32 h-32 object-cover transition-all delay-75 rounded-lg group-hover:border border-white box-border"
            src={data?.avatar}
            alt="Profile_Picture"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-xl ">
            {data?.first_name + " " + data?.last_name}
          </h2>
          <h4 className="text-perfBlue group-hover:text-white text-xs">
            {data?.job} Coach
          </h4>
          <Button className=" border border-perfBlue rounded-lg font-normal text-perfBlue hover:text-white">
            Send Message
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-between">
        <div className="profile text-left">
          <div>
            <h3 className="text-base font-medium text-perfLightBlack">
              Profile
            </h3>
            <p className="font-normal text-perfGray3 text-sm">
              {data?.bio ? data?.bio : "No Bio"}
            </p>
          </div>
          <div className="teams my-4 text-left">
            <h3 className="text-base font-medium text-perfLightBlack">Teams</h3>
            <div className="flex gap-4">
              {data?.teams?.map((team) => (
                <div className="font-normal text-perfGray3 text-sm">
                  <li>{team.name}</li>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="education text-left">
          <h3 className="text-base font-medium text-perfLightBlack">
            Education
          </h3>

          {userEducations &&
            userEducations.results.map((education) => {
              return (
                <div className="my-2 relative">
                  <p className="date text-xs font-normal text-perfGray3">
                    {education.year}
                  </p>
                  <h2>{education.degree}</h2>
                  <p className="date text-xs font-normal text-perfGray3">
                    {education.universty}
                  </p>
                  <div className="absolute right-0 top-0">
                    {editMode && (
                      <DeleteButton
                        deleteFun={() => {
                          deleteEducation({ id: education.id });
                        }}
                        name={education.degree}
                        type="Degree"
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {type === "profile" && editMode && (
        <EditCoachData
          educationData={userEducations?.results[0]}
          refetch={() => {
            if (refetch) refetch();
          }}
          data={data}
        />
      )}
    </div>
  );
};

export default CoachPersonalInfo;

type Edit = {
  data: User | PlayerCoach | undefined;
  educationData: Education | undefined;
  refetch: any;
};
// Edit Coach Personal Data Modal
function EditCoachData({ data, refetch, educationData }: Edit) {
  const [opened, setOpened] = useState(false);
  const [playerImage, setPlayerImage] = React.useState<string | unknown>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userAvatar, setUserAvatar] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [addUserEducation] = useAddUserEducationMutation();

  const onSubmitFunction = (e: any) => {
    e.preventDefault();
    const newEducation = {
      degree: e.target["degree"].value,
      universty: e.target["universty"].value,
      year: e.target["year"].value,
    };
    addUserEducation(newEducation)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    const formData = new FormData(e.currentTarget);

    if (userAvatar) formData.append("avatar", userAvatar);
    setIsLoading(true);
    try {
      axiosInstance
        .patch("user-generals/update-profile/", formData)
        .then((res) => {
          setIsLoading(false);
          setOpened(false);
          setPlayerImage(null);
          refetch();
        })
        .catch(() => {
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form className="flex flex-col gap-4 " onSubmit={onSubmitFunction}>
          {/* Image Upload */}
          <div className="relative photo place-self-center w-28 h-28">
            <Avatar
              className="object-cover w-full h-full rounded-lg"
              src={
                (userAvatar && URL.createObjectURL(userAvatar)) || data?.avatar
              }
              alt="user-avatar"
            />
            <div
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
            >
              <AppIcons
                className="w-5 h-5 absolute top-2 cursor-pointer right-2 text-perfGray3 hover:text-perfGray1"
                icon="PencilSquareIcon:outline"
              />
            </div>
            <input
              ref={fileInputRef}
              onChange={(e) =>
                setUserAvatar(e?.currentTarget?.files?.[0] as File)
              }
              type="file"
              className="hidden"
              id={"avatar"}
            />
          </div>

          {/*Name Input  */}
          <Input
            name="first_name"
            defaultValue={data?.first_name}
            id="firstName"
          />
          <Input
            name="last_name"
            defaultValue={data?.last_name}
            id="lastName"
          />

          {/* Bio Input */}
          <Textarea
            name="bio"
            defaultValue={data?.bio}
            placeholder="Your Bio"
          />

          {/*Degree Input  */}
          <Input name="degree" placeholder="Degree" />

          {/*Universty Input  */}
          <Input name="universty" placeholder="Universty Name" />

          {/*Universty Input  */}
          <Input
            name="year"
            type={"number"}
            placeholder="Pick Graduation date"
          />

          {/* Start And End Year */}
          {/* <DatePicker
            inputFormat="DD/MM/YYYY"
            defaultValue={
              data?.details?.education?.from
                ? new Date(data?.details?.education?.from as unknown as Date)
                : new Date()
            }
            name="from"
            placeholder="Pick Start date"
          /> */}

          {/* <DatePicker
            inputFormat="DD/MM/YYYY"
            name="year"
            placeholder={
              JSON.stringify(educationData?.year) || "Pick Graduation date"
            }
          /> */}

          <SubmitButton isLoading={isLoading} text="Send" />
        </form>
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
