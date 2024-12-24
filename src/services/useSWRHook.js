import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useToken } from "@/store/zustand/token";

class SWRHandler {
  constructor(defaultFetcher = SWRHandler.defaultFetcher.bind(this)) {
    this.defaultFetcher = defaultFetcher;
    this.interceptor = null;
  }
  static async defaultFetcher(url, option) {
    return axios({ url, ...option }).then((res) => res.data);
  }
  getInterceptor() {
    return this.interceptor;
  }

  useSWRHook(url, customFetch, cbError, option, ...props) {
    const fetcher = customFetch
    ? (url) => customFetch(url, option)
    : (url) => SWRHandler.defaultFetcher(url, option);
    const result = useSWR(url, fetcher, {
      onError: (err) => {
        // this.interceptor = err?.status;
        if (cbError) cbError(err);
        else {
          if (err.status === 401 || err.status === 403) {
            useToken.getState().clearToken();
          }
        }
        if (props) props
      },
    });
    return result;
  }

  useSWRMutateHook(url, method, customFetcher, cbError) {
    const result = useSWRMutation(
      url,
      (url, { arg }) => {
        if (customFetcher) {
          return customFetcher(url, arg);
        } else {
          return axios({
            url,
            method: method ? method : "post",
            data: arg,
          });
        }
      },
      {
        onError: (err) => {
          // this.interceptor = err.status;
          if (cbError) cbError(err);
          else {
            console.log('nocberr')
            if (err.status === 401 || err.status === 403) {
              useToken.getState().clearToken();
            }
          }
        },
      }
    )
    return result;
  }
}

class InterceptorHook extends SWRHandler {
  authorize = false
  constructor() {
    this.authorize = !!super.getInterceptor();
  }
  getUnauthorized() {
    return this.authorize;
  }
}
const SWRHandlerConfig = new SWRHandler()

export {SWRHandlerConfig};
export default SWRHandler

