import axios, { AxiosRequestConfig, Method } from 'axios';

export interface IRequestOptions {
  queries?: any;
  body?: {};
}
const request = async (
  method: Method,
  endpoint: string,
  options?: IRequestOptions
) => {
  const requestOptions: AxiosRequestConfig = {
    method,
    baseURL: endpoint,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };
  // console.log("options", options);
  if (options && options.queries) {
    requestOptions.params = options.queries;
  }
  if (options && options.body) {
    requestOptions.data = options.body;
  }

  try {
    console.log('url', requestOptions);
    const res = await axios(requestOptions);
    // console.log('res', res);
    return res;
  } catch (e) {
    const response = e.response;
    if (response.status === 404) {
      return response;
    } else {
      throw e;
    }
  }
};

const get = (endpoint: string, requestOptions?: IRequestOptions) =>
  request('GET', endpoint, requestOptions);
const post = (endpoint: string, requestOptions?: IRequestOptions) =>
  request('POST', endpoint, requestOptions);
const put = (endpoint: string, requestOptions?: IRequestOptions) =>
  request('PUT', endpoint, requestOptions);
const patch = (endpoint: string, requestOptions?: IRequestOptions) =>
  request('PATCH', endpoint, requestOptions);
const remove = (endpoint: string, requestOptions?: IRequestOptions) =>
  request('DELETE', endpoint, requestOptions);
export default { get, post, put, patch, delete: remove };
