"use server"

import nodemailer from "nodemailer"

export async function sendContactEmail(formData: { name: string; email: string; message: string; phone: string }) {
  try {
    // 1. Create the transporter INSIDE the function
    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "sara@viro-solutions.tech",
        pass: "Houdaifachekam@2", // 2. Use an environment variable here!
      },
    })

    const mailOptions = {
      from: '"Viro Solutions" <sara@viro-solutions.tech>', // Added a friendly name
      to: "sara@viro-solutions.tech", 
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `,
    }

    await transporter.sendMail(mailOptions)
    return { success: true, message: "Email sent successfully!" }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, message: "Failed to send email. Please try again." }
  }
}
