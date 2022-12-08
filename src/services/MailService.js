const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.trnasporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_P
      }
    });
  }

  async sendChangePasswordMail(to, id) {
    await this.trnasporter.sendMail({
      from: process.env.SMTP_HOST,
      to,
      subject: 'Password recovery.',
      text: 'Click link to recover password.',
      html: `<p>Please click on link to change the password: <a target="_blank" href="${process.env.CHANGE_PASSWORD_URL}/${id}">recover_your_password</a></p>`
    });

    return true;
  }
}

module.exports = new MailService();
