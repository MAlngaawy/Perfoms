import React, { useState, ReactNode } from "react";
import { Modal, Group, Input, Textarea } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SubmitButton from "~/@main/components/SubmitButton";
import { DatePicker } from "@mantine/dates";
import { User } from "~/app/store/types/user-types";
import { Details } from "~/app/store/types/parent-types";
import { useUpdateProfileMutation } from "~/app/store/user/userApi";
import AppUtils from "../utils/AppUtils";

type Props = {
  // experinces: {
  //   start: string;
  //   end: string;
  //   title: string;
  //   works: string[];
  // }[];
  // qualifications: string[];
  // courses: string[];
  editMode?: boolean;
  data: User | undefined;
};

const CoachExperince = ({ data, editMode }: Props) => {
  return (
    <div className="bg-white flex flex-col sm:flex-row justify-between gap-8 h-full rounded-lg md:rounded-2xl p-4  pt-10">
      <div className="experinces  sm:w-1/2">
        <>
          <TitleWithIcon name="Experinces" />
          <div className="flex flex-col ml-2 my-4">
            <p className="text-xs font-normal text-perfGray3">
              {data?.details?.experinces && data?.details?.experinces.from} -
              {data?.details?.experinces && data?.details?.experinces.to}
            </p>

            <h3 className="text-base font-semibold text-perfGray1">
              {data?.details?.experinces && data?.details?.experinces.name}
            </h3>
            <p className="text-xs font-normal text-perfGray3  my-4">
              {data?.details?.experinces &&
                data?.details?.experinces.description}
            </p>
          </div>
          {editMode && <AddExperinces data={data?.details} />}
        </>
      </div>
      <div className="flex flex-col gap-6  sm:w-1/2">
        <div className="qualifications">
          <TitleWithIcon name="Core Qualifications" />
          <ul className="list-disc list-outside  ml-8">
            {data?.details?.qualifications &&
              data?.details?.qualifications.map((oneQualifications) => (
                <li
                  key={oneQualifications}
                  className="text-xs font-normal text-perfGray3 my-4"
                >
                  {oneQualifications}
                </li>
              ))}
          </ul>
          {editMode && <AddQualifications data={data?.details} />}
        </div>
        <div className="courses">
          <TitleWithIcon name="Courses" />
          <ul className="list-disc list-outside ml-8">
            {data?.details?.courses &&
              data?.details?.courses.map((course) => (
                <li className="text-xs font-normal text-perfGray3 my-4">
                  {course}
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

// Add Experinces Modal
function AddExperinces({ data: oldDetails }: { data: Details | undefined }) {
  const [opened, setOpened] = useState(false);
  // Form Schema
  const schema = yup.object().shape({
    startYear: yup.string(),
    endYear: yup.string(),
    title: yup.string().required(),
    works: yup.string(),
  });

  // use Form Config
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // Submit Form Function
  const onSubmitFunction = (data: any) => {
    console.log(data);
    setOpened(false);
    updateProfile({
      details: {
        ...oldDetails,
        experinces: {
          from: AppUtils.formatDate(new Date(data.startYear)),
          to: AppUtils.formatDate(new Date(data.endYear)),
          name: data.title,
          description: data.works,
        },
      },
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
            <Input
              defaultValue={oldDetails?.experinces?.name}
              placeholder="Add Title"
              {...register("title")}
            />
          </Input.Wrapper>

          {/* Start And End Year */}
          <Controller
            {...register("startYear")}
            render={({ field }) => (
              <DatePicker
                inputFormat="DD/MM/YYYY"
                defaultValue={
                  new Date(oldDetails?.experinces?.from as unknown as Date)
                }
                {...field}
                placeholder="Pick Start date"
              />
            )}
            control={control}
          />
          <Controller
            {...register("endYear")}
            render={({ field }) => (
              <DatePicker
                inputFormat="DD/MM/YYYY"
                defaultValue={
                  new Date(oldDetails?.experinces?.to as unknown as Date)
                }
                {...field}
                placeholder="Pick End date"
              />
            )}
            control={control}
          />

          {/* Works Input */}
          <Textarea
            placeholder="Describe the experinces you got"
            withAsterisk
            defaultValue={oldDetails?.experinces?.description}
            error={errors.bio && (errors.bio.message as ReactNode)}
            {...register("works")}
          />

          <SubmitButton isLoading={isLoading} text="Send" />
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

// Add Qualifications Modal
function AddQualifications({
  data: oldDetails,
}: {
  data: Details | undefined;
}) {
  const [opened, setOpened] = useState(false);

  const schema = yup.object().shape({
    qualification: yup
      .string()
      .required("Please add your qualifications to send"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const onSubmit = (data: any) => {
    const oldQualifications = oldDetails?.qualifications || [];

    updateProfile({
      details: {
        ...oldDetails,
        qualifications: [...oldQualifications, data.qualification],
      },
    });

    reset({ qualification: "" });
    setOpened(false);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          reset({ qualification: "" });
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
            <Input
              placeholder="Add Qualifiactions"
              {...register("qualification")}
            />
          </Input.Wrapper>

          <SubmitButton isLoading={false} text="Send" />
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

// Add Courses Modal
function AddCourses({ data: oldDetails }: { data: Details | undefined }) {
  const [opened, setOpened] = useState(false);

  const schema = yup.object().shape({
    course: yup.string().required("Please add your course to send"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const onSubmit = (data: any) => {
    const oldCourses = oldDetails?.courses || [];

    updateProfile({
      details: {
        ...oldDetails,
        courses: [...oldCourses, data.course],
      },
    });

    reset({ course: "" });
    setOpened(false);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          reset({ course: "" });
          setOpened(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input.Wrapper
            error={errors.course && (errors.course.message as ReactNode)}
          >
            <Input placeholder="Add Course" {...register("course")} />
          </Input.Wrapper>

          <SubmitButton isLoading={false} text="Send" />
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
