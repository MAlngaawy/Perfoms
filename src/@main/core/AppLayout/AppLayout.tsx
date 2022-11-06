import { useDeepCompareEffect } from "~/@main/hooks";
import AppContext from "~/app/AppContext";
import _ from "~/@lodash";
import {
  generateSettings,
  selectAppCurrentSettings,
  selectAppDefaultSettings,
  setSettings,
} from "~/app/store/app/settingsSlice";
import React, { memo, useCallback, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchRoutes, useLocation } from "react-router-dom";
import Layout from "~/app/layouts/layout/Layout";
import { AppRouteObject } from "~/@main/types/Config-Types";

type Props = {};

const AppLayout = (props: Props) => {
  const dispatch = useDispatch();
  const settings = useSelector(selectAppCurrentSettings);
  const defaultSettings = useSelector(selectAppDefaultSettings);
  const appContext = useContext(AppContext);
  const { routes } = appContext;
  const location = useLocation();
  const { pathname } = location;
  const matchedRoutes = matchRoutes<AppRouteObject>(routes, pathname);
  const matched = matchedRoutes ? matchedRoutes[0] : false;
  const newSettings = useRef(null);

  const shouldAwaitRender = useCallback(() => {
    let _newSettings;
    if (matched && matched.route.settings) {
      const routeSettings = matched.route.settings;
      _newSettings = generateSettings(defaultSettings, routeSettings);
    } else if (!_.isEqual(newSettings.current, defaultSettings)) {
      _newSettings = _.merge({}, defaultSettings);
    } else {
      _newSettings = newSettings.current;
    }
    if (!_.isEqual(newSettings.current, _newSettings)) {
      newSettings.current = _newSettings;
    }
  }, [defaultSettings, matched]);

  shouldAwaitRender();

  useDeepCompareEffect(() => {
    if (!_.isEqual(newSettings.current, settings)) {
      dispatch(setSettings(newSettings.current));
    }
  }, [dispatch, newSettings.current, settings]);

  return _.isEqual(newSettings.current, settings) ? (
    <Layout {...props} />
  ) : null;
};

export default memo(AppLayout);
