import { FormFieldConfig } from "@/types";
export const getCourierFormFields = (): FormFieldConfig[] => [
  {
    name: "receiverFullName",
    type: "text",
    placeholderKey: "courier.receiverFullNamePlaceholder",
    labelKey: "courier.receiverFullNamePlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "receiverPhone",
    type: "tel",
    placeholderKey: "courier.receiverPhonePlaceholder",
    labelKey: "courier.receiverPhonePlaceholder",
    colSpan: "col-span-1",
    prefix: (
      <div className="flex items-center justify-center h-12 px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
        <span role="img" aria-label="common.georgiaFlag">
          🇬🇪
        </span>
        <span className="ml-2 text-sm text-gray-700">+995</span>
      </div>
    ),
  },
  {
    name: "address",
    type: "text",
    placeholderKey: "courier.addressPlaceholder",
    labelKey: "courier.addressPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "cityId",
    type: "text",
    placeholderKey: "courier.cityPlaceholder",
    labelKey: "courier.cityPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "districtId",
    type: "text",
    placeholderKey: "courier.districtPlaceholder",
    labelKey: "courier.districtPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "package",
    type: "text",
    placeholderKey: "courier.packageTypePlaceholder",
    labelKey: "courier.packageTypePlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "comment",
    type: "textarea",
    placeholderKey: "courier.commentPlaceholder",
    labelKey: "courier.commentPlaceholder",
    colSpan: "col-span-2",
  },
];

export const getChangePasswordFormFields = (): FormFieldConfig[] => [
  {
    name: "currentPassword",
    type: "password",
    placeholderKey: "password.currentPasswordPlaceholder",
    labelKey: "password.currentPasswordPlaceholder",
  },
  {
    name: "newPassword",
    type: "password",
    placeholderKey: "password.newPasswordPlaceholder",
    labelKey: "password.newPasswordPlaceholder",
  },
  {
    name: "ConfirmNewPassword",
    type: "password",
    placeholderKey: "password.confirmNewPasswordPlaceholder",
    labelKey: "password.confirmNewPasswordPlaceholder",
  },
];
