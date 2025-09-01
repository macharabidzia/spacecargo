"use client";

import GenericModals from "./GenericModals";
import SendResetEmailModal from "./SendResetEmailModal";

const appModalsConfig = [
  {
    queryParamName: "send-reset",
    component: (props: {
      open: boolean;
      onOpenChange: (open: boolean) => void;
    }) => (
      <SendResetEmailModal
        {...props}
        isSending={false}
        error={undefined}
        successMessage={undefined}
        onSendEmail={() => {}}
      />
    ),
  },
];

export default function AuthModalProvider() {
  return <GenericModals modalsConfig={appModalsConfig} />;
}
