import AppAuthorization from "@main/core/AppAuthorization";
import AppLayout from "@main/core/AppLayout";
import BrowserRouter from "@main/core/BrowserRouter";
import settingsConfig from "./configs/settingsConfig";
import withAppProviders from "./withAppProviders";

function App() {
  const user = { role: ["User"] };

  return (
    <BrowserRouter>
      <AppAuthorization
        userRole={user.role}
        loginRedirectUrl={settingsConfig.loginRedirectUrl}
      >
        <AppLayout />
      </AppAuthorization>
    </BrowserRouter>
  );
}

export default withAppProviders(App)();
