import { useState, ReactNode } from "react";
import { Modal, Group, Input } from "@mantine/core";
import AppIcons from "../../../core/AppIcons";
import { useForm } from "react-hook-form";
import SubmitButton from "../../SubmitButton";
import { axiosInstance } from "~/app/configs/dataService";
import {
  useAdminClubQuery,
  useAdminSportsQuery,
} from "~/app/store/clubManager/clubManagerApi";
import AppUtils from "~/@main/utils/AppUtils";
import { useGeneralSportsQuery, useUserQuery } from "~/app/store/user/userApi";
import AvatarInput from "~/@main/components/shared/AvatarInput";

type Props = {};

const AddSport = (props: Props) => {
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [opened, setOpened] = useState(false);
  const { data: adminClub } = useAdminClubQuery({});
  const { data: user } = useUserQuery({});
  const { refetch } = useAdminSportsQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { refetch: refetchGeneralSports } = useGeneralSportsQuery({});

  const {
    register,
    formState: { errors },
    reset,
  } = useForm({});

  // Submit Form Function
  const onSubmitFunction = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (adminClub?.id) {
      formData.append("club", JSON.stringify(adminClub?.id));
    }

    if (userAvatar) {
      const image = await AppUtils.resizeImage(userAvatar);
      formData.append("icon", image as string);
    }

    axiosInstance
      .post("/club-manager/add-sport/", formData)
      .then(() => {
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Successfully added sport"
        );
        setOpened(false);
        setLoading(false);
        setUserAvatar(null);
        refetch();
        refetchGeneralSports();
      })
      .catch((err) => {
        AppUtils.showNotificationFun("Error", "Sorry", "Can't add sport now");
        setUserAvatar(null);
        setLoading(false);
      });
  };

  return (
    <div>
      <>
        <Modal
          opened={opened}
          onClose={() => {
            setOpened(false);
            reset({ name: "" });
            setUserAvatar(null);
          }}
          title={`Add Sport `}
        >
          <form className="flex flex-col gap-4" onSubmit={onSubmitFunction}>
            {/* Image Upload */}
            <AvatarInput
              userAvatar={userAvatar}
              setUserAvatar={setUserAvatar}
              inputAlt="Sport Icon"
            />

            <Input.Wrapper
              id="name"
              withAsterisk
              // label="Name"
              error={errors.name && (errors.name.message as ReactNode)}
            >
              <Input
                placeholder="Name"
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
            <SubmitButton isLoading={loading} text="Add Sport" />
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
              Add Sport
            </span>
          </div>
        </Group>
      </>
    </div>
  );
};

export default AddSport;
