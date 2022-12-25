import React, { useState, ReactNode } from "react";
import { Modal, Group, Input } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Details } from "~/app/store/types/parent-types";
import { useUpdateProfileMutation } from "~/app/store/user/userApi";
import NoReport from "~/app/pages/reports/components/NoReport";

type Props = {
  data: Details | undefined;
  editMode?: boolean;
};

const CoachAchievements = ({ data, editMode }: Props) => {
  // const { data: user } = useUserQuery(null);

  return (
    <div className="bg-white flex flex-col gap-4 h-full rounded-lg md:rounded-2xl p-4 pt-10">
      <div className="title">
        <h2 className="text-lg text-perfLightBlack font-medium mb-6">
          Achievements
        </h2>
      </div>
      <div className="prize flex flex-col xs:flex-row md:flex-col gap-4 justify-center items-center">
        {data?.achievements &&
          data?.achievements.map((item) => (
            <div className="flex gap-2 justify-center items-center">
              <div className="icon">
                <img
                  src="/assets/images/medal.png"
                  className="w-10"
                  alt="medal"
                />
              </div>
              <div className="details">
                <h2 className="type text-xs font-medium text-perfLightBlack">
                  {item.type}
                </h2>
                <p className="text-xs text-perfGray3">
                  {item.year}, {item.place}
                </p>
              </div>
            </div>
          ))}
        <>{!data && <NoReport />}</>
        {editMode && <AddButton data={data} />}
      </div>
    </div>
  );
};

export default CoachAchievements;

// Add Achevment Form

function AddButton({ data: oldDetails }: { data: Details | undefined }) {
  const [opened, setOpened] = useState(false);

  // Form Schema
  const schema = yup.object().shape({
    type: yup.string().required(),
    year: yup.number().required(),
    place: yup.string().required(),
  });

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // use Form Config
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit Form Function
  const onSubmitFunction = (data: any) => {
    const oldAchievements = oldDetails?.achievements || [];
    console.log(data);
    setOpened(false);
    updateProfile({
      details: {
        ...oldDetails,
        achievements: [
          ...oldAchievements,
          {
            type: data.type,
            year: data.year,
            place: data.place,
          },
        ],
      },
    });
    reset({ type: "", year: "", place: "" });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          reset({ type: "", year: "", place: "" });
          setOpened(false);
        }}
      >
        <form
          className="flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmitFunction)}
        >
          <Input.Wrapper
            error={errors.type && (errors.type.message as ReactNode)}
          >
            <Input placeholder="Medal Type" {...register("type")} />
          </Input.Wrapper>

          <Input.Wrapper
            error={errors.year && (errors.year.message as ReactNode)}
          >
            <Input
              placeholder="in any year you got this modal"
              {...register("year")}
            />
          </Input.Wrapper>

          <Input.Wrapper
            error={errors.place && (errors.place.message as ReactNode)}
          >
            <Input
              placeholder="Where you got this medal"
              {...register("place")}
            />
          </Input.Wrapper>

          <button type="submit" className="bg-perfBlue text-white p-2">
            Send
          </button>
        </form>
      </Modal>

      <Group position="center">
        <button
          onClick={() => setOpened(true)}
          className="text-sm xl:text-base p-2 transform hover:scale-105 duration-100 bg-white border border-perfGray3 rounded-lg text-perfGray3"
        >
          + Add achievements
        </button>
      </Group>
    </>
  );
}
