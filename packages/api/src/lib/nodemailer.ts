import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from "nodemailer";

export const sendInviteMail = async ({
  receiver,
  verificationCode,
}: {
  receiver: string;
  verificationCode: string;
}) => {
  const testAccount = await createTestAccount();
  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: receiver,
    subject: "Verifiera ditt konto hos samboappen",
    text: "Kod",
    html: `<b>${verificationCode}</b>`,
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", getTestMessageUrl(info));
};
