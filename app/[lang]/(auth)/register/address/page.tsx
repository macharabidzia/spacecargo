import { getRegistrationStatus } from "@/actions/auth.actions";
import AddressForm from "@/components/features/auth/AddressForm";
import { ApiResponseMessage } from "@/types/api";
import { UserStatus } from "@/types/user";
import { redirect } from "next/navigation";

const Address = async () => {
  let response: ApiResponseMessage<UserStatus> | null = null;
  try {
    response = await getRegistrationStatus();
  } catch {
    redirect("/register");
  }

  if (
    !response ||
    typeof response.message === "string" ||
    !response.message?.phone_verified ||
    !response.message?.email_verified
  ) {
    redirect("/register");
  }

  return <AddressForm />;
};

export default Address;
