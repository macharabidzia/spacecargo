import { getRegistrationStatus } from "@/actions/auth.actions";
import CompleteForm from "@/components/features/auth/CompleteForm";
import {
  getLawRegisterFormFields,
  getPhysicalProfileFields,
} from "@/lib/form/register.fields";
import { ApiResponseMessage } from "@/types/api";
import { UserStatus } from "@/types/user";
import { redirect } from "next/navigation";
import React from "react";

function isUserStatus(
  msg: string | UserStatus
): msg is UserStatus {
  return typeof msg !== "string";
}

const Complete = async () => {
  let response: ApiResponseMessage<UserStatus> | null = null;

  try {
    response = await getRegistrationStatus();
  } catch {
    redirect("/register");
  }

  if (!response || !isUserStatus(response.message)) {
    redirect("/register");
  }

  const user = response.message;
  const formFields =
    user.user_type === "physical"
      ? getPhysicalProfileFields()
      : getLawRegisterFormFields();

  if (!user.phone_verified || !user.email_verified) {
    redirect("/register");
  }

  return (
    <div className="opacity-0 animate-fade-slide-in">
      <CompleteForm fields={formFields} />
    </div>
  );
};

export default Complete;
