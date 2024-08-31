import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, text) => {
  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      // secure: Boolean(process.env.SECURE), // Uncomment if needed
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send an email
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending mail to ${email}:`, error);
    throw error; // Re-throw the error for the calling code to handle
  }
};


export default sendEmail;