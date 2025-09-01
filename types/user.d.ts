interface AddressDetails {
  country: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  countryDesc: string;
  phone: string;
  price: number;
  countryId: number;
  isLand: "Y" | "N";
  notificationDictionaryKey: string | null;
}

interface ShippingAddress {
  country: string;
  countryId: number;
  land: AddressDetails | null;
  air: AddressDetails | null;
  notification: string | null;
}

interface ParcelNumbers {
  awaiting: number;
  warehouse: number;
  send: number;
  arrived: number;
  received: number;
}

interface AccountDetails {
  balance: number;
  transportation: number;
  payAmount: number;
}

interface UserDashboardData {
  parcelNumber: ParcelNumbers;
  shippingAddresses: ShippingAddress[];
  account: AccountDetails;
  bonusPoint: number;
  unreadMessagesCount: number;
  terminalCode: string;
  isNeighbor: boolean;
  neighborDesc: string | null;
  hasPromoCode: "Y" | "N";
  PromoCodeName: string | null;
  unreadMessagesCount?:string;
  [key: string]: number;
}
interface UserInfo {
  userTypeId: number;
  userTypeDesc: string;
  firstNameGe: string;
  lastNameGe: string;
  firstNameEn: string;
  lastNameEn: string;
  gender: "F" | "M";
  email: string;
  phone: string;
  phoneVerifyFlag: string;
  pin: string;
  deliveryMethodId: number;
  deliveryMethodDesc: string;
  departmentId: number;
  declarationAgreement: string;
  companyNameGe: string | null;
  companyNameEn: string | null;
}

interface Department {
  id: number;
  name: string;
  cityId: number;
  address: string;
}

interface City {
  id: number;
  city: string;
}

interface MessageRestrictionDetail {
  name: string;
  nameDesc: string;
  status: string;
  notificationType: string;
}

interface MessageRestriction {
  email: MessageRestrictionDetail[];
  sms: MessageRestrictionDetail[];
  messageLanguage: string;
  marketingNotificationFlag: string;
}

export interface AuthorizedPerson {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  pin: string;
}
interface UserData {
  userInfo: UserInfo;
  departments: Department[];
  cities: City[];
  addresses: any[];
  messageRestriction: MessageRestriction;
  authorizedPersons: AuthorizedPerson[];
}
type IChangePassword = {
  confirmPassword: string;
  currentPassword: string;
  newPassword: string;
};
type IAddAddress = {
  address: string;
  cityId: string;
};
export interface SendPhoneCodePayload {
  phone: string;
}

export interface VerifyPhoneCodePayload {
  phone: string;
  code: string;
}
export interface MessageRestrictionDto {
  action?:string;
  restriction: RestrictionUpdatePayload[];
  messageLanguage: "GE" | "EN"; 
  marketingNotificationFlag: "Y" | "N";
}
export enum UserType {
  Physical = "physical",
}
export interface RestrictionUpdatePayload {
  action: string;
  restrictedFlag: "Y" | "N"; // guessing based on your other enums
  notificationType: string;
}

/**
 * Represents the data structure for a user's registration status.
 * This type can be used to ensure consistency when fetching data from an API.
 */
export type UserStatus = {
  email: string;
  email_verified: boolean;
  phone: string;
  phone_verified: boolean;
  temporary_token_minutes_left: number;
  user_type: UserType;
  user_id: string;
};

type VerificationResponse = {
  message: string;
  temporary_token: string;
  user_id: number;
};
export interface ContractsLinks {
  agreementOnTermsOfService: string;
  personalDataProtection: string;
  privacyPolicy: string;
  websiteTerms: string;
}