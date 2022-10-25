import qs from "qs";

type ParseDefault = qs.ParsedQs & { defaultSettings: string };

export const defaultSettings = {
  customScrollbars: true,
  direction: "ltr",
  theme: {},
};

export function getParsedQuerySettings() {
  const parsedQueryString = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as ParseDefault;
  console.log({ parsedQueryString });

  if (parsedQueryString && parsedQueryString.defaultSettings) {
    return JSON.parse(parsedQueryString.defaultSettings);
  }
  return {};
}
