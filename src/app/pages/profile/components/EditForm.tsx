import { useForm } from "react-hook-form";
import { Avatar, Input } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { useUpdateProfileMutation } from "~/app/store/user/userApi";
import { User } from "~/app/store/types/user-types";
import { useEffect, useRef, useState } from "react";
import { showNotification } from "@mantine/notifications";
import SubmitButton from "~/@main/components/SubmitButton";
import { axiosInstance } from "~/app/configs/dataService";
import { useUserQuery } from "~/app/store/user/userApi";

type Props = {
  user: User;
  setOpened: any;
  refetch: any;
};

const EditForm = ({ user, setOpened, refetch }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userAvatar, setUserAvatar] = useState<File>();
  const [isError, setIsErrror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // const [updateProfile, { isSuccess, isError, error, isLoading }] =
  //   useUpdateProfileMutation();
  // const { refetch } = useUserQuery();

  const { register, handleSubmit, control } = useForm({
    defaultValues: { ...user, avatar: undefined },
  });

  const onSubmitFn = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (userAvatar) formData.append("avatar", userAvatar);
    setIsLoading(true);
    try {
      axiosInstance
        .patch("user-generals/update-profile/", formData)
        .then((res) => {
          setIsLoading(false);
          setOpened(false);
          console.log(res);
          refetch();
        });
    } catch (err) {
      setIsErrror(true);
    }

    // updateProfile(data);
  };

  useEffect(() => {
    if (isSuccess) setOpened(false);
    if (isError)
      //@ts-ignore
      showNotification({ title: "Update Error", message: error?.data.message });
  }, [isSuccess, isError]);

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmitFn}>
      <div className="relative photo place-self-center w-28 h-28">
        <Avatar
          className="object-cover w-full h-full rounded-lg"
          src={(userAvatar && URL.createObjectURL(userAvatar)) || user.avatar}
          alt="user-avatar"
        />
        <div
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <AppIcons
            className="w-5 h-5 absolute top-2 cursor-pointer right-2 text-perfGray3 hover:text-perfGray1"
            icon="PencilSquareIcon:outline"
          />
        </div>
        <input
          ref={fileInputRef}
          onChange={(e) => setUserAvatar(e?.currentTarget?.files?.[0] as File)}
          type="file"
          className="hidden"
          id={"avatar"}
        />
      </div>

      {/* Image Upload Input */}
      <Input.Wrapper id="firstName" label="First name" className="w-full">
        <Input id="firstName" {...register("first_name")} />
      </Input.Wrapper>
      <Input.Wrapper id="lastName" label="Last name" className="w-full">
        <Input id="lastName" {...register("last_name")} />
      </Input.Wrapper>

      <SubmitButton isLoading={isLoading} text="Save" />
    </form>
  );
};

export default EditForm;
