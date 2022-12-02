import React from "react";
import { useState, ReactNode } from "react";
import { Modal, Group, Input } from "@mantine/core";
import AppIcons from "../../../../../@main/core/AppIcons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { useAddActionMutation } from "~/app/store/Supervisor/supervisorApi";

type Props = {
  opened: boolean;
  setOpened: any;
  metricId: number;
};

const schema = yup.object().shape({
  name: yup.string().required("please add the action name"),
  desc: yup.string().required("please add the action description"),
});

const AddActionModal = ({ metricId, opened, setOpened }: Props) => {
  // const [opened, setOpened] = useState(false);
  const [addAction, { isLoading }] = useAddActionMutation();

  const resetFields = () => {
    reset({
      desc: "",
      name: "",
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit Form Function
  const onSubmitFunction = (data: any) => {
    console.log({ metricId, ...data });
    addAction({
      metric_id: metricId,
      name: data.name,
      description: data.desc,
    });
    setOpened(false);
    resetFields();
  };

  return (
    <div>
      <>
        <Modal
          opened={opened}
          onClose={() => {
            resetFields();
            setOpened(false);
          }}
          title={`Add Action `}
        >
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmitFunction)}
          >
            <Input.Wrapper
              id="name"
              withAsterisk
              // label="Name"
              error={errors.name && (errors.name.message as ReactNode)}
            >
              <Input
                placeholder="Action name"
                sx={{
                  ".mantine-Input-input	": {
                    border: 0,
                    padding: 0,
                    borderBottom: 1,
                    borderStyle: "solid",
                    borderRadius: 0,
                    minHeight: 20,
                  },
                }}
                className="border-b"
                {...register("name")}
                id="name"
              />
            </Input.Wrapper>

            <Input.Wrapper
              id="desc"
              withAsterisk
              // label="Name"
              error={errors.desc && (errors.desc.message as ReactNode)}
            >
              <Input
                placeholder="Action description"
                sx={{
                  ".mantine-Input-input	": {
                    border: 0,
                    padding: 0,
                    borderBottom: 1,
                    borderStyle: "solid",
                    borderRadius: 0,
                    minHeight: 20,
                  },
                }}
                className="border-b"
                {...register("desc")}
                id="desc"
              />
            </Input.Wrapper>

            <SubmitButton isLoading={isLoading} text="Add Action" />
          </form>
        </Modal>

        {/* <Group position="center" className="h-full">
          <h2 onClick={() => setOpened(true)}>Add Action</h2>
        </Group> */}
      </>
    </div>
  );
};

export default AddActionModal;
