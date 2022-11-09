import AppAuthorization from "~/@main/core/AppAuthorization";
import AppLayout from "~/@main/core/AppLayout";
import BrowserRouter from "~/@main/core/BrowserRouter";
import { AuthProvider } from "./auth/AuthContext";
import settingsConfig from "./configs/settingsConfig";
import { useUserQuery } from "./store/user/userApi";
import withAppProviders from "./withAppProviders";

function App() {
  const { data: user } = useUserQuery(null);
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppAuthorization
          userRole={user?.data?.user_type ? [user?.data?.user_type] : []}
          loginRedirectUrl={settingsConfig.loginRedirectUrl}
        >
          <AppLayout />
        </AppAuthorization>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default withAppProviders(App)();
