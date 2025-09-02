import { fetchUtils } from "react-admin";

const customHttpClient = (url: string, options: any = {}) => {
  const defaultOptions = {
    credentials: "include",
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    }),
  };

  return fetchUtils.fetchJson(url, {
    ...defaultOptions,
    ...options,
    credentials: "include", 
  });
};

export default customHttpClient;