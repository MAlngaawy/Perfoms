import { useEffect, useRef, useState } from "react";
import AppIcons from "~/@main/core/AppIcons/AppIcons";
import { Modal, TextInput, Alert, Avatar, Select } from "@mantine/core";
import SubmitButton from "~/@main/components/SubmitButton";
import { axiosInstance } from "../../../configs/dataService";
import { useMyPlayersQuery } from "~/app/store/parent/parentApi";
import { DatePicker } from "@mantine/dates";
import AppUtils from "~/@main/utils/AppUtils";
import { CoachPlayerInfo } from "~/app/store/types/coach-types";
import { useUserQuery } from "~/app/store/user/userApi";
import AvatarInput from "~/@main/components/shared/AvatarInput";

type Props = {
  player: CoachPlayerInfo | undefined;
  refetchPlayerData: any;
};

const EditPlayer = ({ player, refetchPlayerData }: Props) => {
  console.log("player?.icon", player?.icon);
  console.log("player?.icon_url", player?.icon_url);

  const { refetch } = useMyPlayersQuery({});
  const { data: user } = useUserQuery({});
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [noImage, setNoImage] = useState<boolean>(true);

  const deleteImage = () => {
    setNoImage(true);
    setUserAvatar(null);
  };

  useEffect(() => {
    console.log("Efffect Player");

    if (player?.icon) {
      setNoImage(false);
    }
  }, [player]);

  useEffect(() => {
    console.log("Efffect userAvatar");

    if (userAvatar) {
      setNoImage(false);
    }
  }, [userAvatar]);

  const onSubmitFun = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (userAvatar) {
      const image = await AppUtils.resizeImage(userAvatar);
      formData.append("icon", image as string);
    }
    if (noImage) {
      formData.append("icon", "");
    }
    setError(false);
    const REQUEST_URL =
      user?.user_type === "Parent"
        ? `parent/update-player/${player?.id}/`
        : `club-manager/update-player/${player?.id}/`;

    try {
      setIsLoading(true);
      axiosInstance
        .patch(REQUEST_URL, formData)
        .then((res) => {
          setIsLoading(false);
          if (user?.user_type === "Parent") {
            refetch();
          }
          refetchPlayerData();
          setOpen(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
          setError(true);
        });
    } catch (err) {}
  };

  return (
    <div>
      <div
        onClick={() => {
          setOpen(true);
        }}
      >
        <AppIcons
          icon="PencilSquareIcon:outline"
          className="w-5 cursor-pointer active:scale-110"
        />
      </div>
      <Modal
        opened={open}
        withCloseButton
        onClose={() => setOpen(false)}
        transition="slide-up"
        transitionDuration={300}
        transitionTimingFunction="ease"
        shadow="xl"
        radius="xl"
        title={`Edit Player`}
      >
        <form onSubmit={onSubmitFun} className="rounded-3xl">
          {error && (
            <Alert title="Wrong Data" color="red">
              Something went wrong
            </Alert>
          )}
          <AvatarInput
            currentImage={noImage ? "" : player?.icon}
            userAvatar={userAvatar}
            setUserAvatar={setUserAvatar}
            inputAlt="Player Photo"
          />
          {noImage === false && (
            <p
              onClick={() => deleteImage()}
              className="text-blue-500 text-xs my-2 cursor-pointer w-full text-center"
            >
              Delete Player photo
            </p>
          )}

          <div className="flex flex-col my-4 justify-center items-center gap-2">
            {/* Name and Date of birth */}

            <div className="flex gap-4 w-full">
              <div className="w-1/2">
                <TextInput
                  id="name"
                  name="name"
                  label="Name"
                  withAsterisk
                  defaultValue={player?.name}
                  sx={{
                    ".mantine-TextInput-input": {
                      background: "none",
                      border: 0,
                      borderBottom: "1px solid",
                      borderRadius: 0,
                      width: "100%",
                    },
                  }}
                />
              </div>
              <div className="w-1/2">
                <DatePicker
                  label="Date of birth"
                  name="dob"
                  inputFormat="YYYY-MM-DD"
                  maxDate={new Date()}
                  //@ts-ignore
                  defaultValue={player?.dob && new Date(player?.dob)}
                  sx={{
                    ".mantine-DatePicker-input": {
                      background: "none",
                      border: 0,
                      borderBottom: "1px solid",
                      borderRadius: 0,
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Weight & Height */}
          <div className="flex gap-4 my-4">
            <div className="w-1/2">
              <TextInput
                id="weight"
                label="Weight"
                name="weight"
                defaultValue={player?.weight}
                sx={{
                  ".mantine-TextInput-input": {
                    background: "none",
                    border: 0,
                    borderBottom: "1px solid",
                    borderRadius: 0,
                  },
                }}
              />
            </div>
            <div className="w-1/2">
              <TextInput
                id="height"
                label="Height"
                name="height"
                defaultValue={player?.height}
                sx={{
                  ".mantine-TextInput-input": {
                    background: "none",
                    border: 0,
                    borderBottom: "1px solid",
                    borderRadius: 0,
                  },
                }}
              />
            </div>
          </div>

          <Select
            id="front_leg"
            required
            className="w-full"
            label="Front Leg"
            name="front_leg"
            defaultValue={player?.front_leg}
            sx={{
              ".mantine-Select-input": {
                background: "none",
                border: 0,
                borderBottom: "1px solid",
                borderRadius: 0,
                width: "100%",
              },
            }}
            data={[
              { value: "LEFT", label: "Left" },
              { value: "RIGHT", label: "Right" },
              { value: "BOTH", label: "Both" },
            ]}
          />

          {/* Phone number  */}
          <div className="w-full my-4">
            <TextInput
              id="phoneNumber"
              label="phone number"
              name="phone"
              defaultValue={player?.phone}
              sx={{
                ".mantine-TextInput-input": {
                  background: "none",
                  border: 0,
                  borderBottom: "1px solid",
                  borderRadius: 0,
                },
              }}
            />
          </div>

          <SubmitButton
            isLoading={isLoading}
            text={player ? "Update Player" : "Add Player"}
          />
        </form>
      </Modal>
    </div>
  );
};

export default EditPlayer;
