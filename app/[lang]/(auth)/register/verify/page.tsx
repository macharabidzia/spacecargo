import { getRegistrationStatus } from "@/actions/auth.actions";
import VerifyForm from "@/components/features/auth/VerifyForm";
import { UserStatus } from "@/types/user";
import { redirect } from "next/navigation";
import React from "react";

const Verify = async () => {
  let response;
  try {
    response = await getRegistrationStatus();
  } catch {
    redirect("/register");
  }
  console.log(response);
  return <VerifyForm userStatus={response.message as UserStatus} />;
};

export default Verify;
