import nodemailer from 'nodemailer';

export default function sendEmail(req: any, res: any) {
  const { subject, text, name, email } = req.body;
  const textWithSender = `From: ${name} (${email})\n\n${text}`;

  // check if all required fields are present
  if (!subject || !text || !name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // check all fields meet minimum length requirements
  if (
    subject.length < 3 ||
    text.length < 3 ||
    name.length < 3 ||
    email.length < 3
  ) {
    return res
      .status(400)
      .json({ error: 'All fields must be at least 3 characters long' });
  }

  // check if subject is too long
  if (subject.length > 50) {
    return res
      .status(400)
      .json({ error: 'Subject must contain 50 or less characters' });
  }

  // check if name is too long
  if (name.length > 50) {
    return res
      .status(400)
      .json({ error: 'Name must contain 50 or less characters' });
  }

  // check if email is too long
  if (email.length > 50) {
    return res
      .status(400)
      .json({ error: 'Email must contain 50 or less characters' });
  }

  // check if text is too long
  if (text.length > 900) {
    return res
      .status(400)
      .json({ error: 'Text must contain 900 or less characters' });
  }

  // check if email is valid
  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  // Create a new SMTP transport
  const transport = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Setup email data
  const mailOptions = {
    from: 'lucagaravello@outlook.com',
    to: 'lucagaravello00@gmail.com',
    subject,
    text: textWithSender,
  };

  // Send email
  transport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Something went wrong. Please try again later.',
      });
    } else {
      res.status(200).json({
        success: true,
        error: null,
        message: 'Email sent successfully',
      });
    }
  });
}
