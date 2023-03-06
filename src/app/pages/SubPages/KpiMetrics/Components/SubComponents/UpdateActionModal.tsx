import { useState, ReactNode } from "react";
import { Modal, Input, Textarea } from "@mantine/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "~/@main/components/SubmitButton";
import { useSuperAddActionMutation } from "~/app/store/supervisor/supervisorMainApi";
import {
  useAdminAddActopnMutation,
  useUpdateOneActionMutation,
  useUpdateOneRecommendationMutation,
} from "~/app/store/clubManager/clubManagerApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { AddAction } from "~/app/store/types/supervisor-types";
import AppUtils from "~/@main/utils/AppUtils";
import { ActionCruds, UpdateAction } from "~/app/store/types/clubManager-types";

type EditProps = {
  opened: boolean;
  setOpened: any;
  actionData: ActionCruds;
  type: "Action" | "Recommendation";
};

const schema = yup.object().shape({
  name: yup.string().required("please add the action name"),
  desc: yup.string().required("please add the action description"),
});

const EditSignleAction = ({
  opened,
  setOpened,
  actionData,
  type,
}: EditProps) => {
  const { data: user } = useUserQuery({});

  const [updateAction, { isLoading: actionLoading }] =
    useUpdateOneActionMutation();
  const [updateRecommendation, { isLoading: recommendationLoading }] =
    useUpdateOneRecommendationMutation();

  const updateActionFun = (data: any) => {
    // setLoading(true);
    if (type === "Action") {
      updateAction(data).then((res) => {
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Successfully Updated Action"
        );
      });
    } else {
      updateRecommendation(data).then((res) => {
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Successfully Updated Recommendation"
        );
      });
    }

    // if (user?.user_type === "Admin") {
    //   setLoading(adminLoading);
    //   adminAddAction(data)
    //     .then(() => {
    //       AppUtils.showNotificationFun(
    //         "Success",
    //         "Done",
    //         "Successfully Added Action"
    //       );
    //     })
    //     .catch(() => {
    //       AppUtils.showNotificationFun("Error", "Sorry", "Cant add Action Now");
    //     });
    // } else {
    //   setLoading(superLoading);
    //   superAddAction(data)
    //     .then(() => {
    //       AppUtils.showNotificationFun(
    //         "Success",
    //         "Done",
    //         "Successfully Added Action"
    //       );
    //     })
    //     .catch(() => {
    //       AppUtils.showNotificationFun("Error", "Sorry", "Cant add Action Now");
    //     });
    // }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit Form Function
  const onSubmitFunction = (data: any) => {
    updateActionFun({
      action_id: actionData.id,
      recommendation_id: actionData.id,
      name: data.name,
      description: data.desc,
    });
    setOpened(false);
  };

  return (
    <div>
      <>
        <Modal
          opened={opened}
          onClose={() => {
            setOpened(false);
          }}
          title={`Update Action `}
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
                defaultValue={actionData.name}
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

            {/* <Input.Wrapper
              id="desc"
              withAsterisk
              // label="Name"
              error={errors.desc && (errors.desc.message as ReactNode)}
            >
              <Input
                placeholder="Action description"
                defaultValue={actionData.description}
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
            </Input.Wrapper> */}

            <Textarea
              placeholder="Action description"
              defaultValue={actionData.description}
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

            <SubmitButton
              isLoading={actionLoading || recommendationLoading}
              text="Update Action"
            />
          </form>
        </Modal>
      </>
    </div>
  );
};

export default EditSignleAction;
