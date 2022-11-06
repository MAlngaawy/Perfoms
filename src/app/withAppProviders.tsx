import Provider from "react-redux/es/components/Provider";
import { NotificationsProvider } from "@mantine/notifications";
import store from "./store";
import routes from "~/app/configs/routesConfig";
import AppContext from "./AppContext";
import { FC } from "react";

const withAppProviders = (Component: FC) => (props?: any) => {
  const WrapperComponent = () => (
    <AppContext.Provider value={{ routes }}>
      <Provider store={store}>
        <NotificationsProvider>
          <Component {...props} />
        </NotificationsProvider>
      </Provider>
    </AppContext.Provider>
  );
  return WrapperComponent;
};

export default withAppProviders;
