"server only";

import * as brevo from "@getbrevo/brevo";

type EmailProps = {
  params: {};
  emailTemplate: number;
  to: string;
};
export const sendEmailInstance = ({
  params,
  emailTemplate,
  to,
}: EmailProps) => {
  if (process.env.NODE_ENV === "development") return;
  const apiInstance = new brevo.TransactionalEmailsApi();
  //@ts-ignore
  const apiKey = apiInstance.authentications["apiKey"];
  apiKey.apiKey = process.env.BREVO!;
  const sendEmail = new brevo.SendSmtpEmail();

  sendEmail.to = [{ email: to }];
  sendEmail.templateId = emailTemplate;
  sendEmail.params = params;

  return apiInstance.sendTransacEmail(sendEmail);
};

export const addToContactList = ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  const apiInstance = new brevo.ContactsApi();
  //@ts-ignore
  const apiKey = apiInstance.authentications["apiKey"];
  apiKey.apiKey = process.env.BREVO!;

  const contact = new brevo.CreateContact();
  contact.email = email;
  contact.attributes = {
    NAME: name,
  };

  return apiInstance.createContact(contact);
};

export const brevoSenderEmail = "travelmate@travelinyourpocket.com";
export const emailTemplate = {
  resetPassword: 1,
  resetPasswordKO: 2,
  welcome: 3,
  welcomeKO: 5,
  paymentSuccess: 6,
  paymentSuccessKO: 7,
  accountLeveledUp: 8,
  accountLeveledUpKO: 9,
  requestEdited: 10,
  requestEditedKO: 11,
  requestConfirmed: 12,
  requestConfirmedKO: 13,
  invoiceIssued: 14,
  invoiceIssuedKO: 15,
};

export const staffEmailTemplate = {
  welcome: 17,
  requestSubmitted: 18,
  contact: 19,
};
export const emailSubject = {
  resetPassword: "Reset Password Code",
  welcome: "Welcome to TIP",
  paymentSuccess: "Payment Confirmed",
  accountLeveledUp: "Account Leveled Up",
  requestEdited: "Request Edited",
  requestConfirmed: "Request Confirmed",
  invoiceIssued: "Invoice Issued",
};
export const emailSubjectKR = {
  resetPassword: "비밀번호 재설정 코드",
  welcome: "TIP에 회원가입을 환영합니다",
  paymentSuccess: "결제가 완료되었습니다",
  accountLeveledUp: "계정 등급 업그레이드 되었습니다",
  requestEdited: "요청 수정이 완료되었습니다",
  requestConfirmed: "요청 확인이 완료되었습니다",
  invoiceIssued: "견적서 발행이 완료되었습니다",
};
