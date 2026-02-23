import { Resend } from "resend";
import { emailEnv } from "@/infra";
import type { EmailSender, IEmailSender } from ".";

const resend = new Resend(emailEnv.RESEND_API_KEY);

export class EmailSenderService implements IEmailSender {
  async sendEmail({
    to,
    subject,
    react,
  }: EmailSender.SendEmailProps): Promise<EmailSender.SendEmailResponse> {
    const { data, error } = await resend.emails.send({
      from: "diegoemanuelk@gmail.com",
      to,
      subject,
      react,
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      id: data.id,
    };
  }
}
