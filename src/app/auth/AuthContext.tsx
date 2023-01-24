import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import AppSplashScreen from "~/@main/core/AppSplashScreen";
import { useUserQuery } from "~/app/store/user/userApi";
import { eventInstance } from "~/@main/utils/AppUtils";
import { dataServerToken } from "../configs/dataService";

const AuthContext = createContext({});

function AuthProvider({ children }: PropsWithChildren) {
  const { data, isLoading, isError, isSuccess, error, isFetching, refetch } =
    useUserQuery(null);

  useEffect(() => {
    eventInstance.on("Login_Success", () => refetch());
    eventInstance.on("SignUp_Success", () => refetch());

    /************************************************************ */
    /* This if condition I have made to refresh the page after login
     to make the dataservice.ts file to access token after it changes */
    if (data) {
      if (!dataServerToken) {
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
