import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, BadgeCheck, Cpu, Globe2, Layers3, Menu, Network, Shield, X, Zap } from "lucide-react";

type NavItem = { id: string; label: string };

type LandscapeScene = {
  title: string;
  eyebrow: string;
  image: string;
  copy: string;
};

type EcosystemNode = {
  id: string;
  label: string;
  description: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Vision" },
  { id: "landscape", label: "Landscape" },
  { id: "challenge", label: "Challenge" },
  { id: "why-now", label: "Why Now" },
  { id: "thinking", label: "Thinking" },
  { id: "ecosystem", label: "Ecosystem" },
  { id: "journey", label: "Journey" },
  { id: "why", label: "Why VinBytes" },
  { id: "trust", label: "Trust" },
  { id: "insights", label: "Insights" },
];

const trustSignals = [
  { label: "ISO 27001", detail: "Security-first architecture" },
  { label: "Engineering-led delivery", detail: "Built for critical infrastructure" },
  { label: "Cloud-native foundation", detail: "Scalable and resilient" },
  { label: "Enterprise-ready governance", detail: "Trusted at scale" },
];

const landscapeScenes: LandscapeScene[] = [
  {
    eyebrow: "Oil & Gas",
    title: "The systems that move energy at global scale",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2200&q=80",
    copy: "Critical infrastructure, field complexity, and constant pressure for safe, high-performance execution.",
  },
  {
    eyebrow: "Utilities",
    title: "Resilience under changing demand and conditions",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=80",
    copy: "Modern utilities need visibility, coordination, and decisive action across every layer of the network.",
  },
  {
    eyebrow: "Generation",
    title: "Power plants that sense more than they simply operate",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2200&q=80",
    copy: "Operational intelligence turns plant performance from reactive to anticipatory.",
  },
  {
    eyebrow: "Renewables",
    title: "Distributed assets becoming a connected intelligence layer",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2200&q=80",
    copy: "The new energy economy is orchestrated through flexibility, foresight, and orchestration.",
  },
  {
    eyebrow: "Industrial Plants",
    title: "The next frontier of industrial operations",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=2200&q=80",
    copy: "Energy-intensive industry needs systems that can guide action with precision and confidence.",
  },
];

const transformationPairs = [
  { before: "Operational complexity", after: "Operational intelligence" },
  { before: "Static infrastructure", after: "Living infrastructure" },
  { before: "Manual operations", after: "Autonomous decisions" },
];

const whyNowSignals = [
  { title: "Aging infrastructure", text: "Critical assets need to do more with less while staying resilient and safe." },
  { title: "Grid decentralization", text: "Energy systems are becoming more distributed, dynamic, and harder to coordinate." },
  { title: "Renewable integration", text: "The shift to cleaner generation requires orchestration, not isolated tools." },
  { title: "AI-enabled operations", text: "The next stage of performance will come from intelligence embedded into day-to-day operations." },
];

const philosophyPoints = [
  { title: "Engineering over hype", text: "We bring discipline, depth, and credibility to industrial transformation." },
  { title: "Industrial AI, not generic AI", text: "The work is grounded in the realities of critical infrastructure and operational risk." },
  { title: "Enterprise-first", text: "Every deployment is shaped for resilience, continuity, and long-term partnership." },
];

const ecosystemNodes: EcosystemNode[] = [
  { id: "oil", label: "Oil & Gas", description: "Field operations, process systems, and complex supply chains." },
  { id: "pipelines", label: "Pipelines", description: "Monitoring, control, and safe movement of critical assets." },
  { id: "generation", label: "Generation", description: "Plant optimization and reliability-led decision support." },
  { id: "transmission", label: "Transmission", description: "Grid awareness and network-level response." },
  { id: "utilities", label: "Utilities", description: "Service continuity and coordinated operations." },
  { id: "renewables", label: "Renewables", description: "Flexible orchestration across distributed assets." },
  { id: "storage", label: "Storage", description: "Energy balancing and performance optimization." },
  { id: "consumers", label: "Consumers", description: "Demand insight, resilience, and adaptive service." },
];

const journeySteps = [
  { title: "Infrastructure appears", text: "Physical systems set the stage for what follows." },
  { title: "Sensors emerge", text: "Signals become visible and measurable across the network." },
  { title: "Connectivity forms", text: "Distributed assets begin to operate as a unified environment." },
  { title: "Digital twin comes alive", text: "The system gains a living operational perspective." },
  { title: "AI guides action", text: "Decision support becomes contextual and timely." },
  { title: "Automation scales", text: "Execution becomes faster, calmer, and more confident." },
  { title: "Predictive intelligence compounds", text: "The organization moves from reaction to anticipation." },
];

const journeyVisuals = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=2200&q=80",
];

const whyBlocks = [
  { title: "Built for mission critical operations", text: "Systems are shaped for real-world environments where continuity and credibility matter most." },
  { title: "Built for enterprise scale", text: "The platform is designed to support complexity, governance, and strategic delivery across large organizations." },
  { title: "Built for national infrastructure", text: "From utilities to industrial networks, the work meets the standards of critical infrastructure and long-term resilience." },
  { title: "Built for long-term partnership", text: "VinBytes works as an enduring engineering partner, not a short-lived implementation vendor." },
];

const trustStats = [
  { label: "ISO certifications", value: "4" },
  { label: "Critical infrastructure domains", value: "12+" },
  { label: "Enterprise delivery focus", value: "24/7" },
];

const insightsItems = [
  { title: "The future of AI in energy", text: "Why industrial intelligence is becoming the operating layer of modern infrastructure." },
  { title: "Grid modernization without disruption", text: "How transformation can preserve reliability while accelerating change." },
  { title: "Operational intelligence at scale", text: "What it takes to make data useful in the most demanding environments." },
];

function SectionTag({ label }: { label: string }) {
  return (
    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#0072BC]">{label}</p>
  );
}

const revealEasing = [0.16, 1, 0.3, 1] as const;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeEcosystemNode, setActiveEcosystemNode] = useState("oil");
  const [activeJourneyStep, setActiveJourneyStep] = useState(0);

  const activeNode = useMemo(
    () => ecosystemNodes.find((node) => node.id === activeEcosystemNode) ?? ecosystemNodes[0],
    [activeEcosystemNode]
  );

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      html { scroll-behavior: smooth; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(0, 114, 188, 0.28); border-radius: 999px; }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_rgba(0,114,188,0.10),_transparent_28%),linear-gradient(140deg,_#f7fbff_0%,_#ffffff_44%,_#f2f8ff_100%)] text-[#08152A]">
      <nav className="sticky top-0 z-40 border-b border-[#dce9f5] bg-[rgba(255,255,255,0.9)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="#overview" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0072BC] text-sm font-black text-white shadow-lg shadow-[#0072BC]/20">
              VB
            </div>
            <div>
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.28em] text-[#0072BC]">VinBytes</p>
              <p className="text-sm font-semibold text-[#08152A]">Energy Intelligence</p>
            </div>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-sm font-medium text-[#4b627b] transition hover:text-[#0072BC]">
                {item.label}
              </a>
            ))}
          </div>

          <a href="#partner" className="hidden rounded-full bg-[#0072BC] px-5 py-2.5 text-sm font-semibold text-white lg:inline-flex">
            Let’s talk
          </a>

          <button className="rounded-full border border-[#dce9f5] p-2 text-[#0072BC] lg:hidden" onClick={() => setMenuOpen((prev) => !prev)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#dce9f5] bg-white/95 px-6 py-4 lg:hidden">
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="block w-full py-3 text-left text-sm font-medium text-[#4b627b]" onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <section id="overview" className="relative overflow-hidden rounded-[2.8rem] border border-[#dce9f5] bg-[#071118] shadow-[0_30px_100px_rgba(0,74,143,0.10)]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=80"
              alt="Cinematic energy infrastructure at sunrise"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(110deg,_rgba(4,13,20,0.96)_0%,_rgba(4,13,20,0.62)_38%,_rgba(4,13,20,0.16)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,_rgba(255,255,255,0.18),_transparent_24%),radial-gradient(circle_at_18%_82%,_rgba(0,114,188,0.18),_transparent_32%)]" />
            <motion.div
              animate={{ opacity: [0.2, 0.38, 0.2], x: [-16, 16, -16] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[8%] top-[12%] h-[58%] w-[32%] rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent blur-3xl"
            />
            <motion.div
              animate={{ opacity: [0.24, 0.36, 0.24], x: [20, -24, 20] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 right-0 h-[44%] w-[62%] rounded-full bg-gradient-to-tl from-[#0072BC]/18 via-transparent to-white/10 blur-3xl"
            />
            <motion.div
              animate={{ x: [-80, 180, -80], opacity: [0, 0.28, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[8%] top-[34%] h-[2px] w-[54%] rounded-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
            />
          </div>

          <div className="relative z-10 flex min-h-[480px] items-end px-4 py-8 sm:px-6 sm:py-10 md:min-h-[600px] md:py-12 lg:min-h-[800px] lg:px-12 lg:py-16">
            <div className="max-w-[640px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8edbff] backdrop-blur-md sm:text-[0.7rem] sm:tracking-[0.32em]">
                <Zap size={12} /> Energy digital transformation
              </div>
              <h1 className="mt-4 text-2xl font-black leading-[0.95] text-white sm:mt-6 sm:text-3xl md:text-4xl lg:text-6xl" style={{ fontFamily: "Barlow, sans-serif" }}>
                Engineering the intelligent energy economy.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:mt-5 sm:text-base md:text-lg md:leading-8">
                VinBytes helps energy organizations modernize critical infrastructure with digital engineering, industrial AI, and enterprise-grade transformation.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                <a href="#landscape" className="group inline-flex items-center gap-2 rounded-full bg-[#0072BC] px-5 py-2.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-sm">
                  Explore the vision
                  <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-[linear-gradient(90deg,_rgba(3,10,18,0.78)_0%,_rgba(3,10,18,0.28)_100%)] px-4 py-4 sm:px-6 sm:py-5 lg:px-12">
            <div className="flex flex-wrap items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-white/72 sm:gap-4 sm:text-[0.72rem] sm:tracking-[0.3em]">
              <span>ISO 27001</span>
              <span className="h-1 w-1 rounded-full bg-white/35" />
              <span>Mission-critical systems</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/35 sm:inline" />
              <span className="hidden sm:inline">Engineering-led delivery</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/35 sm:inline" />
              <span className="hidden sm:inline">Enterprise-grade security</span>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-[#dce9f5] bg-white/80 p-4 shadow-[0_16px_50px_rgba(0,74,143,0.06)] sm:mt-8 sm:p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {trustSignals.map((signal) => (
              <div key={signal.label} className="rounded-full border border-[#dce9f5] bg-[#f7fbff] px-3 py-2 text-xs font-medium text-[#004A8F] sm:px-4 sm:text-sm">
                <span className="font-semibold text-[#0072BC]">{signal.label}</span> · {signal.detail}
              </div>
            ))}
          </div>
        </section>

        <section id="landscape" className="mt-16 sm:mt-20 md:mt-24">
          <div className="mb-6 max-w-3xl sm:mb-8">
            <SectionTag label="The energy landscape" />
            <h2 className="mt-2 text-xl font-semibold text-[#08152A] sm:mt-3 sm:text-2xl md:text-3xl lg:text-4xl">Energy is changing, and every sector is becoming part of a larger intelligent system.</h2>
            <p className="mt-3 text-sm leading-7 text-[#4b627b] sm:mt-4 sm:text-base md:text-lg md:leading-8">
              Instead of explaining each market in isolation, we present the story as a living ecosystem that blends from one domain to the next.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {landscapeScenes.map((scene, index) => (
              <motion.article
                key={scene.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2, margin: "-80px" }}
                transition={{ duration: 0.95, delay: index * 0.06, ease: revealEasing }}
                whileHover={{ y: -8, scale: 1.008, boxShadow: "0 24px 70px rgba(0,74,143,0.12)" }}
                className="overflow-hidden rounded-[1.5rem] border border-[#dce9f5] bg-white shadow-[0_16px_50px_rgba(0,74,143,0.06)] sm:rounded-[2rem] lg:rounded-[2.2rem]"
              >
                <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
                  <div className="relative min-h-[240px] overflow-hidden sm:min-h-[280px] md:min-h-[320px] lg:min-h-[420px]">
                    <img src={scene.image} alt={scene.title} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-[linear-gradient(95deg,_rgba(2,10,18,0.82)_0%,_rgba(2,10,18,0.24)_100%)]" />
                  </div>
                  <div className="flex flex-col justify-center bg-[linear-gradient(140deg,_#f8fbff_0%,_#ffffff_100%)] p-5 sm:p-6 md:p-7 lg:p-10">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#0072BC] sm:text-[0.65rem] sm:tracking-[0.28em] md:text-[0.7rem] md:tracking-[0.32em]">{scene.eyebrow}</p>
                    <h3 className="mt-2 text-lg font-semibold text-[#08152A] sm:mt-3 sm:text-xl md:text-2xl lg:text-3xl">{scene.title}</h3>
                    <p className="mt-3 text-xs leading-6 text-[#4b627b] sm:mt-4 sm:text-sm md:text-base md:leading-7 lg:text-lg lg:leading-8">{scene.copy}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="challenge" className="mt-16 rounded-[1.5rem] border border-[#dce9f5] bg-[linear-gradient(135deg,_#f7fbff_0%,_#ffffff_100%)] p-5 shadow-[0_20px_80px_rgba(0,74,143,0.06)] sm:mt-20 sm:rounded-[2rem] sm:p-6 md:mt-24 md:rounded-[2.4rem] md:p-8 lg:p-10">
          <div className="mb-6 max-w-3xl sm:mb-7 md:mb-8">
            <SectionTag label="Why transformation matters" />
            <h2 className="mt-2 text-xl font-semibold text-[#08152A] sm:mt-3 sm:text-2xl md:text-3xl lg:text-4xl">The challenge is no longer whether energy can evolve. It is whether operations can adapt with it.</h2>
          </div>

          <div className="grid gap-4 sm:gap-5 md:gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: revealEasing }}
              whileHover={{ y: -6, scale: 1.005 }}
              className="rounded-[1.2rem] border border-[#dce9f5] bg-[#06121e] p-5 text-white sm:rounded-[1.5rem] sm:p-6 md:rounded-[2rem] md:p-8"
            >
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#8edbff] sm:text-[0.65rem] sm:tracking-[0.28em] md:text-[0.7rem] md:tracking-[0.32em]">Before</p>
              <p className="mt-3 text-lg font-semibold md:mt-4 md:text-2xl lg:text-3xl">Fragmented visibility. Slower response. More risk.</p>
              <div className="mt-5 space-y-2 md:mt-8 md:space-y-3">
                {transformationPairs.map((pair, index) => (
                  <motion.div
                    key={pair.before}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.65, delay: index * 0.08, ease: revealEasing }}
                    className="rounded-[0.8rem] border border-white/10 bg-white/10 px-3 py-2 text-xs text-white/80 sm:rounded-[1rem] sm:px-4 sm:py-3 sm:text-sm md:rounded-[1.2rem] md:text-sm"
                  >
                    {pair.before}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.95, delay: 0.08, ease: revealEasing }}
              whileHover={{ y: -6, scale: 1.005 }}
              className="rounded-[1.2rem] border border-[#dce9f5] bg-white p-5 sm:rounded-[1.5rem] sm:p-6 md:rounded-[2rem] md:p-8"
            >
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#0072BC] sm:text-[0.65rem] sm:tracking-[0.28em] md:text-[0.7rem] md:tracking-[0.32em]">After</p>
              <p className="mt-3 text-lg font-semibold text-[#08152A] md:mt-4 md:text-2xl lg:text-3xl">Unified intelligence. Faster action. Stronger resilience.</p>
              <div className="mt-5 grid gap-3 md:mt-8 md:gap-4 lg:grid-cols-2">
                {transformationPairs.map((pair, index) => (
                  <motion.div
                    key={pair.after}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7, delay: 0.1 + index * 0.08, ease: revealEasing }}
                    className="rounded-[0.8rem] border border-[#dce9f5] bg-[#f7fbff] p-3 sm:rounded-[1rem] sm:p-4 md:rounded-[1.3rem] md:p-5"
                  >
                    <p className="text-xs font-semibold text-[#004A8F] sm:text-sm">{pair.after}</p>
                    <p className="mt-1 text-xs leading-6 text-[#4b627b] sm:mt-2 sm:text-xs md:text-sm md:leading-7">A shift from isolated systems to connected, adaptive operations.</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="why-now" className="mt-16 overflow-hidden rounded-[1.5rem] border border-[#dce9f5] bg-[#06121e] p-5 text-white shadow-[0_20px_80px_rgba(0,74,143,0.06)] sm:mt-20 sm:rounded-[2rem] sm:p-6 md:mt-24 md:rounded-[2.4rem] md:p-8 lg:p-10">
          <div className="grid gap-6 sm:gap-7 md:gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-2xl">
              <SectionTag label="Why now" />
              <h2 className="mt-2 text-xl font-semibold sm:mt-3 sm:text-2xl md:text-3xl lg:text-4xl">The energy transition is accelerating, and the pressure to act is now visible across every part of the system.</h2>
              <p className="mt-3 text-sm leading-7 text-white/70 sm:mt-4 sm:text-base md:text-lg md:leading-8">
                The challenge is no longer whether change will happen. It is whether infrastructure, operations, and intelligence can evolve together.
              </p>
            </div>

            <div className="grid gap-3 sm:gap-4 md:gap-4 lg:grid-cols-2">
              {whyNowSignals.map((signal, index) => (
                <motion.div
                  key={signal.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.75, delay: index * 0.08, ease: revealEasing }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="rounded-[1rem] border border-white/10 bg-white/10 p-4 backdrop-blur sm:rounded-[1.2rem] sm:p-5 md:rounded-[1.4rem] md:p-6"
                >
                  <p className="text-base font-semibold sm:text-lg md:text-xl">{signal.title}</p>
                  <p className="mt-2 text-xs leading-6 text-white/70 sm:mt-3 sm:text-sm md:text-base md:leading-8">{signal.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="thinking" className="mt-16 rounded-[1.5rem] border border-[#dce9f5] bg-[#06121e] p-5 text-white shadow-[0_20px_80px_rgba(0,74,143,0.08)] sm:mt-20 sm:rounded-[2rem] sm:p-6 md:mt-24 md:rounded-[2.4rem] md:p-8 lg:p-10">
          <div className="max-w-3xl">
            <SectionTag label="Our thinking" />
            <h2 className="mt-2 text-xl font-semibold sm:mt-3 sm:text-2xl md:text-3xl lg:text-4xl">We do not sell generic AI. We build industrial intelligence for the systems that cannot fail.</h2>
            <p className="mt-3 text-sm leading-7 text-white/70 sm:mt-4 sm:text-base md:text-lg md:leading-8">
              The idea is simple: engineering discipline first, technological ambition second, and operational trust always in view.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:mt-7 sm:gap-5 md:mt-8 md:gap-6 lg:grid-cols-3">
            {philosophyPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: revealEasing }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="rounded-[1rem] border border-white/10 bg-white/10 p-4 backdrop-blur sm:rounded-[1.2rem] sm:p-5 md:rounded-[1.5rem] md:p-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#0072BC]/20 text-[#8edbff] sm:h-10 sm:w-10 md:h-11 md:w-11">
                  <Cpu size={16} className="sm:hidden" />
                  <Cpu size={18} className="hidden sm:block" />
                </div>
                <h3 className="mt-3 text-base font-semibold sm:mt-4 sm:text-lg md:text-xl">{point.title}</h3>
                <p className="mt-2 text-xs leading-6 text-white/70 sm:mt-3 sm:text-sm md:leading-7">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="ecosystem" className="mt-16 sm:mt-20 md:mt-24">
          <div className="mb-6 max-w-3xl sm:mb-7 md:mb-8">
            <SectionTag label="The energy ecosystem" />
            <h2 className="mt-2 text-xl font-semibold text-[#08152A] sm:mt-3 sm:text-2xl md:text-3xl lg:text-4xl">One connected energy system, not a collection of isolated verticals.</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: revealEasing }}
            className="rounded-[1.5rem] border border-[#dce9f5] bg-[linear-gradient(135deg,_#f8fbff_0%,_#ffffff_100%)] p-4 shadow-[0_16px_50px_rgba(0,74,143,0.06)] sm:rounded-[2rem] sm:p-6 md:rounded-[2.4rem] md:p-8 lg:p-8"
          >
            <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.95, ease: revealEasing }}
                className="relative min-h-[240px] overflow-hidden rounded-[1.2rem] border border-[#dce9f5] bg-[radial-gradient(circle_at_center,_rgba(0,114,188,0.14),_transparent_46%),linear-gradient(135deg,_#f7fbff_0%,_#eef7ff_100%)] p-4 sm:min-h-[340px] sm:rounded-[1.5rem] sm:p-5 md:min-h-[420px] md:rounded-[2rem] md:p-6"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,_rgba(0,114,188,0.14),_transparent_56%)]" />
                <motion.div animate={{ opacity: [0.35, 0.85, 0.35] }} transition={{ duration: 8, repeat: Infinity }} className="absolute left-[10%] top-[18%] h-[2px] w-[78%] rounded-full bg-gradient-to-r from-transparent via-[#0072BC]/70 to-transparent" />
                <motion.div animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 6.5, repeat: Infinity }} className="absolute left-[24%] top-[26%] h-[44%] w-[2px] rounded-full bg-gradient-to-b from-[#0072BC]/20 via-[#0072BC]/70 to-transparent" />
                <motion.div animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 7.2, repeat: Infinity }} className="absolute right-[24%] top-[24%] h-[52%] w-[2px] rounded-full bg-gradient-to-b from-[#0072BC]/20 via-[#0072BC]/70 to-transparent" />
                <motion.div animate={{ opacity: [0.25, 0.7, 0.25] }} transition={{ duration: 7.8, repeat: Infinity }} className="absolute bottom-[18%] left-[16%] h-[2px] w-[66%] rounded-full bg-gradient-to-r from-transparent via-[#0072BC]/70 to-transparent" />

                <div className="absolute inset-x-0 top-0 z-10 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
                  <div className="rounded-full border border-[#0072BC]/20 bg-white/80 px-3 py-2 text-center shadow-[0_12px_30px_rgba(0,74,143,0.08)] backdrop-blur sm:px-4 sm:py-3">
                    <div className="flex items-center justify-center gap-1 text-[#0072BC] sm:gap-2">
                      <Network size={14} className="sm:hidden" />
                      <Network size={18} className="hidden sm:block" />
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.24em]">Energy flow</span>
                    </div>
                    <p className="mt-1 text-[0.72rem] font-semibold text-[#08152A] sm:mt-1.5 sm:text-sm md:text-base">From generation to consumption</p>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-end justify-center px-2 pb-3 sm:pb-4 md:pb-6">
                  <div className="w-full max-w-[280px] rounded-[1rem] border border-[#dce9f5] bg-white/70 px-3 py-2 text-center shadow-[0_12px_30px_rgba(0,74,143,0.06)] backdrop-blur sm:max-w-[320px] sm:px-4 sm:py-3">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#0072BC] sm:text-sm">Connected system</p>
                    <p className="mt-1 text-[0.78rem] font-medium text-[#08152A] sm:text-sm">One living network spanning generation, transmission, and demand.</p>
                  </div>
                </div>

                {ecosystemNodes.map((node) => (
                  <button
                    key={node.id}
                    onMouseEnter={() => setActiveEcosystemNode(node.id)}
                    onFocus={() => setActiveEcosystemNode(node.id)}
                    className={`absolute hidden rounded-full border px-2 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] transition md:block ${
                      activeEcosystemNode === node.id
                        ? "border-[#0072BC] bg-[#0072BC] text-white shadow-lg shadow-[#0072BC]/20"
                        : "border-[#dce9f5] bg-white/85 text-[#004A8F]"
                    }`}
                    style={{
                      left: `${[10, 22, 72, 80, 18, 40, 60, 76][ecosystemNodes.findIndex((item) => item.id === node.id)]}%`,
                      top: `${[24, 38, 24, 54, 72, 62, 38, 78][ecosystemNodes.findIndex((item) => item.id === node.id)]}%`,
                    }}
                  >
                    {node.label}
                  </button>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.95, delay: 0.08, ease: revealEasing }}
                className="rounded-[1.2rem] border border-[#dce9f5] bg-white p-4 sm:rounded-[1.5rem] sm:p-6 md:rounded-[2rem] md:p-8"
              >
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#0072BC] sm:text-[0.65rem] sm:tracking-[0.28em] md:text-[0.7rem] md:tracking-[0.32em]">Active layer</p>
                <h3 className="mt-3 text-lg font-semibold text-[#08152A] sm:mt-4 sm:text-xl md:mt-5 md:text-2xl">{activeNode.label}</h3>
                <p className="mt-3 text-xs leading-6 text-[#4b627b] sm:mt-4 sm:text-sm md:mt-5 md:text-base md:leading-8">{activeNode.description}</p>
                <div className="mt-5 rounded-[1rem] border border-[#dce9f5] bg-[#f7fbff] p-4 sm:mt-6 sm:rounded-[1.3rem] sm:p-5 md:mt-8 md:rounded-[1.5rem] md:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="rounded-2xl bg-[#0072BC]/10 p-2 text-[#0072BC] sm:p-2.5 md:p-3">
                      <Globe2 size={14} className="sm:hidden" />
                      <Globe2 size={16} className="hidden sm:block md:hidden" />
                      <Globe2 size={18} className="hidden md:block" />
                    </div>
                    <p className="text-xs font-semibold text-[#004A8F] sm:text-sm md:text-sm">The network lights up as the story moves from extraction to consumption, reinforcing VinBytes' role as the connective layer.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="journey" className="mt-16 rounded-[1.5rem] border border-[#dce9f5] bg-[linear-gradient(140deg,_#f8fbff_0%,_#ffffff_100%)] p-5 shadow-[0_16px_50px_rgba(0,74,143,0.06)] sm:mt-20 sm:rounded-[2rem] sm:p-6 md:mt-24 md:rounded-[2.4rem] md:p-8 lg:p-10">
          <div className="mb-6 max-w-3xl sm:mb-7 md:mb-8">
            <SectionTag label="Digital transformation journey" />
            <h2 className="mt-2 text-xl font-semibold text-[#08152A] sm:mt-3 sm:text-2xl md:text-3xl lg:text-4xl">A visual story from infrastructure to intelligent decision-making.</h2>
          </div>

          <div className="grid gap-4 sm:gap-5 md:gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-2 sm:space-y-3 md:space-y-3">
              {journeySteps.map((step, index) => (
                <motion.button
                  key={step.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.75, delay: index * 0.06, ease: revealEasing }}
                  whileHover={{ x: 6, y: -2, scale: 1.005 }}
                  onMouseEnter={() => setActiveJourneyStep(index)}
                  onFocus={() => setActiveJourneyStep(index)}
                  className={`w-full rounded-[1.4rem] border p-5 text-left transition ${activeJourneyStep === index ? "border-[#0072BC] bg-[#f7fbff] shadow-[0_12px_35px_rgba(0,74,143,0.06)]" : "border-[#dce9f5] bg-white"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold ${activeJourneyStep === index ? "bg-[#0072BC] text-white" : "bg-[#eef7ff] text-[#004A8F]"}`}>
                      0{index + 1}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[#08152A]">{step.title}</p>
                      <p className="mt-2 text-sm leading-7 text-[#4b627b]">{step.text}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.div
              key={activeJourneyStep}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: revealEasing }}
              whileHover={{ y: -6, scale: 1.005 }}
              className="relative overflow-hidden rounded-[1.2rem] border border-[#dce9f5] bg-[#06121e] sm:rounded-[1.5rem] md:rounded-[2rem]"
            >
              <img src={journeyVisuals[activeJourneyStep]} alt={journeySteps[activeJourneyStep].title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(3,10,18,0.92)_0%,_rgba(3,10,18,0.34)_100%)]" />
              <div className="relative z-10 flex min-h-[240px] flex-col justify-end p-4 sm:min-h-[300px] sm:p-6 md:min-h-[420px] md:p-8 lg:p-10">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#8edbff] sm:text-[0.65rem] sm:tracking-[0.28em] md:text-[0.7rem] md:tracking-[0.32em]">Live transformation</p>
                <h3 className="mt-2 text-lg font-semibold text-white sm:mt-3 sm:text-xl md:mt-4 md:text-3xl">{journeySteps[activeJourneyStep].title}</h3>
                <p className="mt-2 max-w-xl text-xs leading-6 text-white/75 sm:mt-3 sm:text-sm md:mt-4 md:text-lg md:leading-8">{journeySteps[activeJourneyStep].text}</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="why" className="mt-16 sm:mt-20 md:mt-24">
          <div className="mb-6 max-w-3xl sm:mb-7 md:mb-8">
            <SectionTag label="Why VinBytes" />
            <h2 className="mt-2 text-xl font-semibold text-[#08152A] sm:mt-3 sm:text-2xl md:text-3xl lg:text-4xl">Not just a platform. A long-term operating partner for the energy economy.</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: revealEasing }}
            className="overflow-hidden rounded-[1.5rem] border border-[#dce9f5] bg-[linear-gradient(135deg,_#f8fbff_0%,_#ffffff_100%)] p-4 shadow-[0_16px_50px_rgba(0,74,143,0.06)] sm:rounded-[2rem] sm:p-6 md:rounded-[2.4rem] md:p-8 lg:p-8"
          >
            <div className="grid gap-4 sm:gap-6 md:gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease: revealEasing }}
                className="rounded-[1.2rem] border border-[#dce9f5] bg-[#06121e] p-4 text-white sm:rounded-[1.5rem] sm:p-6 md:rounded-[2rem] md:p-8"
              >
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#8edbff] sm:text-[0.65rem] sm:tracking-[0.28em] md:text-[0.7rem] md:tracking-[0.32em]">Built for infrastructure that cannot fail</p>
                <h3 className="mt-3 text-lg font-semibold sm:mt-4 sm:text-xl md:mt-5 md:text-3xl lg:text-4xl">We build the operating intelligence that keeps critical systems steady even under pressure.</h3>
                <p className="mt-3 text-xs leading-6 text-white/70 sm:mt-4 sm:text-sm md:mt-5 md:text-lg md:leading-8">VinBytes combines engineering rigor, operational discipline, and digital sophistication into a single trusted layer for modern energy organizations.</p>
              </motion.div>

              <div className="grid gap-3 sm:gap-4 md:gap-4">
                {whyBlocks.map((block, index) => (
                  <motion.article
                    key={block.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-70px" }}
                    transition={{ duration: 0.8, delay: index * 0.07, ease: revealEasing }}
                    whileHover={{ y: -6, scale: 1.006 }}
                    className="rounded-[1rem] border border-[#dce9f5] bg-white p-4 sm:rounded-[1.2rem] sm:p-5 md:rounded-[1.6rem] md:p-6"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#0072BC]/10 text-[#0072BC] sm:h-10 sm:w-10 md:h-11 md:w-11">
                      <Layers3 size={16} className="sm:hidden" />
                      <Layers3 size={18} className="hidden sm:block" />
                    </div>
                    <h4 className="mt-3 text-sm font-semibold text-[#08152A] sm:mt-4 sm:text-base md:text-xl">{block.title}</h4>
                    <p className="mt-2 text-xs leading-6 text-[#4b627b] sm:mt-3 sm:text-sm md:leading-8">{block.text}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="trust" className="mt-16 rounded-[1.5rem] border border-[#dce9f5] bg-[linear-gradient(135deg,_#ffffff_0%,_#f6fbff_100%)] p-5 shadow-[0_20px_80px_rgba(0,74,143,0.08)] sm:mt-20 sm:rounded-[2rem] sm:p-6 md:mt-24 md:rounded-[2.4rem] md:p-8 lg:p-10">
          <div className="grid gap-6 sm:gap-7 md:gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: revealEasing }}
            >
              <SectionTag label="Enterprise trust" />
              <h2 className="mt-2 text-xl font-semibold text-[#08152A] sm:mt-3 sm:text-2xl md:text-3xl lg:text-4xl">The confidence layer behind every transformation decision.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4b627b] sm:mt-4 sm:text-base md:text-lg md:leading-8">
                Security, compliance, reliability, and engineering maturity are not side notes. They are the foundation of lasting transformation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.95, delay: 0.08, ease: revealEasing }}
              whileHover={{ y: -6, scale: 1.005 }}
              className="rounded-[1.2rem] border border-[#dce9f5] bg-white p-4 sm:rounded-[1.5rem] sm:p-5 md:rounded-[2rem] md:p-8"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0072BC]/10 text-[#0072BC] sm:h-11 sm:w-11 md:h-12 md:w-12">
                  <Shield size={16} className="sm:hidden" />
                  <Shield size={18} className="hidden sm:block md:hidden" />
                  <Shield size={20} className="hidden md:block" />
                </div>
                <div>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#004A8F] sm:text-[0.65rem] sm:tracking-[0.28em]">Enterprise foundations</p>
                  <p className="text-sm font-semibold text-[#08152A] sm:text-base md:text-xl">Built for mission-critical delivery</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:gap-4 sm:grid-cols-3 md:mt-8">
                {trustStats.map((stat) => (
                  <div key={stat.label} className="rounded-[1rem] border border-[#dce9f5] bg-[#f7fbff] p-3 sm:rounded-[1.2rem] sm:p-4">
                    <p className="text-lg font-semibold text-[#08152A] sm:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-xs leading-6 text-[#4b627b] sm:mt-2 sm:text-xs md:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2 sm:gap-3 md:mt-8">
                {[
                  "ISO 9001",
                  "ISO 27001",
                  "ISO 45001",
                  "ISO 14001",
                  "Cloud security",
                  "Operational resilience",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.65, delay: index * 0.04, ease: revealEasing }}
                    className="inline-flex items-center gap-1 rounded-full border border-[#dce9f5] bg-[#f7fbff] px-3 py-1.5 text-xs font-medium text-[#004A8F] sm:px-4 sm:py-2 sm:text-sm"
                  >
                    <BadgeCheck size={12} className="sm:hidden" />
                    <BadgeCheck size={14} className="hidden sm:block" /> {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="insights" className="mt-16 sm:mt-20 md:mt-24">
          <div className="mb-6 max-w-3xl sm:mb-7 md:mb-8">
            <SectionTag label="Insights" />
            <h2 className="mt-2 text-xl font-semibold text-[#08152A] sm:mt-3 sm:text-2xl md:text-3xl lg:text-4xl">Premium editorial thinking for the next era of energy.</h2>
          </div>

          <div className="rounded-[1.5rem] border border-[#dce9f5] bg-white p-5 shadow-[0_16px_50px_rgba(0,74,143,0.06)] sm:rounded-[2rem] sm:p-6 md:rounded-[2.4rem] md:p-8 lg:p-8">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.95, ease: revealEasing }}
              whileHover={{ y: -6, scale: 1.004 }}
              className="relative overflow-hidden rounded-[1.2rem] border border-[#dce9f5] bg-[#06121e] p-4 text-white sm:rounded-[1.5rem] sm:p-6 md:rounded-[2rem] md:p-8 lg:p-10"
            >
              <img
                src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=2200&q=80"
                alt="Energy infrastructure in motion"
                className="absolute inset-0 h-full w-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-[linear-gradient(125deg,_rgba(3,10,18,0.96)_0%,_rgba(3,10,18,0.5)_45%,_rgba(0,114,188,0.24)_100%)]" />
              <div className="relative z-10 max-w-2xl">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#8edbff] sm:text-[0.65rem] sm:tracking-[0.28em] md:text-[0.7rem] md:tracking-[0.32em]">Featured story</p>
                <h3 className="mt-2 text-lg font-semibold sm:mt-3 sm:text-xl md:mt-4 md:text-3xl lg:text-4xl">The future of AI in energy is not about automation alone. It is about orchestration.</h3>
                <p className="mt-2 text-xs leading-6 text-white/75 sm:mt-3 sm:text-sm md:mt-4 md:text-lg md:leading-8">Why industrial intelligence is becoming the operating layer of modern infrastructure, from utilities to large industrial networks.</p>
                <a href="#partner" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-white sm:mt-4 md:text-sm">
                  Read the perspective <ArrowRight size={12} className="sm:hidden" />
                  <ArrowRight size={14} className="hidden sm:block" />
                </a>
              </div>
            </motion.article>

            <div className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 md:mt-6 md:gap-6 lg:grid-cols-2">
              {insightsItems.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.75, delay: index * 0.08, ease: revealEasing }}
                  whileHover={{ y: -6, scale: 1.005 }}
                  className="rounded-[1.2rem] border border-[#dce9f5] bg-[#f7fbff] p-4 sm:rounded-[1.5rem] sm:p-6 md:rounded-[1.8rem] md:p-8"
                >
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#0072BC] sm:text-[0.65rem] sm:tracking-[0.28em] md:text-[0.7rem] md:tracking-[0.32em]">Editorial {index + 1}</p>
                  <h4 className="mt-2 text-base font-semibold text-[#08152A] sm:mt-3 sm:text-lg md:text-2xl">{item.title}</h4>
                  <p className="mt-2 text-xs leading-6 text-[#4b627b] sm:mt-3 sm:text-sm md:mt-4 md:text-lg md:leading-8">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="partner" className="mt-16 rounded-[1.5rem] border border-[#dce9f5] bg-[#04101c] p-5 text-white shadow-[0_20px_80px_rgba(0,74,143,0.08)] sm:mt-20 sm:rounded-[2rem] sm:p-6 md:mt-24 md:rounded-[2.4rem] md:p-8 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: revealEasing }}
            className="max-w-3xl"
          >
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#8edbff] sm:text-[0.65rem] sm:tracking-[0.28em] md:text-[0.7rem] md:tracking-[0.32em]">Partnership</p>
            <h2 className="mt-2 text-xl font-semibold sm:mt-3 sm:text-2xl md:text-3xl lg:text-4xl">The next generation of energy will be defined by intelligence as much as infrastructure.</h2>
            <p className="mt-3 text-sm leading-7 text-white/75 sm:mt-4 sm:text-base md:text-lg md:leading-8">
              VinBytes is built for organizations that want to shape the next era of energy with clarity, confidence, and long-term operational depth.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3 md:mt-8">
              <a href="#overview" className="inline-flex items-center gap-2 rounded-full bg-[#0072BC] px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-sm">
                Re-enter the vision
                <ArrowRight size={12} className="sm:hidden" />
                <ArrowRight size={15} className="hidden sm:block" />
              </a>
              <a href="mailto:hello@vinbytes.com" className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 transition hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-sm">
                hello@vinbytes.com
              </a>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
