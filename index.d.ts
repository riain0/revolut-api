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
export { sendSMSCode, getToken };
