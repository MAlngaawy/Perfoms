import { ReactNode, useState } from "react";
import { Group, Input, Modal } from "@mantine/core";
import SubmitButton from "~/@main/components/SubmitButton";
import AppUtils from "~/@main/utils/AppUtils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddPlayerSkillsMutation } from "~/app/store/user/userApi";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import AppIcons from "~/@main/core/AppIcons";

function AddSkill() {
  const [opened, setOpened] = useState(false);
  const [addSkill, { isLoading }] = useAddPlayerSkillsMutation();
  const { id } = useParams();

  const schema = yup.object().shape({
    name: yup.string().required("Please add your Skill to send"),
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
    addSkill({ player_id: id, ...data })
      .then(() => {
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Successfully added Skill"
        );
      })
      .catch(() => {
        AppUtils.showNotificationFun("Error", "Sorry", "Can't add Skill now");
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
        title={`Add Skill`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input.Wrapper
            error={errors.name && (errors.name.message as ReactNode)}
          >
            <Input placeholder="Add Name" {...register("name")} />
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
}

export default AddSkill;
