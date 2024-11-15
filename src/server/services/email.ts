// ** Third-Party Imports
import { render } from "@react-email/components";
import SendGrid, { type MailDataRequired } from "@sendgrid/mail";

// ** Custom Components, Hooks, Utils, etc.
import { env } from "@/env";

type MailData = Omit<MailDataRequired, "from"> & {
  from?: MailDataRequired["from"];
};

type ElementMailData = Omit<
  MailData,
  "html" | "text" | "templateId" | "content" | "subject"
> & {
  subject: string;
};

class _EmailService {
  constructor() {
    SendGrid.setApiKey(env.SENDGRID_API_KEY);
  }

  async send(data: MailData) {
    const mailData = this.prepareMailData(data);

    try {
      const sentEmail = await SendGrid.send(mailData);

      console.info(
        `Email sent; ID = ${(sentEmail[0].headers as Record<string, string>)["x-message-id"]}`
      );

      return sentEmail;
    } catch (error) {
      console.error("Error sending email: ", error);

      return undefined;
    }
  }

  async sendElement(element: React.ReactElement, msg: ElementMailData) {
    const html = await render(element);
    const text = await render(element, { plainText: true });

    return this.send({
      ...msg,
      html,
      text,
    });
  }

  private prepareMailData(data: MailData) {
    return {
      ...data,
      from: data.from ?? env.DEFAULT_MAIL_FROM,
    } as SendGrid.MailDataRequired;
  }
}

export const EmailService = new _EmailService();
