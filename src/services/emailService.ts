import * as nodemailer from 'nodemailer';
import { MAIL, PASSWORD } from "../config/config";


//config for nodemailer


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: MAIL,
    pass: PASSWORD,
  },
});


///mail sending format
const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: MAIL,
      to,
      subject,
      html,
    });
    console.log(
      "email sent successfully, please check your inbox or spam\n EMAIL \n \t SENT FROM :",
      MAIL,
      "\n \t TO :",
      to
    );
    return true; // Email sent successfully
  } catch (error) {
    console.error("Error sending email:", error);
    return false; // Email sending failed
  }
};

export default sendEmail;
