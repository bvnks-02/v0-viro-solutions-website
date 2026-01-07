"use client"

import { ArrowRight, Zap, Code2, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Image from "next/image"
import { ContactForm } from "@/components/contact-form"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [matrixChars, setMatrixChars] = useState<Array<{ id: number; char: string; delay: number }>>([])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    const chars = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      char: String.fromCharCode(33 + Math.random() * 94),
      delay: Math.random() * 2,
    }))
    setMatrixChars(chars)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        {matrixChars.map((char) => (
          <div
            key={char.id}
            className="absolute text-primary/20 font-mono text-sm animate-matrix-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${char.delay}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {char.char}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full backdrop-blur-xl border-b z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/90 border-border shadow-lg" : "bg-background/50 border-border/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer transition-transform hover:scale-105 animate-neon-glow">
            <Image
              src="/viro-logo.png"
              alt="Viro Solutions"
              width={40}
              height={40}
              className="transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]"
              priority
            />
            <span className="font-semibold text-lg text-foreground relative">
              Viro
              <span className="absolute left-0 top-0 opacity-0 group-hover:animate-[glitch-before_0.3s_infinite]">Viro</span>
              <span className="absolute left-0 top-0 opacity-0 group-hover:animate-[glitch-after_0.3s_infinite]">Viro</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: "#features", label: "Features" },
              { href: "#results", label: "Results" },
              { href: "#process", label: "How It Works" },
            ].map((link, i) => (
              
                key={i}
                href={link.href}
                className="text-foreground/60 hover:text-primary transition-all duration-300 relative group animate-fade-in glitch-text"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyan-400 group-hover:w-full transition-all duration-300 animate-neon-glow" />
              </a>
            ))}
            <Button className="bg-primary hover:bg-primary/90 text-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 neon-border group hover:animate-cyber-pulse">
              Talk to Us
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-float" />

        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance leading-tight tracking-tight glitch-text hover:animate-glitch cursor-pointer">
              Ship Better, Faster
            </h1>
            <p className="text-base md:text-lg text-foreground/70 text-balance leading-relaxed max-w-2xl mx-auto animate-scan-lines">
              Unlock your team's potential. Scale your output without scaling headcount. Deliver more ambitious projects
              while keeping your margins tight.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-105 group neon-border hover:animate-neon-glow"
            >
              Schedule Consultation
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent transition-all duration-300 hover:scale-105 neon-border"
            >
              View Case Studies
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-4 animate-fade-in-up cyber-text">
            Designed for Growth
          </h2>
          <p
            className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto animate-fade-in-up glitch-text"
            style={{ animationDelay: "100ms" }}
          >
            Everything you need to take on bigger projects and bigger budgets.
          </p>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Code2,
                title: "Custom Development",
                description: "Tailored solutions that scale with you. Build exactly what you need.",
              },
              {
                icon: TrendingUp,
                title: "Fast Execution",
                description: "Ship projects in weeks, not months. Stay ahead of your competition.",
              },
              {
                icon: Zap,
                title: "Seamless Scaling",
                description: "Handle unlimited growth without operational overhead.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-card/50 rounded-xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer animate-fade-in-up backdrop-blur-sm neon-border hover:animate-neon-glow"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="mb-4 relative">
                  <feature.icon className="w-12 h-12 text-primary transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:animate-flicker" />
                  <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 group-hover:animate-cyber-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors cyber-text">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -z-10 animate-float" />

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-4 animate-fade-in-up cyber-text">
            What Happens When You Stop Saying No
          </h2>
          <p
            className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            Our partners measure success differently.
          </p>

          <div className="space-y-8">
            {[
              {
                num: "01",
                title: "More Revenue Per Project",
                desc: "Take on bigger, more complex work. Increase your average deal size without increasing your team.",
              },
              {
                num: "02",
                title: "Better Margins",
                desc: "Reduce development costs and timelines. Watch your profitability improve with every engagement.",
              },
              {
                num: "03",
                title: "Competitive Edge",
                desc: "Ship sophisticated solutions that keep you ahead. Your clients will feel the difference.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-6 items-start group hover:translate-x-2 transition-transform duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/50 flex items-center justify-center font-bold text-lg text-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow neon-border group-hover:animate-cyber-pulse">
                  {item.num}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors glitch-text">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-4 animate-fade-in-up cyber-text">
            How We Work Together
          </h2>
          <p
            className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            A simple process designed around your needs.
          </p>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              { step: "Discover", desc: "We learn about your goals, team, and current challenges." },
              { step: "Plan", desc: "Together we design a roadmap that fits your business." },
              { step: "Execute", desc: "We deliver results. You see the impact immediately." },
            ].map((item, i) => (
              <div key={i} className="relative animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="bg-card/50 rounded-xl p-8 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 h-full neon-border hover:animate-neon-glow group">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-bold text-primary mb-4 group-hover:animate-cyber-pulse">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 glitch-text">{item.step}</h3>
                  <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent animate-neon-glow" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-16 animate-fade-in-up cyber-text">
            Trusted by Teams Growing Fast
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stat: "1200+", label: "Custom Solutions Delivered", icon: "📱" },
              { stat: "98%", label: "Client Satisfaction Rate", icon: "⭐" },
              { stat: "45+", label: "Partners Globally", icon: "🌍" },
            ].map((item, i) => (
              <div key={i} className="text-center group animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="mb-4 text-5xl group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 cyber-text group-hover:animate-neon-glow transition-all">
                  {item.stat}
                </div>
                <p className="text-foreground/70 text-lg group-hover:text-foreground transition-colors">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl -z-10 animate-pulse" />

        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground cyber-text">Ready to Grow?</h2>
          <p className="text-lg text-foreground/70 mb-10 leading-relaxed">
            Let's talk about what's possible for your team.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 group neon-border hover:animate-neon-glow"
          >
            Start a Conversation
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 cyber-text">Let's Talk</h2>
            <p className="text-lg text-foreground/70">Tell us about your project and how we can help you grow.</p>
          </div>

          <div className="bg-card/50 rounded-xl p-8 md:p-12 border border-border/50 backdrop-blur-sm neon-border hover:border-primary/50 transition-all duration-300">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-neon-glow" />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                <Image
                  src="/viro-logo.png"
                  alt="Viro Solutions"
                  width={32}
                  height={32}
                  className="transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                />
                <span className="font-semibold text-foreground relative">
                  Viro
                  <span className="absolute left-0 top-0 opacity-0 group-hover:animate-[glitch-before_0.3s_infinite]">Viro</span>
                  <span className="absolute left-0 top-0 opacity-0 group-hover:animate-[glitch-after_0.3s_infinite]">Viro</span>
                </span>
              </div>
              <p className="text-foreground/60 text-sm leading-relaxed mb-4">your solutions easier</p>
              
                href="mailto:sara@viro-solutions.tech"
                className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                sara@viro-solutions.tech
              </a>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Security"] },
              { title: "Company", links: ["About", "Blog", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-foreground mb-4 glitch-text">{col.title}</h4>
                <ul className="space-y-2 text-foreground/60 text-sm">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="hover:text-primary transition-colors duration-300 hover:glitch-text">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 text-center text-foreground/50 text-sm">
            <p>&copy; 2026 Viro Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
