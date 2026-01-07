"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { sendContactEmail } from "@/app/actions/send-email"

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [status, setStatus] = useState<{ type: string; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus(null)

    const result = await sendContactEmail(formData)

    if (result.success) {
      setStatus({ type: "success", message: "Message sent! We'll be in touch soon." })
      setFormData({ name: "", email: "", phone: "", message: "" })
    } else {
      setStatus({ type: "error", message: result.message })
    }

    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-card/50 border border-border/50 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 neon-border"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-card/50 border border-border/50 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 neon-border"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-card/50 border border-border/50 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 neon-border"
          placeholder="Your phone number"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-card/50 border border-border/50 text-foreground placeholder-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 neon-border resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      {status && (
        <div
          className={`p-4 rounded-lg ${
            status.type === "success"
              ? "bg-green-500/10 border border-green-500/30 text-green-400"
              : "bg-red-500/10 border border-red-500/30 text-red-400"
          }`}
        >
          {status.message}
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 neon-border hover:animate-neon-glow"
      >
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
