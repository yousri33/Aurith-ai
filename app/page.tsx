import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import LogoCloud from "@/components/logo-cloud"
import HowItWorks from "@/components/how-it-works"
import OurAutomations from "@/components/our-automations"
import AiCapabilities from "@/components/ai-capabilities"
import WhoWeHelp from "@/components/who-we-help"
import TeamSection from "@/components/team-section"
import Footer from "@/components/footer"

import Chatbot from '@/components/chatbot'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div id="home">
        <HeroSection />
      </div>
      <LogoCloud />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="automations">
        <OurAutomations />
      </div>
      <div id="capabilities">
        <AiCapabilities />
      </div>
      <WhoWeHelp />
      <TeamSection />
      <Footer />
      <Chatbot />
    </main>
  )
}
