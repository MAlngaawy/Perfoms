import React, { useState } from "react";
import AppSuspense from "@main/core/AppSuspense";
import AppContext from "app/AppContext";
import { selectAppCurrentLayoutConfig } from "app/store/app/settingsSlice";
import { memo, PropsWithChildren, useContext } from "react";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Toolbar from "./components/Toolbar";
import { Grid } from "@mantine/core";

type Props = {};

const Layout = (props: PropsWithChildren<Props>) => {
  const config = useSelector(selectAppCurrentLayoutConfig);
  const appContext = useContext(AppContext);
  const { routes } = appContext;
  console.log(config);
  const [opened, setOpened] = useState(false);
  return (
    <Grid className="min-h-screen flex flex-nowrap">
      {config.navbar.display && (
        <Navigation opened={opened} setOpened={setOpened} />
      )}
      <Grid.Col xs={12} lg={10}>
        <main>
          {config.toolbar.display && (
            <Toolbar opened={opened} setOpened={setOpened} />
          )}
          <AppSuspense>{useRoutes(routes)}</AppSuspense>
          {props.children}
          {config.footer.display && <Footer />}
        </main>
      </Grid.Col>
    </Grid>
  );
};

export default memo(Layout);
