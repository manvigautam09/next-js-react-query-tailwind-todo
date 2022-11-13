import * as R from "ramda";

export const isNilOrEmpty = R.anyPass([R.isNil, R.isEmpty]);
export const isPresent = R.complement(isNilOrEmpty);

export const saveDataInCookies = (key: string, token: string) => {
  document.cookie = `${key}=${token}; path=/`;
};

export const clearCookie = (key: string) => {
  document.cookie = `${key}=; path=/`;
};

export const getDataFromCookie = (
  cname: string,
  cookiesString: string = ""
) => {
  const name = cname + "=";
  const decodedCookie = isPresent(cookiesString)
    ? cookiesString
    : typeof document !== "undefined"
    ? decodeURIComponent(document.cookie)
    : "";
  const cookieArr = decodedCookie.split("; ");

  let res: string = "";
  cookieArr.forEach((cookie) => {
    if (cookie.indexOf(name) === 0) {
      res = cookie.substring(name.length);
    }
  });

  return res;
};
