import React, { useState, ReactNode, useEffect } from "react";
import { Modal, Group, Input } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AppUtils from "~/@main/utils/AppUtils";
import { useAddPlayerAchievementsMutation } from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";
import AppIcons from "~/@main/core/AppIcons";

type Props = {};

const AddAchievement = (props: Props) => {
  const { id } = useParams();
  const [opened, setOpened] = useState(false);
  const [addAchievements, { isLoading }] = useAddPlayerAchievementsMutation();

  // Form Schema
  const schema = yup.object().shape({
    type: yup.string().required(),
    year: yup.number().min(1900).max(3000).required(),
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
    setOpened(false);
    addAchievements({ player_id: id, ...data })
      .then((res) => {
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Successfully Added Achievement"
        );
      })
      .catch((err) => {
        AppUtils.showNotificationFun(
          "Error",
          "Sorry",
          "Can't Add Achievement Now"
        );
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
            error={errors.year && "You must enter a valid year: e.g 2012"}
          >
            <Input
              placeholder="Year: e.g 2012"
              {...register("year", { minLength: 4, maxLength: 4 })}
            />
          </Input.Wrapper>

          <Input.Wrapper
            error={errors.place && (errors.place.message as ReactNode)}
          >
            <Input placeholder="Place" {...register("place")} />
          </Input.Wrapper>

          <button type="submit" className="bg-perfBlue text-white p-2">
            Save
          </button>
        </form>
      </Modal>

      <Group position="center">
        <button onClick={() => setOpened(true)} className="">
          <AppIcons
            icon="PlusCircleIcon:outline"
            className="text-perfGray3 w-8 h-8 transform hover:scale-105 duration-100 "
          />
        </button>
      </Group>
    </>
  );
};

export default AddAchievement;
