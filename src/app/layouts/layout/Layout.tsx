import AppSuspense from "@main/core/AppSuspense";
import AppContext from "app/AppContext";
import { selectAppCurrentLayoutConfig } from "app/store/app/settingsSlice";
import { memo, PropsWithChildren, useContext } from "react";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Toolbar from "./components/Toolbar";

type Props = {};

const Layout = (props: PropsWithChildren<Props>) => {
  const config = useSelector(selectAppCurrentLayoutConfig);
  const appContext = useContext(AppContext);
  const { routes } = appContext;
  console.log(config);
  return (
    <div>
      {config.navbar.display && <Navigation />}
      <main>
        {config.toolbar.display && <Toolbar />}
        <AppSuspense>{useRoutes(routes)}</AppSuspense>
        {props.children}
        {config.footer.display && <Footer />}
      </main>
    </div>
  );
};

export default memo(Layout);
