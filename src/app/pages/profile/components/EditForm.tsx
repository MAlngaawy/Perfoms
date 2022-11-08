import { useForm, Controller } from "react-hook-form";
import { FileInput, Input } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
type Props = {};

const EditForm = (props: Props) => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
      {/* Image Upload Input */}
      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <FileInput
            icon={
              <AppIcons className="w-3 h-3" icon="ArrowUpTrayIcon:outline" />
            }
            label="Change Profile Image"
            placeholder="Click To Upload"
            accept="image/png,image/jpeg"
            {...field}
          />
        )}
      />
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
        />
      </Input.Wrapper>

      <button
        type="submit"
        className=" w-full bg-perfBlue text-white font-medium py-3 mt-4 rounded-lg"
      >
        Save
      </button>
    </form>
  );
};

export default EditForm;
