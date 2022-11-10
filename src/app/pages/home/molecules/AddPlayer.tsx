import React from 'react'
import AppIcons from '@main/core/AppIcons/AppIcons'
import { Dialog , Button , TextInput , Select } from '@mantine/core';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cn from "classnames";
// import Resizer from "react-image-file-resizer";

type Props = {}

const AddPlayer = (props: Props) => {
    const [open, setOpen] = React.useState(false);
    const [playerImage, setPlayerImage] = React.useState('');
    const [playerImagePreview, setPlayerImagePreview] = React.useState('null');

    const schema = yup.object().shape({
        image: yup.mixed().required("File is required"),
        name: yup.string().required("Your child name is Required!"),
        dob: yup
        .date()
        .required("Your child Birthday is Required!"),
        sport: yup.number().required("please select your child sport"),
        team: yup.number().required("please select your child team"),
        weight: yup.number().required("please add your child weight"),
        height: yup.number().required("please add your child height"),
        phoneNumber: yup.string(),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleClickOpen = () => {
        console.log("Open");
        setOpen(true);
        };

        function formatDate(date:string | number) {
            var d = new Date(date),
              month = "" + (d.getMonth() + 1),
              day = "" + d.getDate(),
              year = d.getFullYear();
        
            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;
        
            return [year, month, day].join("-");
          }


        const onSubmit = (data:any,e:any):void => {
            e.preventDefault()
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

        console.log(bodyParameters)
        }
    

    // const resizeFile = (file:any) =>
    // new Promise((resolve) => {
    // Resizer.imageFileResizer(
    //     file,
    //     100,
    //     100,
    //     "JPEG",
    //     100,
    //     0,
    //     (uri:any) => {
    //     resolve(uri);
    //     },
    //     "base64"
    // );
    // });

        // function to access file uploaded then convert to base64 then add it to the data state
const uploadImage = async (e:any) => {
    try {
    const file = e.target.files[0];
    const image = await file /*resizeFile(file)*/;
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
                <AppIcons icon='UserPlusIcon:outline' className='w-5' />
                </span>
                <h2 className="name pl-2 text-base text-perfGray2">Add Player</h2>
            </button>
            <Dialog
                opened={open}
                withCloseButton
                onClose={() => setOpen(false)}
                transition="slide-up" 
                transitionDuration={300} 
                transitionTimingFunction="ease"
                shadow="xl"                
                radius="xl"
                size={400}
                position={{ top: '10%' , left: '35%' }}
                className='add-player-dialog '
            >
                <form onSubmit={onSubmit} className="rounded-3xl" >
                    {/* add img  */}
                    <div className=" relative my-2 bg-gray-300 overflow-hidden hover:bg-gray-300 flex justify-center  items-center  mx-auto w-28  h-28 rounded-lg " >
                    <Button className="w-full h-full" component="label">
                        <img
                        className={cn("", { hidden: playerImage })}
                        src="/assets/images/Vector.png"
                        alt="upload icon"
                        />
                        <img
                        className={cn(
                            " absolute  rounded-lg w-full -h-full max-w-full max-h-full object-cover left-0 top-0",
                            {
                            hidden: !playerImage,
                            }
                        )}
                        src={playerImagePreview && playerImagePreview}
                        alt="upload icon"
                        />
                        <input
                        {...register("image")}
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={(e:any) => {
                            console.log(e.target.files[0]);
                            setPlayerImagePreview(
                            URL.createObjectURL(e.target.files[0])
                            );
                            uploadImage(e);
                        }}
                        />
                    </Button>
                    <ErrorP message={errors.image?.message} />
                    </div>

                    <div className="flex flex-col pb-4 justify-center items-center gap-2">
                        {/* Name and Date of birth */}

                            <div className="flex gap-4">
                                <div className="w-1/2">
                                <TextInput
                                    id="name"
                                    label="Name"
                                    {...register("name")}
                                    
                                />
                                <ErrorP message={errors.name?.message} />
                                </div>
                                <div className="w-1/2">
                                <TextInput
                                    id="dob"
                                    label="Date of birth"
                                    placeholder="yyyy-mm-dd"
                                    {...register("dob")}
                                />
                                <ErrorP message={errors.dob?.message} />
                                </div>
                            </div>
                        </div>

                        {/* Sport and team */}
                        <div className="flex gap-4 w-full">
                            <div className="w-1/2">
                                <Select
                                    label="Sport"
                                    placeholder=""
                                    data={[
                                        { value: 'Test', label: 'Test' },
                                    ]}
                                    />
                                <ErrorP message={errors.sport?.message} />
                                </div>

                                <div className="w-1/2">
                                <Select
                                    label="Team"
                                    data={[
                                        { value: 'Test', label: 'Test' },
                                    ]}
                                    />
                                <ErrorP message={errors.team?.message} />
                            </div>
                        </div>

                        {/* Weight & Height */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <Select
                                        label="Weight"
                                        data={[
                                            { value: 'Test', label: 'Test' },
                                        ]}
                                    />
                            <ErrorP message={errors.weight?.message} />
                            </div>
                            <div className="w-1/2">
                                <Select
                                        label="Height"
                                        data={[
                                            { value: 'Test', label: 'Test' },
                                        ]}
                                    />
                            <ErrorP message={errors.height?.message} />
                            </div>
                        </div>

                        {/* Phone number  */}
                        <div className="w-full pb-4">
                            <TextInput
                            id="phoneNumber"
                            label="phone number"
                            {...register("phoneNumber")}
                            />
                            <ErrorP message={errors.phoneNumber?.message} />
                        </div>
                        
                        <input
                            className=" cursor-pointer w-full bg-perfBlue rounded-lg text-white text-xl py-2"
                            type="submit"
                            />
                </form>
            </Dialog>
        </div>
    )
}

const ErrorP = ({ message }:{message:any}) => {
    return <p className="text-red-500 text-xs text-left"> {message} </p>;
    };

export default AddPlayer