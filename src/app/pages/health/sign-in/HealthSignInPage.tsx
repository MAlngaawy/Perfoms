import { Image } from "@mantine/core";

import AddPlayer from "../../home/molecules/AddPlayer";

import TimeFilter from "~/@main/components/TimeFilter";
import TeamFilter from "~/@main/components/TeamFilter";
import { useGetUrlGoogleMutation } from "~/app/store/health/healthApi";
import { Link } from "react-router-dom";
import { useEffect } from "react";


const HealthSignInPage = () => {
  const [LoginUrlGoogle, {data,isSuccess, isLoading }] = useGetUrlGoogleMutation()
useEffect(() => {
 if(isSuccess)window.location.assign(data?.url)
}, [isSuccess])

  return (
    <div className="health-signIn-page px-5 mb-20">
      <div className="my-4 flex xs:flex-row gap-2 justify-between items-center">
        <div className="flex gap-3 items-center">
          <AddPlayer />
        </div>
        <div className="flex gap-1 justify-center items-center md:pt-0">
          <TeamFilter />
          <TimeFilter />
        </div>
      </div>
      <div className="p-6 h-full min-h-screen gap-y-14 flex justify-center flex-col  items-center bg-white rounded-3xl w-full">
        <div className="relative  max-w-[331px] w-full  ">  <Image
          width={'100%'}
          height={331}
          fit="contain"
          src="/assets/images/HealthStatus.png"
          alt="HealthStatus"
        /></div>
        <div className="flex justify-between flex-col gap-y-3  items-center">
          <h2 className="title font-medium text-lg text-black">Health Status</h2>
          <p className="text-[#8B8D97] text-sm ">please, Integrate with any Health App to continue</p>
         
            <button
            onClick={LoginUrlGoogle}
            disabled={isLoading}
              className="text-base  flex gap-5 border-slate-200  text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 font-medium py-3 px-5 max-w-[350px] w-full max-h-[48px] h-full border  rounded-[10px]  flex-row justify-center items-center"
            >
              <Image
                width={24}
                height={24}
                src="/assets/images/google.png"
                alt="Google"
              /> Google
            </button>
        </div>
      </div>
    </div>
  );

};

export default HealthSignInPage;
