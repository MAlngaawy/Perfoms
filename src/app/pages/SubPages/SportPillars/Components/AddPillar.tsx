import { useState, ReactNode } from "react";
import { Modal, Button, Group, Input } from "@mantine/core";
import AppIcons from "../../../../../@main/core/AppIcons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Resizer from "react-image-file-resizer";
import cn from "classnames";
import SubmitButton from "../../../../../@main/components/SubmitButton";
import { axiosInstance } from "../../../../configs/dataService";
import { useGeneralPillarsQuery, useUserQuery } from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";
import { useAdminPillarsQuery } from "~/app/store/clubManager/clubManagerApi";
import { useSuperPillarsQuery } from "~/app/store/supervisor/supervisorMainApi";
import { showNotification } from "@mantine/notifications";
import AppUtils from "~/@main/utils/AppUtils";
import AvatarInput from "~/@main/components/shared/AvatarInput";

type Props = {};

const AddPillar = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);
  const { data: user } = useUserQuery({});
  const { sport_id } = useParams();
  const { refetch: refetchAdminPillars } = useAdminPillarsQuery(
    { sport_id: sport_id },
    { skip: !sport_id }
  );
  const { refetch: refetchSuperPillars } = useSuperPillarsQuery(
    { sport_id: sport_id },
    { skip: !sport_id }
  );

  const { refetch: RefetchGeneralPillars } = useGeneralPillarsQuery({});

  const resetFields = () => {
    reset({
      image: "",
      name: "",
    });
  };

  const { reset } = useForm({});

  const addPillarFun = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (userAvatar) {
      const image = await AppUtils.resizeImage(userAvatar);
      formData.append("icon", image as string);
    }
    if (sport_id) formData.append("sport", sport_id);
    setError(false);
    try {
      setIsLoading(true);
      axiosInstance
        .post(
          user?.user_type === "Supervisor"
            ? "supervisor/sports/add-pillar/"
            : "club-manager/sports/add-pillar/",
          formData
        )
        .then((res) => {
          setIsLoading(false);
          setOpened(false);
          if (user?.user_type === "Supervisor") {
            refetchSuperPillars();
          } else {
            refetchAdminPillars();
          }
          AppUtils.showNotificationFun(
            "Success",
            "Done",
            "Pillar Added Successfully"
          );
          RefetchGeneralPillars();
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
          title={`Add Pillar`}
        >
          <form
            className="flex flex-col gap-4"
            // onSubmit={handleSubmit(onSubmitFunction)}
            onSubmit={addPillarFun}
          >
            <AvatarInput
              userAvatar={userAvatar}
              inputAlt="Pillar Icon"
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
            <SubmitButton isLoading={isLoading} text="Add Pillar" />
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
              Add Pillar
            </span>
          </div>
        </Group>
      </>
    </div>
  );
};

export default AddPillar;
