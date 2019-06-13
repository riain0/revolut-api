import { AxiosResponse } from 'axios';
/**
 * @description Sends the SMS code for authorisation to the user's phone number
 * @param phoneNumber
 * @param pin
 * @returns Promise<void>
 */
declare function sendSMSCode(phoneNumber: string, pin: string): Promise<void>;
/**
 * @description Gets token for use with the API
 * @param phoneNumber
 * @param smsCode
 * @returns Promise<string>
 */
declare function getToken(
  phoneNumber: string,
  smsCode: string,
): Promise<string>;
/**
 * @todo return promise containing the balances
 * @description Gets all balances
 * @param userAccessToken
 * @returns Promise<AxiosResponse<any>> (for now)
 */
declare function getAllBalances(
  userAccessToken: string,
): Promise<AxiosResponse<any>>;
export { sendSMSCode, getToken, getAllBalances };
