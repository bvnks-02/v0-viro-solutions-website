"use server"

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "n.benkrouidem@esi-sba.dz",
    pass: "maghnia02",
  },
})

export async function sendContactEmail(formData: { name: string; email: string; message: string; phone: string }) {
  try {
    const mailOptions = {
      from: "n.benkrouidem@esi-sba.dz",
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
