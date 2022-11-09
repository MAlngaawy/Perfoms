import React from "react";
import AppIcons from "~/@main/core/AppIcons/AppIcons";
import { Button, TextInput, MultiSelect, Modal } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cn from "classnames";
import { Controller } from "react-hook-form";
import Resizer from "react-image-file-resizer";

type Props = {};

const AddPlayer = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [playerImage, setPlayerImage] = React.useState<string | unknown>("");
  const [playerImagePreview, setPlayerImagePreview] = React.useState("null");
  const [data, setData] = React.useState({});
  const [teams, setTeams] = React.useState([]);
  const [sports, setSports] = React.useState([]);

  const schema = yup.object().shape({
    image: yup.mixed().required("File is required"),
    name: yup.string().required("Your child name is Required!"),
    dob: yup.date().required("Your child Birthday is Required!"),
    sport: yup.array().required("please select your child sport"),
    team: yup.array().required("please select your child team"),
    weight: yup.array().required("please add your child weight"),
    height: yup.array().required("please add your child height"),
    phoneNumber: yup.string().required("please enter your mobile number!"),
  });

  //   ========== Fetch user data ============

  // React.useEffect(() => {
  //     console.log("Fetch");

  //     const config = {
  //       headers: { Authorization: `Bearer ${user.access}` },
  //     };

  //     fetch("https://performs.pythonanywhere.com/core/teams/", config)
  //       .then((res) => res.json())
  //       .then((data) => setTeams(data.data))
  //       .catch((err) => console.log(err));

  //     fetch("https://performs.pythonanywhere.com/core/sports/", config)
  //       .then((res) => res.json())
  //       .then((data) => setSports(data.data))
  //       .catch((err) => console.log(err));
  //   }, [user.access]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => {
    console.log("Open");
    setOpen(true);
  };

  function formatDate(date: unknown) {
    if (typeof date === "string") {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }
  }

  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        100,
        100,
        "JPEG",
        100,
        0,
        (uri: any) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const onSubmit = (data: any) => {
    // const config = {
    //   headers: { Authorization: `Bearer ${user.access}` },
    // };

    const bodyParameters = {
      name: data.name,
      dob: formatDate(data.dob),
      sport: data.sport,
      team: data.team,
      weight: data.weight,
      height: data.height,
      phone: data.phoneNumber,
      icon: playerImage,
    };

    console.log(bodyParameters);
    console.log({
      name: data.name,
      dob: formatDate(data.dob),
      sport: data.sport,
      team: data.team,
      weight: data.weight,
      height: data.height,
      phone: data.phoneNumber,
      icon: playerImage,
    });
    setOpen(false);
    setPlayerImage(null);
    reset({
      image: "",
      name: "",
      dob: "",
      team: "",
      sport: "",
      weight: "",
      height: "",
      phoneNumber: "",
    });
  };

  // function to access file uploaded then convert to base64 then add it to the data state
  const uploadImage = async (e: any) => {
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      console.log(image);
      setPlayerImage(image);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="addPlayer cursor-pointer transform hover:scale-105 py-3 px-5 flex justify-between items-center bg-white rounded-full opacity-60 hover:opacity-100 h-full"
      >
        <span>
          <AppIcons icon="UserPlusIcon:outline" className="w-5" />
        </span>
        <h2 className="name pl-2 text-base text-perfGray2">Add Player</h2>
      </button>
      <Modal
        opened={open}
        withCloseButton
        onClose={() => setOpen(false)}
        transition="slide-up"
        transitionDuration={300}
        transitionTimingFunction="ease"
        shadow="xl"
        radius="xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl">
          {/* add img  */}
          <div className=" relative my-2 bg-gray-300 overflow-hidden hover:bg-gray-300 flex justify-center  items-center  mx-auto w-28  h-28 rounded-lg ">
            <Button
              {...register("image")}
              className="w-full h-full"
              component="label"
            >
              <img
                className={cn("", { hidden: playerImage })}
                src="/assets/images/Vector.png"
                alt="upload icon"
              />
              <img
                className={cn(
                  " absolute rounded-lg w-full -h-full max-w-full max-h-full object-cover left-0 top-0",
                  {
                    hidden: !playerImage,
                  }
                )}
                src={playerImagePreview && playerImagePreview}
                alt="upload icon"
              />
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e: any) => {
                  console.log(e.target.files[0]);
                  setPlayerImagePreview(URL.createObjectURL(e.target.files[0]));
                  uploadImage(e);
                }}
              />
            </Button>
            {errors.image && (
              <p className="text-red text-xs text-left">File is required!</p>
            )}
          </div>

          <div className="flex flex-col my-4 justify-center items-center gap-2">
            {/* Name and Date of birth */}

            <div className="flex gap-4">
              <div className="w-1/2">
                <TextInput
                  id="name"
                  label="Name"
                  {...register("name")}
                  sx={{
                    ".mantine-TextInput-input": {
                      background: "none",
                      border: 0,
                      borderBottom: "1px solid",
                      borderRadius: 0,
                    },
                  }}
                  error={errors.name && "Your child name is Required!"}
                />
              </div>
              <div className="w-1/2">
                <TextInput
                  id="dob"
                  label="Date of birth"
                  placeholder="yyyy-mm-dd"
                  {...register("dob")}
                  sx={{
                    ".mantine-TextInput-input": {
                      background: "none",
                      border: 0,
                      borderBottom: "1px solid",
                      borderRadius: 0,
                    },
                  }}
                  error={errors.dob && "Your child Birthday is Required!"}
                />
              </div>
            </div>
          </div>

          {/* Sport and team */}
          <div className="flex gap-4 w-full my-4">
            <div className="w-1/2">
              <Controller
                {...register("sport")}
                render={({ field }) => (
                  <MultiSelect
                    className="w-full"
                    sx={{
                      ".mantine-MultiSelect-input": {
                        background: "none",
                        border: 0,
                        borderBottom: "1px solid",
                        borderRadius: 0,
                      },
                    }}
                    data={["test"]}
                    label="Sport"
                    {...field}
                    error={errors.sport && "please select your child sport"}
                  />
                )}
                control={control}
              />
            </div>

            <div className="w-1/2">
              <Controller
                {...register("team")}
                render={({ field }) => (
                  <MultiSelect
                    className="w-full"
                    sx={{
                      ".mantine-MultiSelect-input": {
                        background: "none",
                        border: 0,
                        borderBottom: "1px solid",
                        borderRadius: 0,
                      },
                    }}
                    data={["test"]}
                    label="Team"
                    {...field}
                    error={errors.team && "please select your child team"}
                  />
                )}
                control={control}
              />
            </div>
          </div>

          {/* Weight & Height */}
          <div className="flex gap-4 my-4">
            <div className="w-1/2">
              <Controller
                {...register("weight")}
                render={({ field }) => (
                  <MultiSelect
                    className="w-full"
                    sx={{
                      ".mantine-MultiSelect-input": {
                        background: "none",
                        border: 0,
                        borderBottom: "1px solid",
                        borderRadius: 0,
                      },
                    }}
                    data={["test"]}
                    label="Weight"
                    {...field}
                    error={errors.weight && "please add your child weight"}
                  />
                )}
                control={control}
              />
            </div>
            <div className="w-1/2">
              <Controller
                {...register("height")}
                render={({ field }) => (
                  <MultiSelect
                    className="w-full"
                    sx={{
                      ".mantine-MultiSelect-input": {
                        background: "none",
                        border: 0,
                        borderBottom: "1px solid",
                        borderRadius: 0,
                      },
                    }}
                    data={["test"]}
                    label="Height"
                    {...field}
                    error={errors.height && "please add your child height"}
                  />
                )}
                control={control}
              />
            </div>
          </div>

          {/* Phone number  */}
          <div className="w-full my-4">
            <TextInput
              id="phoneNumber"
              label="phone number"
              {...register("phoneNumber")}
              sx={{
                ".mantine-TextInput-input": {
                  background: "none",
                  border: 0,
                  borderBottom: "1px solid",
                  borderRadius: 0,
                },
              }}
              error={errors.phoneNumber && "please enter your mobile number!"}
            />
          </div>

          <input
            className=" cursor-pointer w-full bg-perfBlue rounded-lg text-white text-xl py-2"
            type="submit"
          />
        </form>
      </Modal>
    </div>
  );
};

const ErrorP = ({ message }: { message: any }) => {
  return <p className="text-red-500 text-xs text-left"> {message} </p>;
};

export default AddPlayer;
