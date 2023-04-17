import { yupResolver } from "@hookform/resolvers/yup";
import { Group, Input, Modal } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "~/@main/components/SubmitButton";
import AppUtils from "~/@main/utils/AppUtils";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import {
  useAddPlayerEducationMutation,
  useAddUserEducationMutation,
} from "~/app/store/user/userApi";
import AppIcons from "~/@main/core/AppIcons";

type Props = {};

const AddEducation = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const [isLoading] = useState(false);
  const [addPlayerEducation] = useAddPlayerEducationMutation();
  const { id } = useParams();

  // Form Schema
  const schema = yup.object().shape({
    degree: yup.string().required(),
    universty: yup.string().required(),
    // year: yup.number().optional(),
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

    addPlayerEducation({ player_id: id, ...data })
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
      {" "}
      <Modal
        title={`Add Education`}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <form
          className="flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmitFunction)}
        >
          {/*Degree Input  */}
          <Input.Wrapper
            error={errors.degree && "study field is a required field"}
          >
            <Input placeholder="study field" {...register("degree")} />
          </Input.Wrapper>

          {/*Universty Input  */}
          <Input.Wrapper
            error={
              errors.universty &&
              "high school Or Universty Name is a required field"
            }
          >
            <Input
              placeholder="high school Or Universty Name"
              {...register("universty")}
            />
          </Input.Wrapper>

          <Input.Wrapper
            error={errors.year && "You must enter a valid year: e.g 2012"}
          >
            <Input
              type={"string"}
              placeholder="Pick Graduation date"
              {...register("year")}
            />
          </Input.Wrapper>

          <SubmitButton isLoading={isLoading} text="Save" />
        </form>
      </Modal>
      <Group position="center">
        <button onClick={() => setOpened(true)} className="">
          <AppIcons
            icon="PlusCircleIcon:outline"
            className="text-perfGray3 w-5 h-5 transform hover:scale-105 duration-100 "
          />
        </button>
      </Group>
    </>
  );
};

export default AddEducation;
