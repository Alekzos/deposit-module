export enum DocStatus {
  DRAFT = "DRAFT",
  UNDER_CONSIDERATION = "UNDER_CONSIDERATION",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const applicationStatusText = {
  [DocStatus.DRAFT]: "черновик",
  [DocStatus.UNDER_CONSIDERATION]: "на рассмотрении",
  [DocStatus.APPROVED]: "утверждено",
  [DocStatus.REJECTED]: "отклонено",
};
