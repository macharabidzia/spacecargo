"use client";
import GenericModals from "./GenericModals";
import PhoneVerifyWrapper from "../wrappers/PhoneVerifyWrapper";
const appModalsConfig = [
  {
    queryParamName: "confirmPhone",
    component: PhoneVerifyWrapper,
  },
  {
    queryParamName: "createPersonPhoneConfirm",
    component: PhoneVerifyWrapper,
  },
];
export default function AppModalProvider() {
  return <GenericModals modalsConfig={appModalsConfig} />;
}
