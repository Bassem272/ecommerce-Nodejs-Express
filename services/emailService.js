import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const emailService = {
  sendEmail: async (email, code) => {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const options = {
      from: '"BassIndco" <bassemgog@gmail.com>',
      to: email,
      subject: "verification Password",
      text: "Your verification  code is " + code,
      // html: '<b>Your password reset code is ' + code + '</b>'
    };

    await transporter.sendMail(options, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};
export default emailService;
