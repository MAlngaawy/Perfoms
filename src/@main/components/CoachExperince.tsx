import React, { useState, ReactNode } from "react";
import { Modal, Group, Input, Textarea } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SubmitButton from "~/@main/components/SubmitButton";
import { DatePicker } from "@mantine/dates";

type Props = {
  experinces: {
    start: string;
    end: string;
    title: string;
    works: string[];
  }[];
  qualifications: string[];
  courses: string[];
  editMode?: boolean;
};

const CoachExperince = (props: Props) => {
  return (
    <div className="bg-white flex flex-col sm:flex-row gap-8 h-full rounded-lg md:rounded-2xl p-4  pt-10">
      <div className="experinces">
        <>
          <TitleWithIcon name="Experinces" />
          {props.experinces.map((oneExp) => (
            <div className="flex flex-col ml-2 my-4">
              <p className="text-xs font-normal text-perfGray3">
                {oneExp.start} - {oneExp.end}
              </p>
              <h3 className="text-base font-semibold text-perfGray1">
                {oneExp.title}
              </h3>
              <ul className="list-disc list-outside ml-8">
                {oneExp.works.map((work) => (
                  <li className="text-xs font-normal text-perfGray3  my-4">
                    {work}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {props.editMode && <AddExperinces />}
        </>
      </div>
      <div className="flex flex-col gap-6">
        <div className="qualifications">
          <TitleWithIcon name="Core Qualifications" />
          <ul className="list-disc list-outside  ml-8">
            {props.qualifications.map((oneQualifications) => (
              <li
                key={oneQualifications}
                className="text-xs font-normal text-perfGray3 my-4"
              >
                {oneQualifications}
              </li>
            ))}
          </ul>
          {props.editMode && <AddQualifications />}
        </div>
        <div className="courses">
          <TitleWithIcon name="Courses" />
          <ul className="list-disc list-outside ml-8">
            {props.courses.map((course) => (
              <li className="text-xs font-normal text-perfGray3 my-4">
                {course}
              </li>
            ))}
          </ul>
          {props.editMode && <AddCourses />}
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
function AddExperinces() {
  const [opened, setOpened] = useState(false);
  // Form Schema
  const schema = yup.object().shape({
    startYear: yup.date(),
    endYear: yup.date(),
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

  // Submit Form Function
  const onSubmitFunction = (data: any) => {
    console.log(data);
    setOpened(false);
    reset({
      startYear: "",
      endYear: "",
      title: "",
      works: "",
    });
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
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
            {...register("startYear")}
            render={({ field }) => (
              <DatePicker {...field} placeholder="Pick Start date" />
            )}
            control={control}
          />
          <Controller
            {...register("endYear")}
            render={({ field }) => (
              <DatePicker {...field} placeholder="Pick End date" />
            )}
            control={control}
          />

          {/* Works Input */}
          <Textarea
            placeholder="Describe the experinces you got"
            withAsterisk
            error={errors.bio && (errors.bio.message as ReactNode)}
            {...register("works")}
          />

          <SubmitButton isLoading={false} text="Send" />
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
function AddQualifications() {
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

  const onSubmit = (data: any) => {
    console.log(data);
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
function AddCourses() {
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

  const onSubmit = (data: any) => {
    console.log(data);
    reset({ course: "" });
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
