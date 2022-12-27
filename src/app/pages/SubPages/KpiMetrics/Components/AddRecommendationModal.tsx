import React from "react";
import { useState, ReactNode } from "react";
import { Modal, Group, Input } from "@mantine/core";
import AppIcons from "../../../../../@main/core/AppIcons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { useSuperAddRecommendationsMutation } from "~/app/store/supervisor/supervisorMainApi";
import { useUserQuery } from "~/app/store/user/userApi";
import { AddRecommendation } from "~/app/store/types/supervisor-types";
import { useAdminAddRecommendationsMutation } from "~/app/store/clubManager/clubManagerApi";
import AppUtils from "~/@main/utils/AppUtils";

type Props = {
  opened: boolean;
  setOpened: any;
  metricId: number;
};

const schema = yup.object().shape({
  name: yup.string().required("please add the recommendation name"),
  desc: yup.string().required("please add the recommendation description"),
});

const AddRecomendationModal = ({ metricId, opened, setOpened }: Props) => {
  const { data: user } = useUserQuery({});
  const [loading, setLoading] = useState<boolean>(false);

  const [superAddRecommendation, { isLoading: superLoading }] =
    useSuperAddRecommendationsMutation();
  const [adminAddRecommendation, { isLoading: adminLoading }] =
    useAdminAddRecommendationsMutation();

  const addRecommendation = (data: AddRecommendation) => {
    setLoading(true);
    if (user?.user_type === "Admin") {
      setLoading(adminLoading);
      adminAddRecommendation(data)
        .then(() => {
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Successfly Added Recommendation"
          );
        })
        .catch(() => {
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Cant add Recommendation Now"
          );
        });
    } else {
      setLoading(superLoading);
      superAddRecommendation(data)
        .then(() => {
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Successfly Added Recommendation"
          );
        })
        .catch(() => {
          AppUtils.showNotificationFun(
            "Error",
            "Sorry",
            "Cant add Recommendation Now"
          );
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
    // addRecommendation({
    //   metric_id: metricId,
    //   name: data.name,
    //   description: data.desc,
    // });
    addRecommendation({
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
                placeholder="Recommendation name"
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
                placeholder="Recommendation description"
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

            <SubmitButton isLoading={loading} text="Add Recommendation" />
          </form>
        </Modal>
      </>
    </div>
  );
};

export default AddRecomendationModal;
