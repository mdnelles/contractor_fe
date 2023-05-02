import axios from "axios";
import { API_REMOTE, API_LOCAL } from "../constants/api";

export const API_URL =
  !!window && window.location.href.toString().includes("localhost")
    ? API_LOCAL
    : API_REMOTE;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 300000,
});

const processResponse = (res: any) => res.data;
const processFinally = () => {
  console.log("PF");
};
const processError = (err: any) => {
  return Promise.reject(err);
};

const action = (request: Promise<any>) =>
  request.then(processResponse).catch(processError).finally(processFinally);

const getBaseHeaders = (headers = {}, axiosHeaders = {}) => ({
  headers,
  ...axiosHeaders,
});

export const purePostAction = (
  path: any,
  data: object,
  headers?: any,
  outsideHeaders?: boolean
) => {
  return action(
    axiosInstance.post(
      path,
      data ?? null,
      getBaseHeaders(headers, outsideHeaders)
    )
  );
};

export const postAction = (
  path: any,
  data: object,
  headers: any,
  outsideHeaders: boolean
) => {
  console.log(path);
  const body = { ...data };

  return action(
    purePostAction(path, body, getBaseHeaders(headers, outsideHeaders))
  );
};

export const apiGet = async (path: string, args: object = {}) => {
  return await axios.request({
    method: "GET",
    url: API_URL + path,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "Token",
      "Access-Control-Allow-Origin": "*",
    },
    data: args,
  });
};

interface Headers {
  [key: string]: string;
}

export const apiPost = async (path: string, args: object = {}, token?: string | null) => {
  const headers:Headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Accept: "Token",
    "Access-Control-Allow-Origin": "*",
  };

  if (token) {
    headers["token"] = token;
  }

  return await axios.request({
    method: "POST",
    url: API_URL + path,
    headers: headers,
    data: args,
  });
};