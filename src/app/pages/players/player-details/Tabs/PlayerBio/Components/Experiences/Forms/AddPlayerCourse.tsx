import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddPlayerCourseMutation } from "~/app/store/user/userApi";
import AppUtils from "~/@main/utils/AppUtils";
import { Group, Input, Modal } from "@mantine/core";
import SubmitButton from "~/@main/components/SubmitButton";
import AppIcons from "~/@main/core/AppIcons";
import { useParams } from "react-router-dom";

type Props = {};

const AddPlayerCourse = (props: Props) => {
  const { id } = useParams();
  const [opened, setOpened] = useState(false);
  const [addCourse, { isLoading }] = useAddPlayerCourseMutation();

  const schema = yup.object().shape({
    name: yup.string().required("Please add your Camps to send"),
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
    addCourse({ player_id: id, ...data })
      .then((res) => {
        console.log(res);

        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Successfully added Camp"
        );
      })
      .catch(() => {
        AppUtils.showNotificationFun("Error", "Sorry", "Can't add Camp now");
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
        title={`Add Camp`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input.Wrapper
            error={errors.course && (errors.course.message as ReactNode)}
          >
            <Input placeholder="Add Camp" {...register("name")} />
          </Input.Wrapper>

          <SubmitButton isLoading={isLoading} text="Add" />
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

export default AddPlayerCourse;
