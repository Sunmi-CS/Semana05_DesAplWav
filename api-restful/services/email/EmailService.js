const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

class EmailService {
  constructor() {
    this.mode = process.env.MAILER_MODE || "SAFE";

    console.log("📌 Modo Email:", this.mode); // 👈 DEBUG

    if (this.mode === "REAL") {
      this.transporter = nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: Number(process.env.MAILER_PORT), // 👈 IMPORTANTE (number)
        secure: false, // 👈 Mailtrap usa false
        auth: {
          user: process.env.MAILER_EMAIL,
          pass: process.env.MAILER_SECRET_KEY,
        },
      });
    }
  }

  async sendEmail({ to, subject, htmlBody }) {

    // 🟢 MODO SEGURO
    if (this.mode === "SAFE") {
      console.log("📧 [SIMULADO]");
      console.log("Para:", to);
      console.log("Asunto:", subject);
      console.log("Mensaje:", htmlBody);
      return true;
    }

    console.log("🚀 Intentando enviar correo..."); // 👈 DEBUG

    try {
      const info = await this.transporter.sendMail({
        from: '"Sistema Tickets" <test@mailtrap.io>',
        to,
        subject,
        html: htmlBody,
      });

      console.log("✅ Email enviado:", info.response);
      return true;

    } catch (error) {
      console.error("❌ ERROR COMPLETO:", error); // 👈 CLAVE para detectar fallo

      console.log("📧 [FALLBACK SIMULADO]");
      console.log("Mensaje:", htmlBody);

      return false;
    }
  }
}

module.exports = EmailService;