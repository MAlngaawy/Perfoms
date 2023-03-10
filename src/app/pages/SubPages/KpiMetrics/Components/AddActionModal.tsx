import { useState, ReactNode } from "react";
import { Modal, Input, Textarea } from "@mantine/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { useSuperAddActionMutation } from "~/app/store/supervisor/supervisorMainApi";
import { useAdminAddActopnMutation } from "~/app/store/clubManager/clubManagerApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { AddAction } from "~/app/store/types/supervisor-types";
import AppUtils from "~/@main/utils/AppUtils";

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
  const { data: user } = useUserQuery({});
  const [loading, setLoading] = useState<boolean>(false);

  const [superAddAction, { isLoading: superLoading }] =
    useSuperAddActionMutation();
  const [adminAddAction, { isLoading: adminLoading }] =
    useAdminAddActopnMutation();

  const addActionFun = (data: AddAction) => {
    setLoading(true);
    if (user?.user_type === "Admin") {
      setLoading(adminLoading);
      adminAddAction(data)
        .then(() => {
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Successfully Added Action"
          );
        })
        .catch(() => {
          AppUtils.showNotificationFun("Error", "Sorry", "Cant add Action Now");
        });
    } else {
      setLoading(superLoading);
      superAddAction(data)
        .then(() => {
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Successfully Added Action"
          );
        })
        .catch(() => {
          AppUtils.showNotificationFun("Error", "Sorry", "Cant add Action Now");
        });
    }
  };
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
    addActionFun({
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

            <Textarea
              placeholder="Action description"
              sx={{
                "&:hover:not(:disabled)": {
                  borderColor: "blue",
                  boxShadow: "unset",
                },
                "&:focus:not(:disabled)": {
                  borderColor: "blue",
                  boxShadow: "unset",
                },
              }}
              className="border-b"
              {...register("desc")}
              id="desc"
            />

            <SubmitButton isLoading={loading} text="Add Action" />
          </form>
        </Modal>
      </>
    </div>
  );
};

export default AddActionModal;
