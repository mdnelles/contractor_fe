export const API_REMOTE = "https://servicie-be.webapz.app";
export const API_LOCAL = "http://localhost:5027";
export const API_URL =
  window && window.location.href.toString().includes("localhost")
    ? API_LOCAL
    : API_REMOTE;
