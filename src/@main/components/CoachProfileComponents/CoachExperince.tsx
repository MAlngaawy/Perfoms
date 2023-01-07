import React, { useState, ReactNode, useEffect } from "react";
import { Modal, Group, Input, Textarea, Checkbox } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SubmitButton from "~/@main/components/SubmitButton";
import { DatePicker } from "@mantine/dates";
import {
  Courses,
  Qualifications,
  User,
  UserExperinces,
} from "~/app/store/types/user-types";
import { Details, PlayerCoach } from "~/app/store/types/parent-types";
import {
  useAddUserCoursesMutation,
  useAddUserExperiencesMutation,
  useAddUserQualificationsMutation,
  useDeleteCourseMutation,
  useDeleteExperiencesMutation,
  useDeleteQualificationsMutation,
  useGetCoachCoursesQuery,
  useGetCoachExperiencesQuery,
  useGetCoachQualificationsQuery,
  useGetUserCoursesQuery,
  useGetUserExperiencesQuery,
  useGetUserQualificationsQuery,
  useUpdateProfileMutation,
  useUserQuery,
} from "~/app/store/user/userApi";
import AppUtils from "../../utils/AppUtils";
import DeleteButton from "../ManagerComponents/SubComponents/DeleteButton";
import { useParams } from "react-router-dom";

type Props = {
  editMode?: boolean;
  data: User | PlayerCoach | undefined;
};

const CoachExperince = ({ data, editMode }: Props) => {
  const [experiences, setExperiences] = useState<UserExperinces>();
  const [qualifications, setQualifications] = useState<Qualifications>();
  const [courses, setCourses] = useState<Courses>();

  const { data: user } = useUserQuery({});
  const { coach_id } = useParams();

  const { data: userExperiences } = useGetUserExperiencesQuery({});
  const { data: userQualifications } = useGetUserQualificationsQuery({});
  const { data: userCourses } = useGetUserCoursesQuery({});

  const { data: coachExperiences } = useGetCoachExperiencesQuery(
    {
      coach_id,
    },
    {
      skip: !coach_id,
    }
  );
  const { data: coachQualifications } = useGetCoachQualificationsQuery(
    {
      coach_id,
    },
    {
      skip: !coach_id,
    }
  );
  const { data: coachCourses } = useGetCoachCoursesQuery(
    {
      coach_id,
    },
    {
      skip: !coach_id,
    }
  );

  const [deleteExperience] = useDeleteExperiencesMutation();
  const [deleteQualification] = useDeleteQualificationsMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  useEffect(() => {
    if (user?.user_type === "Parent") {
      setExperiences(coachExperiences);
      setQualifications(coachQualifications);
      setCourses(coachCourses);
    } else {
      setExperiences(userExperiences);
      setQualifications(userQualifications);
      setCourses(userCourses);
    }
  }, [
    coachExperiences,
    coachQualifications,
    coachCourses,
    userExperiences,
    userQualifications,
    userCourses,
  ]);

  return (
    <div className="bg-white flex flex-col sm:flex-row justify-between gap-8 h-full rounded-lg md:rounded-2xl p-4  pt-10">
      <div className="experinces sm:w-1/2">
        <TitleWithIcon name="Experinces" />
        {experiences?.results.length === 0 && (
          <h2 className="my-4">
            No <span className="text-perfBlue"> Experiences </span> Added Yet!
          </h2>
        )}
        {experiences?.results.map((exper) => {
          return (
            <div
              key={exper.id}
              className="flex flex-col ml-2 my-4 relative break-words"
            >
              <p className="text-xs font-normal text-perfGray3">
                {exper.date_from + " / "}
                {exper.to_present ? "Present" : exper.date_to}
              </p>

              <h3 className="text-base font-semibold text-perfGray1">
                {exper.title}
              </h3>

              <p className="text-xs font-normal text-perfGray3  my-2">
                {exper.description}
              </p>
              {editMode && (
                <div className=" absolute right-0 top-0">
                  <DeleteButton
                    type="Experience"
                    name={exper.title}
                    deleteFun={() => {
                      deleteExperience({ id: exper.id })
                        .then(() => {
                          AppUtils.showNotificationFun(
                            "Success",
                            "Done",
                            "Experience Successfully Deleted"
                          );
                        })
                        .catch(() => {
                          AppUtils.showNotificationFun(
                            "Error",
                            "Sorry",
                            "Can't Delete Experience Now"
                          );
                        });
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
        {/* {editMode && experiences && experiences.results.length < 2 && (
          <AddExperinces data={data?.details} />
        )} */}
        {editMode && <AddExperinces data={data?.details} />}
      </div>

      <div className="flex flex-col gap-6  sm:w-1/2">
        <div className="qualifications">
          <TitleWithIcon name="Core Qualifications" />
          {qualifications?.results.length === 0 && (
            <h2 className="my-4">
              No <span className="text-perfBlue"> Qualifications </span> Added
              Yet!
            </h2>
          )}
          <ul className="list-disc list-outside  ml-8">
            {qualifications?.results.map((oneQualifications) => (
              <li
                key={oneQualifications.id}
                className="text-xs w-full relative font-normal text-perfGray3 my-4 pr-5 break-words"
              >
                {editMode && (
                  <div className="absolute right-0">
                    <DeleteButton
                      name={oneQualifications.name}
                      type="Qualification"
                      deleteFun={() => {
                        deleteQualification({ id: oneQualifications.id })
                          .then(() => {
                            AppUtils.showNotificationFun(
                              "Success",
                              "Done",
                              "Qualification Successfully Deleted"
                            );
                          })
                          .catch(() => {
                            AppUtils.showNotificationFun(
                              "Error",
                              "Sorry",
                              "Can't Delete Qualification Now"
                            );
                          });
                      }}
                    />
                  </div>
                )}
                {oneQualifications.name}
              </li>
            ))}
          </ul>
          {editMode && <AddQualifications />}
        </div>
        <div className="courses">
          <TitleWithIcon name="Courses" />
          {courses?.results.length === 0 && (
            <h2 className="my-4">
              No <span className="text-perfBlue"> Courses </span> Added Yet!
            </h2>
          )}
          <ul className="list-disc list-outside  ml-8">
            {courses?.results.map((course) => (
              <li
                key={course.id}
                className="text-xs w-full relative font-normal text-perfGray3 my-4 pr-5 break-words"
              >
                {editMode && (
                  <div className="absolute right-0">
                    <DeleteButton
                      name={course.name}
                      type="Courses"
                      deleteFun={() => {
                        deleteCourse({ id: course.id })
                          .then(() => {
                            AppUtils.showNotificationFun(
                              "Success",
                              "Done",
                              "Courses Successfully Deleted"
                            );
                          })
                          .catch(() => {
                            AppUtils.showNotificationFun(
                              "Error",
                              "Sorry",
                              "Can't Delete Courses Now"
                            );
                          });
                      }}
                    />
                  </div>
                )}
                {course.name}
              </li>
            ))}
          </ul>
          {editMode && <AddCourses data={data?.details} />}
        </div>
      </div>
    </div>
  );
};

export default CoachExperince;

const TitleWithIcon = ({ name }: { name: string }) => {
  return (
    <div className="flex gap-2 items-center mb-6">
      <div className="icon bg-perfBlue p-1 rounded-full">
        <AppIcons className="w-5 h-5 text-white" icon="BriefcaseIcon:solid" />
        {/* <AppIcons icon="Briefcase:solid" /> */}
      </div>
      <div className="title">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

/***
 * Add Experinces Modal
 */
function AddExperinces({ data: oldDetails }: { data: Details | undefined }) {
  const [opened, setOpened] = useState(false);
  const [checked, setChecked] = useState(false);

  const schema = yup.object().shape({
    date_from: yup.string(),
    date_to: yup.string(),
    title: yup.string().required(),
    description: yup.string(),
    to_present: yup.boolean(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const reserFields = () => {
    reset({
      date_from: null,
      date_to: null,
      title: "",
      description: "",
      to_present: yup.boolean(),
    });
  };

  const [addExperience, { isLoading }] = useAddUserExperiencesMutation();

  const onSubmitFunction = (data: any) => {
    const newData = {
      ...data,
      date_from: AppUtils.formatDate(new Date(data.date_from)),
      date_to: AppUtils.formatDate(new Date(data.date_to)),
      place: "No Place",
    };
    addExperience(newData)
      .then(() => {
        AppUtils.showNotificationFun("Success", "Done", "Experienc");
        reserFields();
        setOpened(false);
      })
      .catch((err) => {
        AppUtils.showNotificationFun("Error", "Sorry", "Something Went Wrong");
        reserFields();
        setOpened(false);
      });
  };
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form
          className="flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmitFunction)}
        >
          {/*Name Input  */}
          <Input.Wrapper
            error={errors.name && (errors.name.message as ReactNode)}
          >
            <Input placeholder="Add Title" {...register("title")} />
          </Input.Wrapper>

          {/* Start And End Year */}
          <Controller
            {...register("date_from")}
            render={({ field }) => (
              <DatePicker
                inputFormat="YYYY-MM-DD"
                {...field}
                placeholder="Pick Start date"
              />
            )}
            control={control}
          />
          <Controller
            {...register("date_to")}
            render={({ field }) => (
              <DatePicker
                disabled={checked}
                inputFormat="YYYY-MM-DD"
                {...field}
                placeholder="Pick End date"
              />
            )}
            control={control}
          />
          <Checkbox
            checked={checked}
            {...register("to_present")}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />

          {/* Works Input */}
          <Textarea
            placeholder="Describe the experinces you got"
            withAsterisk
            error={errors.bio && (errors.bio.message as ReactNode)}
            {...register("description")}
          />

          <SubmitButton isLoading={isLoading} text="Save" />
        </form>
      </Modal>

      <Group position="center">
        <button
          onClick={() => setOpened(true)}
          className="text-sm xl:text-base p-2 transform hover:scale-105 duration-100 bg-white border border-perfGray3 rounded-lg text-perfGray3"
        >
          + Add Experiance
        </button>
      </Group>
    </>
  );
}

/**
 * Add Qualifications Modal
 */
function AddQualifications() {
  const [opened, setOpened] = useState(false);
  const [addQualifications, { isLoading }] = useAddUserQualificationsMutation();

  const schema = yup.object().shape({
    name: yup.string().required("Please add your qualification to send"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    addQualifications(data)
      .then(() => {
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Qualification added successfully"
        );
      })
      .catch(() => {
        AppUtils.showNotificationFun(
          "Error",
          "Sorry",
          "Can't add Qualification now"
        );
      });
    reset({ name: "" });
    setOpened(false);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          reset({ name: "" });
          setOpened(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input.Wrapper
            error={
              errors.qualification &&
              (errors.qualification.message as ReactNode)
            }
          >
            <Input placeholder="Add Qualifiactions" {...register("name")} />
          </Input.Wrapper>

          <SubmitButton isLoading={isLoading} text="Save" />
        </form>
      </Modal>

      <Group position="center">
        <button
          onClick={() => setOpened(true)}
          className="text-sm xl:text-base p-2 transform hover:scale-105 duration-100 bg-white border border-perfGray3 rounded-lg text-perfGray3"
        >
          + Add Qualifications
        </button>
      </Group>
    </>
  );
}

/**
 * Add Courses Modal
 */
function AddCourses({ data: oldDetails }: { data: Details | undefined }) {
  const [opened, setOpened] = useState(false);
  const [addCourse, { isLoading }] = useAddUserCoursesMutation();

  const schema = yup.object().shape({
    name: yup.string().required("Please add your Course to send"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    addCourse(data)
      .then(() => {
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Course added successfully"
        );
      })
      .catch(() => {
        AppUtils.showNotificationFun("Error", "Sorry", "Can't add Course now");
      });
    reset({ name: "" });
    setOpened(false);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          reset({ name: "" });
          setOpened(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input.Wrapper
            error={errors.course && (errors.course.message as ReactNode)}
          >
            <Input placeholder="Add Course" {...register("name")} />
          </Input.Wrapper>

          <SubmitButton isLoading={isLoading} text="Save" />
        </form>
      </Modal>

      <Group position="center">
        <button
          onClick={() => setOpened(true)}
          className="text-sm xl:text-base p-2 transform hover:scale-105 duration-100 bg-white border border-perfGray3 rounded-lg text-perfGray3"
        >
          + Add Courses
        </button>
      </Group>
    </>
  );
}
