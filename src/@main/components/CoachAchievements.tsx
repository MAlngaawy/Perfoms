import React, { useState, ReactNode } from "react";
import { Modal, Group, Input } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {
  data: {
    type: string;
    year: number;
    place: string;
  }[];
  editMode?: boolean;
};

const CoachAchievements = ({ data, editMode }: Props) => {
  return (
    <div className="bg-white flex flex-col gap-4 h-full rounded-lg md:rounded-2xl p-4 pt-10">
      <div className="title">
        <h2 className="text-xl text-perfLightBlack font-medium mb-6">
          Achievements
        </h2>
      </div>
      <div className="prize flex flex-col xs:flex-row md:flex-col gap-4 justify-center items-center">
        {data.map((item) => (
          <div className="flex gap-2 justify-center items-center">
            <div className="icon">
              <img
                src="/assets/images/medal.png"
                className="w-10"
                alt="medal"
              />
            </div>
            <div className="details">
              <h2 className="type font-medium text-perfLightBlack">
                {item.type}
              </h2>
              <p className="text-xs text-perfGray3">
                {item.year}, {item.place}{" "}
              </p>
            </div>
          </div>
        ))}
        {editMode && <AddButton />}
      </div>
    </div>
  );
};

export default CoachAchievements;

// Add Achevment Form

function AddButton() {
  const [opened, setOpened] = useState(false);

  // Form Schema
  const schema = yup.object().shape({
    type: yup.string().required(),
    year: yup.number().required(),
    place: yup.string().required(),
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

  // Submit Form Function
  const onSubmitFunction = (data: any) => {
    console.log(data);
    setOpened(false);
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
        title="Introduce yourself!"
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
