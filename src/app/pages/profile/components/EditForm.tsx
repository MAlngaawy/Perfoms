import { useForm } from "react-hook-form";
import { Input } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { useUpdateProfileMutation } from "~/app/store/user/userApi";
import { User } from "~/app/store/types/user-types";
import { useEffect, useRef, useState } from "react";
import { showNotification } from "@mantine/notifications";
import SubmitButton from "~/@main/components/SubmitButton";

type Props = {
  user: User;
  setOpened: any;
};

const EditForm = ({ user, setOpened }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userAvatar, setUserAvatar] = useState<File>();
  const [updateProfile, { isSuccess, isError, error, isLoading }] =
    useUpdateProfileMutation();
  const { register, handleSubmit, control } = useForm({
    defaultValues: { ...user, avatar: undefined },
  });

  const onSubmit = (data: any) => {
    updateProfile(data);
  };

  useEffect(() => {
    if (isSuccess) setOpened(false);
    if (isError)
      //@ts-ignore
      showNotification({ title: "Update Error", message: error?.data.message });
  }, [isSuccess, isError]);

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative photo place-self-center w-28 h-28">
        <img
          className="object-cover w-full h-full rounded-lg"
          src={
            (userAvatar && URL.createObjectURL(userAvatar)) ||
            user.avatar ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
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
        />
      </div>
      {/* Image Upload Input */}
      <Input.Wrapper id="firstName" label="First name" className="w-full">
        <Input id="firstName" {...register("first_name")} />
      </Input.Wrapper>
      <Input.Wrapper id="lastName" label="Last name" className="w-full">
        <Input id="lastName" {...register("last_name")} />
      </Input.Wrapper>
      <Input.Wrapper id="job" label="Your job">
        <Input
          {...register("job")}
          id="job"
          icon={
            <AppIcons
              className="w-3 h-3 text-perfGray3"
              icon="BriefcaseIcon:outline"
            />
          }
        />
      </Input.Wrapper>

      <Input.Wrapper id="dob" label="Your date of birth">
        <Input
          sx={{
            ".mantine-Input-input": {
              flexDirection: "row-reverse",
            },
          }}
          type="date"
          {...register("dob")}
          id="dob"
          placeholder="mm/dd/yyyy"
        />
      </Input.Wrapper>

      <SubmitButton isLoading={isLoading} text="Save" />
    </form>
  );
};

export default EditForm;
