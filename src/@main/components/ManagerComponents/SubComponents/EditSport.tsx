import { useState, ReactNode } from "react";
import { Modal, Group, Input } from "@mantine/core";
import AppIcons from "../../../core/AppIcons";
import { useForm } from "react-hook-form";
import SubmitButton from "../../SubmitButton";
import { Sport } from "~/app/store/types/parent-types";
import { axiosInstance } from "~/app/configs/dataService";
import AppUtils from "~/@main/utils/AppUtils";
import { useUserQuery } from "~/app/store/user/userApi";
import AvatarInput from "~/@main/components/shared/AvatarInput";
import {
  useAdminClubQuery,
  useAdminSportsQuery,
} from "~/app/store/clubManager/clubManagerApi";

type Props = {
  sportData: Partial<Sport>;
};

const EditSport = ({ sportData }: Props) => {
  const [opened, setOpened] = useState(false);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const { data: adminClub } = useAdminClubQuery({});
  const { data: user } = useUserQuery({});
  const { refetch } = useAdminSportsQuery(
    { club_id: user?.club },
    { skip: !user?.club }
  );
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Submit Form Function
  const onSubmitFunction = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    // if there is no image added .. remove epty icon
    if (!userAvatar) formData.delete("icon");

    if (adminClub?.id) {
      formData.append("club", JSON.stringify(adminClub?.id));
    }
    if (userAvatar) {
      const image = await AppUtils.resizeImage(userAvatar);
      formData.append("icon", image as string);
    }
    axiosInstance
      .patch(`/club-manager/sports/${sportData.id}/update/`, formData)
      .then(() => {
        AppUtils.showNotificationFun(
          "Success",
          "Done",
          "Successfully edited sport"
        );
        setOpened(false);
        setLoading(false);
        refetch();
      })
      .catch((err) => {
        console.log(err);
        AppUtils.showNotificationFun("Error", "Sorry", "Can't edit sport now");
        setLoading(false);
      });
  };

  return (
    <div>
      <>
        <Modal
          opened={opened}
          onClose={() => {
            setUserAvatar(null);
            setOpened(false);
          }}
          title={`Edit (${sportData.name}) Sport `}
        >
          <form className="flex flex-col gap-4" onSubmit={onSubmitFunction}>
            <AvatarInput
              userAvatar={userAvatar}
              setUserAvatar={setUserAvatar}
              inputAlt="Sport Icon"
              currentImage={sportData.icon_url}
            />

            <Input.Wrapper
              id="name"
              withAsterisk
              // label="Name"
              error={errors.name && (errors.name.message as ReactNode)}
            >
              <Input
                placeholder="Name"
                defaultValue={sportData.name}
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
            <SubmitButton isLoading={loading} text="Edit Sport" />
          </form>
        </Modal>

        <Group position="center">
          <button
            className="transform hover:scale-150"
            onClick={() => setOpened(true)}
          >
            <AppIcons
              className="w-4 h-4 text-perfGray3"
              icon="PencilSquareIcon:outline"
            />
          </button>
        </Group>
      </>
    </div>
  );
};

export default EditSport;
