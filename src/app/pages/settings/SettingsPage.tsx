import ChangePass from "./Components/ChangePass";
import { useState } from "react";
import { Input } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";

type Props = {};

const Settings = (props: Props) => {
  const [change, setChange] = useState<"Password" | "Mobile" | null>(null);

  return (
    <div className="relative flex justify-center items-center py-20 md:pt-14">
      {change && (
        <div
          onClick={() => setChange(null)}
          className="absolute cursor-pointer flex gap-2 text-perfGray3 text-sm top-4 left-4 pointer transform hover:scale-110"
        >
          <AppIcons
            className="w-4 h-4 text-perfGray3"
            icon="ArrowLeftIcon:outline"
          />
          <span>Back</span>
        </div>
      )}

      {change === null && (
        <>
          <div className="content flex flex-col justify-center items-center gap-4 bg-white rounded-3xl p-6 w-11/12 sm:w-96">
            <h2>Settings</h2>
            <Input.Wrapper className="w-full" label="Phobe Number">
              <Input placeholder="+2011111111" disabled />
            </Input.Wrapper>
            <Input.Wrapper className="w-full" label="Password">
              <Input placeholder="**********" disabled />
            </Input.Wrapper>
            <button
              onClick={() => setChange("Password")}
              className="border border-perfBlue w-full py-2 mt-6 rounded-lg text-perfBlue hover:bg-perfBlue hover:text-white"
            >
              Edit Password
            </button>
            <button
              onClick={() => setChange("Mobile")}
              className="border border-perfBlue w-full py-2 rounded-lg text-perfBlue hover:bg-perfBlue hover:text-white"
            >
              Edit Phone Number
            </button>
          </div>
        </>
      )}
      {change === "Password" && <ChangePass setChange={setChange} />}
      {change === "Mobile" && <h2>Change Mobile</h2>}
    </div>
  );
};

export default Settings;
