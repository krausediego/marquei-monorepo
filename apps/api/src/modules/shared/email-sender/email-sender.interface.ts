export interface IEmailSender {
  sendEmail(
    params: EmailSender.SendEmailProps
  ): Promise<EmailSender.SendEmailResponse>;
}

export namespace EmailSender {
  export type SendEmailProps = {
    to: string;
    subject: string;
    react: any;
  };

  export type SendEmailResponse = {
    id: string;
  };
}
