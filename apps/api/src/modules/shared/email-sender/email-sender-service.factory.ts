import { EmailSenderService, type IEmailSender } from ".";

export const makeEmailSenderService = (): IEmailSender => {
  return new EmailSenderService();
};
