const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendMail(email, activationLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Account activation on ${activationLink}`,
      html: `
        <div>
          <h1>For account activation, follow this link</h1>
          <a href="${activationLink}">${activationLink}</a>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
