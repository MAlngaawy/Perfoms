import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import AppSplashScreen from "~/@main/core/AppSplashScreen";
import { useUserQuery } from "~/app/store/user/userApi";
import { eventInstance } from "~/@main/utils/AppUtils";
import { dataServerToken } from "../configs/dataService";
import Cookies from "js-cookie";

const AuthContext = createContext({});

function AuthProvider({ children }: PropsWithChildren) {
  const { data, isLoading, isError, isSuccess, error, isFetching, refetch } =
    useUserQuery(null);

  console.log("test dataServerToken", dataServerToken);
  console.log("test cookies", Cookies.get("token"));
  console.log("test Equal", dataServerToken === Cookies.get("token"));

  useEffect(() => {
    eventInstance.on("Login_Success", () => refetch());
    eventInstance.on("SignUp_Success", () => refetch());

    /************************************************************ */
    /* This if condition I have made to refresh the page after login
     to make the dataservice.ts file to access token after it changes */

    /**SomeTimes the  dataServerToken become null and sometimes it become an old token*/
    if (data) {
      if (dataServerToken !== Cookies.get("token")) {
        location.reload();
      }
    } else {
      console.log("no data");
    }
    /************************************************************ */
  }, [refetch, data]);

  return isLoading ? (
    <AppSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated: isSuccess }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
