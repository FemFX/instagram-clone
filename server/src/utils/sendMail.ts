import * as nodemailer from 'nodemailer';

export const sendMail = async (
  email: string,
  subject: string,
  html: string,
) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${process.env.SMTP_USER}`, // sender address
    to: email, // list of receivers
    subject, // Subject line
    html, // html body
  });
};
