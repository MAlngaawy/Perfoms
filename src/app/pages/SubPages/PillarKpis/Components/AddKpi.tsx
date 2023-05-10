import { useState } from "react";
import { Modal, Group, Input } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { useForm } from "react-hook-form";
import SubmitButton from "~/@main/components/SubmitButton";
import { axiosInstance } from "../../../../configs/dataService";
import { useGeneralKpisQuery, useUserQuery } from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";
import { useAdminKpisQuery } from "~/app/store/clubManager/clubManagerApi";
import { useSuperKpisQuery } from "~/app/store/supervisor/supervisorMainApi";
import AppUtils from "~/@main/utils/AppUtils";
import AvatarInput from "~/@main/components/shared/AvatarInput";

type Props = {};

const AddKpi = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const { data: user } = useUserQuery({});
  const { pillar_id } = useParams();

  const { refetch: refetchGeneralKpis } = useGeneralKpisQuery({});

  const { refetch: superRefetchKpis } = useSuperKpisQuery(
    {
      pillar_id,
    },
    {
      skip: !pillar_id,
    }
  );
  const { refetch: adminRefetchKpis } = useAdminKpisQuery(
    {
      pillar_id,
    },
    {
      skip: !pillar_id,
    }
  );

  const resetFields = () => {
    reset({
      image: "",
      name: "",
    });
  };

  const { reset } = useForm({});
  const addKpiFun = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (userAvatar) {
      const image = await AppUtils.resizeImage(userAvatar);
      formData.append("icon", image as string);
    }
    setError(false);
    try {
      setIsLoading(true);
      axiosInstance
        .post(
          user?.user_type === "Supervisor"
            ? `supervisor/${pillar_id}/kpis/add-kpi/`
            : `club-manager/sports/${pillar_id}/add-kpi/`,
          formData
        )
        .then((res) => {
          setIsLoading(false);
          setOpened(false);
          setUserAvatar(null);
          if (user?.user_type === "Supervisor") {
            superRefetchKpis();
          } else {
            adminRefetchKpis();
          }
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Kpi Added Successfully"
          );
          refetchGeneralKpis();
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.response.data.message);
          AppUtils.showNotificationFun("Error", "Sorry", "Try again later");
        });
    } catch (err) {}
  };

  return (
    <div>
      <>
        <Modal
          opened={opened}
          onClose={() => {
            resetFields();
            setUserAvatar(null);
            setOpened(false);
          }}
          title={`Add Kpi`}
        >
          <form className="flex flex-col gap-4" onSubmit={addKpiFun}>
            {/* Image Upload */}
            <AvatarInput
              userAvatar={userAvatar}
              setUserAvatar={setUserAvatar}
            />

            <Input.Wrapper
              id="name"
              withAsterisk
              // label="Name"
              error={error}
            >
              <Input
                placeholder="Name"
                name="name"
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
                // {...register("name")}
                id="name"
              />
            </Input.Wrapper>

            <Input.Wrapper
              id="description"
              withAsterisk
              // label="Name"
              error={error}
            >
              <Input
                placeholder="Description"
                name="description"
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
                id="description"
              />
            </Input.Wrapper>

            <SubmitButton isLoading={isLoading} text="Add Kpi" />
          </form>
        </Modal>

        <Group position="center" className="h-full">
          <div
            onClick={() => setOpened(true)}
            className="h-full group hover:bg-white cursor-pointer  relative w-full bg-slate-300 p-12 rounded-xl flex flex-col justify-center items-center gap-4"
          >
            <AppIcons
              className="text-perfGray2 w-16 h-16 group-hover:text-perfBlue"
              icon="PlusIcon:outline"
            />
            <span className="text-perfGray2 text-xl group-hover:text-perfBlue">
              Add Kpi
            </span>
          </div>
        </Group>
      </>
    </div>
  );
};

export default AddKpi;
