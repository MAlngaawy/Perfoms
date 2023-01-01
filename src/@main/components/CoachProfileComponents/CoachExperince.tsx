import React, { useState, ReactNode } from "react";
import { Modal, Group, Input, Textarea, Checkbox } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SubmitButton from "~/@main/components/SubmitButton";
import { DatePicker } from "@mantine/dates";
import { User } from "~/app/store/types/user-types";
import { Details, PlayerCoach } from "~/app/store/types/parent-types";
import {
  useAddUserExperiencesMutation,
  useGetUserExperiencesQuery,
  useUpdateProfileMutation,
} from "~/app/store/user/userApi";
import AppUtils from "../../utils/AppUtils";
import Placeholders from "../Placeholders";
import { Button } from "../Button";

type Props = {
  editMode?: boolean;
  data: User | PlayerCoach | undefined;
};

const CoachExperince = ({ data, editMode }: Props) => {
  const { data: experiences } = useGetUserExperiencesQuery({});
  console.log("experiences", experiences);

  // const hiddenFileInput = React.useRef(null);

  // const handleClick = (event: any) => {
  //   hiddenFileInput.current.click();
  // };

  // const handleChange = (event: any) => {
  //   const fileUploaded = event.target.files[0];
  //   props.handleFile(fileUploaded);
  // };

  // if (!data) {
  //   return (
  //     <div className="bg-white flex flex-col items-center gap-1 h-full rounded-lg md:rounded-2xl p-4  pt-10">
  //       <Placeholders
  //         img="/assets/images/nocv.png"
  //         preText={"You need to add your"}
  //         pageName={"CV"}
  //       />
  //       <Button
  //         label="Add your CV"
  //         style="bordered"
  //         className="py-1 rounded-lg"
  //         onClick={handleClick}
  //       />
  //       <input
  //         type="file"
  //         ref={hiddenFileInput}
  //         onChange={handleChange}
  //         style={{ display: "none" }}
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white flex flex-col sm:flex-row justify-between gap-8 h-full rounded-lg md:rounded-2xl p-4  pt-10">
      <div className="experinces sm:w-1/2">
        <TitleWithIcon name="Experinces" />
        {experiences?.results.length === 0 && (
          <h2>No Experiences Added Yet!</h2>
        )}
        {experiences?.results.map((exper) => {
          return (
            <>
              <div className="flex flex-col ml-2 my-4">
                <p className="text-xs font-normal text-perfGray3">
                  {exper.date_from + "/"}
                  {exper.date_to}
                </p>

                <h3 className="text-base font-semibold text-perfGray1">
                  {exper.title}
                </h3>

                <p className="text-xs font-normal text-perfGray3  my-4">
                  {exper.description}
                </p>
              </div>
            </>
          );
        })}
        {editMode && experiences && experiences.results.length < 2 && (
          <AddExperinces data={data?.details} />
        )}
      </div>

      <div className="flex flex-col gap-6  sm:w-1/2">
        <div className="qualifications">
          <TitleWithIcon name="Core Qualifications" />
          <ul className="list-disc list-outside  ml-8">
            {data?.details?.qualifications &&
              data?.details?.qualifications.map((oneQualifications: any) => (
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
              data?.details?.courses.map((course: any) => (
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
  const [checked, setChecked] = useState(false);

  // Form Schema
  const schema = yup.object().shape({
    date_from: yup.string(),
    date_to: yup.string(),
    title: yup.string().required(),
    description: yup.string(),
    to_present: yup.boolean(),
  });

  // use Form Config
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

  // const toPresent = watch("to_present");
  // console.log(toPresent);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [addExperience] = useAddUserExperiencesMutation();

  // Submit Form Function
  const onSubmitFunction = (data: any) => {
    console.log("DATA", data);
    addExperience(data)
      .then(() => {
        AppUtils.showNotificationFun("Success", "Done", "Experienc");
        reserFields();
        setOpened(false);
      })
      .catch((err) => {
        AppUtils.showNotificationFun("Error", "Sorry", "Something Went Wrong");
        // reserFields();
        // setOpened(false);
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
                inputFormat="DD/MM/YYYY"
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
                inputFormat="DD/MM/YYYY"
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
