import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendBookingEmail = async (to: string, name: string, date: Date, time: string) => {
  const mailOptions = {
    from: `"BarberShop" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Tu reserva ha sido agendada con éxito 💈',
    html: `
      <h1>Hola ${name}!</h1>
      <p>Tu reserva ha sido agendada con éxito:</p>
      <ul>
        <li><strong>Fecha:</strong> ${date}</li>
        <li><strong>Hora:</strong> ${time}</li>
      </ul>
      <p>¡Te esperamos en la Barbería!</p>
    `
  };

  await transporter.sendMail(mailOptions);
};
