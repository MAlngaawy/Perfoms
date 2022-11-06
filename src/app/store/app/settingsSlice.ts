import { createSlice } from "@reduxjs/toolkit";
import _ from "~/@lodash";
import settingsConfig from "~/app/configs/settingsConfig";
import config from "~/app/layouts/layout/LayoutConfig";
import {
  defaultSettings,
  getParsedQuerySettings,
} from "~/@main/core/default-settings";

function getInitialSettings() {
  const layout = {
    config: config.defaults,
  };
  return _.merge(
    {},
    defaultSettings,
    { layout },
    settingsConfig,
    getParsedQuerySettings()
  );
}

export function generateSettings(_defaultSettings: any, _newSettings: any) {
  const response = _.merge(
    {},
    _defaultSettings,
    {
      layout: {
        config: config.defaults,
      },
    },
    _newSettings
  );

  return response;
}

const initialSettings = getInitialSettings();

const initialState = {
  initial: initialSettings,
  defaults: _.merge({}, initialSettings),
  current: _.merge({}, initialSettings),
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action) => {
      const current = generateSettings(state.defaults, action.payload);
      return {
        ...state,
        current,
      };
    },
    setInitialSettings: (state, action) => {
      return _.merge({}, initialState);
    },
    resetSettings: (state, action) => {
      return {
        ...state,
        defaults: _.merge({}, state.defaults),
        current: _.merge({}, state.defaults),
      };
    },
  },
});

export const selectAppCurrentSettings = ({ app }: any) => app.settings.current;
export const selectAppCurrentLayoutConfig = ({ app }: any) =>
  app.settings.current.layout.config;
export const selectAppDefaultSettings = ({ app }: any) => app.settings.defaults;
export const selectAppThemesSettings = ({ app }: any) => app.settings.themes;
export const { resetSettings, setInitialSettings, setSettings } =
  settingsSlice.actions;

export default settingsSlice.reducer;
