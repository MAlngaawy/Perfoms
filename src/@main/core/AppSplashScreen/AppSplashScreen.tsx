import { memo } from "react";
import { Loader } from "@mantine/core";

function AppSplashScreen() {
  return (
    <div id="fuse-splash-screen" className="w-full h-screen grid">
      <div className="place-self-center flex flex-col items-center content-center">
        <div className="logo">
          <img width="128" src="assets/images/logo/logo.png" alt="logo" />
        </div>
        <Loader variant="bars" />
      </div>
    </div>
  );
}

export default memo(AppSplashScreen);
