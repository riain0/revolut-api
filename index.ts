import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const token: string = 'QXBwOlM5V1VuU0ZCeTY3Z1dhbjc=';
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.revolut.com/',
  headers: {
    'Authorization': 'Basic ' + token,
    'Host': 'api.revolut.com',
    'User-Agent': 'Revolut/5.5 500500250 (CLI; Android 4.4.2)',
    'X-Api-Version': '1',
    'X-Device-Id': 'revolut_api',
  },
});

/**
 * @description Sends the SMS code for authorisation to the user's phone number
 * @param phoneNumber
 * @param pin
 * @returns Promise<void>
 */
async function sendSMSCode(phoneNumber: string, pin: string): Promise<void> {
  await axiosInstance.post('/signin', {
    password: pin,
    phone: phoneNumber,
  });
}

/**
 * @description Gets token for use with the API
 * @param phoneNumber
 * @param smsCode
 * @returns Promise<string>
 */
async function getToken(phoneNumber: string, smsCode: string): Promise<string> {
  const smsArray = smsCode
    .replace('-', '')
    .trim()
    .match(/[0-9]*/);
  const numArray = phoneNumber.match(/[+0-9]*/);
  if (numArray && smsArray) {
    phoneNumber = numArray[0];
    smsCode = smsArray[0];
  }
  const data = JSON.stringify({ code: smsCode, phone: phoneNumber }).replace(
    /\\/g,
    '',
  );
  const resp = await axiosInstance
    .post('/signin/confirm', data)
    .then((response) => response);
  return resp.data.accessToken;
}

/**
 * @todo set the token to the header and return the config
 * @description Adds the user token to an axios instance's headers
 * @param instance
 * @param userAccessToken
 * @returns AxiosRequestConfig
 */
function setToken(
  instance: AxiosInstance,
  userAccessToken: string,
): AxiosRequestConfig {
  let cfg: AxiosRequestConfig = {};
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = 'Basic' + userAccessToken;
    cfg = config;
    return config;
  });
  return cfg;
}

/**
 * @todo return promise containing the balances
 * @description Gets all balances
 * @param userAccessToken
 * @returns Promise<AxiosResponse<any>> (for now)
 */
async function getAllBalances(
  userAccessToken: string,
): Promise<AxiosResponse<any>> {
  const config = setToken(axiosInstance, userAccessToken);
  // tslint:disable-next-line: no-console
  console.log(config);
  const instance = axios.create(config);
  const resp = await instance
    .get('user/current/wallet')
    .then((response) => response);
  return resp;
}

export { sendSMSCode, getToken, getAllBalances };
