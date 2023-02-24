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
import { Education, Educations, User } from "~/app/store/types/user-types";
import { PlayerCoach } from "~/app/store/types/parent-types";
import { axiosInstance } from "~/app/configs/dataService";
import {
  useAddUserEducationMutation,
  useDeleteUserEducationMutation,
  useGetCoachEducationsQuery,
  useGetUserEducationsQuery,
  useUserQuery,
} from "~/app/store/user/userApi";
import DeleteButton from "../ManagerComponents/SubComponents/DeleteButton";
import { useNavigate, useParams } from "react-router-dom";
import AppUtils from "~/@main/utils/AppUtils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AvatarInput from "../shared/AvatarInput";

// Props Types
type Props = {
  data: Partial<User> | undefined;
  editMode?: boolean;
  refetch?: any;
  type: "profile" | "cv";
};

const CoachPersonalInfo = ({ data, editMode, refetch, type }: Props) => {
  const [educations, setEducations] = useState<Educations>();
  const { coach_id } = useParams();
  const { data: user } = useUserQuery({});
  const { data: userEducations } = useGetUserEducationsQuery({});
  const { data: coachEducations } = useGetCoachEducationsQuery(
    { coach_id: coach_id },
    { skip: !coach_id }
  );
  const [deleteEducation] = useDeleteUserEducationMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user_type === "Parent") {
      setEducations(coachEducations);
    } else {
      setEducations(userEducations);
    }
  }, [userEducations, coachEducations]);

  return (
    <div className="bg-white flex flex-col gap-4 h-full rounded-lg md:rounded-2xl p-4">
      <h3 className="text-base font-medium text-center">{data?.user_type}</h3>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center">
          <Avatar
            className="object-cover transition-all delay-75 rounded-lg group-hover:border border-white box-border"
            src={data?.avatar}
            alt="Profile_Picture"
            size={200}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-xl ">
            {data?.first_name + " " + data?.last_name}
          </h2>
          <h4 className="text-perfBlue group-hover:text-white text-xs">
            {data?.job}
          </h4>
          {/* {data?.user_type == "Parent" && (
            <Button
              onClick={() => navigate("/chat")}
              className=" border border-perfBlue rounded-lg font-normal text-perfBlue hover:text-white"
            >
              Send Message
            </Button>
          )} */}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row md:flex-col justify-around">
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
                <div
                  key={team?.id}
                  className="font-normal text-perfGray3 text-sm"
                >
                  <li>{team.name}</li>
                </div>
              ))}
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

        <div className="education text-left mt-5">
          <h3 className="text-base font-medium text-perfLightBlack">
            Education
          </h3>

          {educations?.results.length === 0 && (
            <h2 className="my-4">
              No <span className="text-perfBlue"> Educations </span> Added Yet!
            </h2>
          )}

          {educations?.results.map((education) => {
            return (
              <div key={education.id} className="my-2 relative">
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
                        deleteEducation({ id: education.id })
                          .then(() => {
                            AppUtils.showNotificationFun(
                              "Success",
                              "Done",
                              "Successfully Deleted Education"
                            );
                          })
                          .catch(() => {
                            AppUtils.showNotificationFun(
                              "Error",
                              "Sorry",
                              "Can't add Education now"
                            );
                          });
                      }}
                      name={education.degree}
                      type="Degree"
                    />
                  )}
                </div>
              </div>
            );
          })}
          {type === "profile" && editMode && (
            <EditEducation
              educationData={userEducations?.results[0]}
              refetch={() => {
                if (refetch) refetch();
              }}
              data={data}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachPersonalInfo;

type Edit = {
  data: Partial<User> | undefined;
  educationData: Education | undefined;
  refetch: any;
};

// Edit Coach Education
const EditEducation = ({ data, refetch, educationData }: Edit) => {
  const [opened, setOpened] = useState(false);
  const [isLoading] = useState(false);
  const [addUserEducation] = useAddUserEducationMutation();

  // Form Schema
  const schema = yup.object().shape({
    degree: yup.string().required(),
    universty: yup.string().required(),
    year: yup.number().min(1900).max(3000).required(),
  });

  // use Form Config
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = async (data: any, e: any) => {
    e.preventDefault();

    setOpened(false);

    addUserEducation(data)
      .then(() => {
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Successfully added Education"
        );
      })
      .catch(() => {
        AppUtils.showNotificationFun(
          "Error",
          "Sorry",
          "Can't add Education now"
        );
      });

    reset({ degree: "", universty: "", year: "" });
  };

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form
          className="flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmitFunction)}
        >
          {/*Degree Input  */}
          <Input.Wrapper error={errors.degree && "Degree is a required field"}>
            <Input placeholder="Degree" {...register("degree")} />
          </Input.Wrapper>

          {/*Universty Input  */}
          <Input.Wrapper
            error={errors.universty && "University is a required field"}
          >
            <Input placeholder="Universty Name" {...register("universty")} />
          </Input.Wrapper>

          {/*Universty Input  */}

          <Input.Wrapper
            error={errors.year && "You must enter a valid year: e.g 2012"}
          >
            <Input
              type={"number"}
              placeholder="Pick Graduation date"
              {...register("year")}
            />
          </Input.Wrapper>

          <SubmitButton isLoading={isLoading} text="Save" />
        </form>
      </Modal>

      <Group>
        <button
          onClick={() => setOpened(true)}
          className="text-xs flex gap-2 xl:text-base p-2 transform hover:scale-105 duration-100 bg-white border border-perfGray3 rounded-lg text-perfGray3"
        >
          <span>+ Add Education</span>
        </button>
      </Group>
    </>
  );
};

// Edit Coach Personal Data Modal
function EditCoachData({ data, refetch, educationData }: Edit) {
  const [opened, setOpened] = useState(false);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addUserEducation] = useAddUserEducationMutation();

  const onSubmitFunction = async (e: any) => {
    e.preventDefault();

    setOpened(false);

    const formData = new FormData(e.currentTarget);

    if (userAvatar) {
      const minimizedImage = await AppUtils.resizeImage(userAvatar);
      formData.append("avatar", minimizedImage as string);
    }
    setIsLoading(true);
    try {
      axiosInstance
        .patch("user-generals/update-profile/", formData)
        .then((res) => {
          setIsLoading(false);
          setOpened(false);
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Successfully Edited Coach Data"
          );
          refetch();
        })
        .catch(() => {
          setIsLoading(false);
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Something went wrong"
          );
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
          <AvatarInput
            userAvatar={userAvatar}
            currentImage={data?.avatar}
            setUserAvatar={setUserAvatar}
          />

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

          <SubmitButton isLoading={isLoading} text="Save" />
        </form>
      </Modal>

      <Group>
        <button
          onClick={() => setOpened(true)}
          className="text-xs flex gap-2 items-center xl:text-base p-2 transform hover:scale-105 duration-100 bg-white border border-perfGray3 rounded-lg text-perfGray3"
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
