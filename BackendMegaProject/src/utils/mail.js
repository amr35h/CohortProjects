import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.io",
    },
  });
  const emailText = mailGenerator.generatePlaintext(options.mailGenContent);
  const emailHTML = mailGenerator.generate(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@gmail.com",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHTML,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error("Email failed ", error);
  }
};

const emailVerificationMailGenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welecome to App! We are very excited to have you on board.",
      actions: {
        instructions: "To get started with our App, please click here:",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got request to reset your password",
      actions: {
        instructions: "To change the password click the button:",
        button: {
          color: "#22BC66",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
