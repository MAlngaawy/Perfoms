import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import AppSplashScreen from "~/@main/core/AppSplashScreen";
import { useUserQuery } from "~/app/store/user/userApi";
import { showNotification } from "@mantine/notifications";
import { eventInstance } from "~/@main/utils/AppUtils";

const AuthContext = createContext({});

function AuthProvider({ children }: PropsWithChildren) {
  const { isLoading, isError, isSuccess, error, refetch } = useUserQuery(null);

  useEffect(() => {
    eventInstance.on("Login_Success", () => refetch());
  }, [refetch]);

  useEffect(() => {
    if (isError)
      showNotification({
        title: "Auth notification",
        //@ts-ignore
        message: `${error.data.detail} 🤥`,
        color: "red",
      });
  }, [isError, error]);

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
