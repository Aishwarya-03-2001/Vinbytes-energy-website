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

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
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

          <div className="relative z-10 flex min-h-[800px] items-end px-8 py-14 lg:px-12 lg:py-16">
            <div className="max-w-[640px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#8edbff] backdrop-blur-md">
                <Zap size={12} /> Energy digital transformation
              </div>
              <h1 className="mt-7 text-4xl font-black leading-[0.9] text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: "Barlow, sans-serif" }}>
                Engineering the intelligent energy economy.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
                VinBytes helps energy organizations modernize critical infrastructure with digital engineering, industrial AI, and enterprise-grade transformation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#landscape" className="group inline-flex items-center gap-2 rounded-full bg-[#0072BC] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                  Explore the vision
                  <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-[linear-gradient(90deg,_rgba(3,10,18,0.78)_0%,_rgba(3,10,18,0.28)_100%)] px-8 py-5 lg:px-12">
            <div className="flex flex-wrap items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-white/72">
              <span>ISO 27001</span>
              <span className="h-1 w-1 rounded-full bg-white/35" />
              <span>Mission-critical systems</span>
              <span className="h-1 w-1 rounded-full bg-white/35" />
              <span>Engineering-led delivery</span>
              <span className="h-1 w-1 rounded-full bg-white/35" />
              <span>Enterprise-grade security</span>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#dce9f5] bg-white/80 p-6 shadow-[0_16px_50px_rgba(0,74,143,0.06)] lg:p-8">
          <div className="flex flex-wrap gap-3">
            {trustSignals.map((signal) => (
              <div key={signal.label} className="rounded-full border border-[#dce9f5] bg-[#f7fbff] px-4 py-2 text-sm font-medium text-[#004A8F]">
                <span className="font-semibold text-[#0072BC]">{signal.label}</span> · {signal.detail}
              </div>
            ))}
          </div>
        </section>

        <section id="landscape" className="mt-24">
          <div className="mb-8 max-w-3xl">
            <SectionTag label="The energy landscape" />
            <h2 className="mt-3 text-3xl font-semibold text-[#08152A] sm:text-4xl">Energy is changing, and every sector is becoming part of a larger intelligent system.</h2>
            <p className="mt-5 text-lg leading-8 text-[#4b627b]">
              Instead of explaining each market in isolation, we present the story as a living ecosystem that blends from one domain to the next.
            </p>
          </div>

          <div className="space-y-6">
            {landscapeScenes.map((scene, index) => (
              <motion.article
                key={scene.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2, margin: "-80px" }}
                transition={{ duration: 0.95, delay: index * 0.06, ease: revealEasing }}
                whileHover={{ y: -8, scale: 1.008, boxShadow: "0 24px 70px rgba(0,74,143,0.12)" }}
                className="overflow-hidden rounded-[2.2rem] border border-[#dce9f5] bg-white shadow-[0_16px_50px_rgba(0,74,143,0.06)]"
              >
                <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
                  <div className="relative min-h-[320px] overflow-hidden lg:min-h-[420px]">
                    <img src={scene.image} alt={scene.title} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-[linear-gradient(95deg,_rgba(2,10,18,0.82)_0%,_rgba(2,10,18,0.24)_100%)]" />
                  </div>
                  <div className="flex flex-col justify-center bg-[linear-gradient(140deg,_#f8fbff_0%,_#ffffff_100%)] p-8 lg:p-10">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#0072BC]">{scene.eyebrow}</p>
                    <h3 className="mt-4 text-2xl font-semibold text-[#08152A] sm:text-3xl">{scene.title}</h3>
                    <p className="mt-5 text-lg leading-8 text-[#4b627b]">{scene.copy}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="challenge" className="mt-24 rounded-[2.4rem] border border-[#dce9f5] bg-[linear-gradient(135deg,_#f7fbff_0%,_#ffffff_100%)] p-8 shadow-[0_20px_80px_rgba(0,74,143,0.06)] lg:p-10">
          <div className="mb-8 max-w-3xl">
            <SectionTag label="Why transformation matters" />
            <h2 className="mt-3 text-3xl font-semibold text-[#08152A] sm:text-4xl">The challenge is no longer whether energy can evolve. It is whether operations can adapt with it.</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: revealEasing }}
              whileHover={{ y: -6, scale: 1.005 }}
              className="rounded-[2rem] border border-[#dce9f5] bg-[#06121e] p-8 text-white"
            >
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#8edbff]">Before</p>
              <p className="mt-4 text-3xl font-semibold">Fragmented visibility. Slower response. More risk.</p>
              <div className="mt-8 space-y-3">
                {transformationPairs.map((pair, index) => (
                  <motion.div
                    key={pair.before}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.65, delay: index * 0.08, ease: revealEasing }}
                    className="rounded-[1.2rem] border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/80"
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
              className="rounded-[2rem] border border-[#dce9f5] bg-white p-8"
            >
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#0072BC]">After</p>
              <p className="mt-4 text-3xl font-semibold text-[#08152A]">Unified intelligence. Faster action. Stronger resilience.</p>
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {transformationPairs.map((pair, index) => (
                  <motion.div
                    key={pair.after}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7, delay: 0.1 + index * 0.08, ease: revealEasing }}
                    className="rounded-[1.3rem] border border-[#dce9f5] bg-[#f7fbff] p-5"
                  >
                    <p className="text-sm font-semibold text-[#004A8F]">{pair.after}</p>
                    <p className="mt-2 text-sm leading-7 text-[#4b627b]">A shift from isolated systems to connected, adaptive operations.</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="why-now" className="mt-24 overflow-hidden rounded-[2.4rem] border border-[#dce9f5] bg-[#06121e] p-8 text-white shadow-[0_20px_80px_rgba(0,74,143,0.06)] lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-2xl">
              <SectionTag label="Why now" />
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">The energy transition is accelerating, and the pressure to act is now visible across every part of the system.</h2>
              <p className="mt-5 text-lg leading-8 text-white/70">
                The challenge is no longer whether change will happen. It is whether infrastructure, operations, and intelligence can evolve together.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {whyNowSignals.map((signal, index) => (
                <motion.div
                  key={signal.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.75, delay: index * 0.08, ease: revealEasing }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="rounded-[1.4rem] border border-white/10 bg-white/10 p-6 backdrop-blur"
                >
                  <p className="text-xl font-semibold">{signal.title}</p>
                  <p className="mt-3 text-base leading-8 text-white/70">{signal.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="thinking" className="mt-24 rounded-[2.4rem] border border-[#dce9f5] bg-[#06121e] p-8 text-white shadow-[0_20px_80px_rgba(0,74,143,0.08)] lg:p-10">
          <div className="max-w-3xl">
            <SectionTag label="Our thinking" />
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">We do not sell generic AI. We build industrial intelligence for the systems that cannot fail.</h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              The idea is simple: engineering discipline first, technological ambition second, and operational trust always in view.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {philosophyPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: revealEasing }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0072BC]/20 text-[#8edbff]">
                  <Cpu size={18} />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{point.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="ecosystem" className="mt-24">
          <div className="mb-8 max-w-3xl">
            <SectionTag label="The energy ecosystem" />
            <h2 className="mt-3 text-3xl font-semibold text-[#08152A] sm:text-4xl">One connected energy system, not a collection of isolated verticals.</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: revealEasing }}
            className="rounded-[2.4rem] border border-[#dce9f5] bg-[linear-gradient(135deg,_#f8fbff_0%,_#ffffff_100%)] p-6 shadow-[0_16px_50px_rgba(0,74,143,0.06)] lg:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.95, ease: revealEasing }}
                className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-[#dce9f5] bg-[radial-gradient(circle_at_center,_rgba(0,114,188,0.14),_transparent_46%),linear-gradient(135deg,_#f7fbff_0%,_#eef7ff_100%)] p-6"
              >
                <motion.div animate={{ opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 6, repeat: Infinity }} className="absolute left-[10%] top-[20%] h-[4px] w-[76%] rounded-full bg-gradient-to-r from-[#0072BC]/10 via-[#0072BC] to-[#0072BC]/10" />
                <motion.div animate={{ opacity: [0.25, 0.6, 0.25] }} transition={{ duration: 5.5, repeat: Infinity }} className="absolute left-[18%] top-[33%] h-[44%] w-[4px] rounded-full bg-gradient-to-b from-[#0072BC]/10 via-[#0072BC] to-[#0072BC]/10" />
                <motion.div animate={{ opacity: [0.25, 0.6, 0.25] }} transition={{ duration: 6.5, repeat: Infinity }} className="absolute right-[18%] top-[28%] h-[52%] w-[4px] rounded-full bg-gradient-to-b from-[#0072BC]/10 via-[#0072BC] to-[#0072BC]/10" />
                <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 6.2, repeat: Infinity }} className="absolute bottom-[16%] left-[18%] h-[4px] w-[60%] rounded-full bg-gradient-to-r from-[#0072BC]/10 via-[#0072BC] to-[#0072BC]/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border border-[#0072BC]/20 bg-white/70 px-6 py-4 text-center shadow-[0_20px_60px_rgba(0,74,143,0.08)]">
                    <div className="flex items-center justify-center gap-2 text-[#0072BC]">
                      <Network size={18} />
                      <span className="text-sm font-semibold uppercase tracking-[0.24em]">Energy flow</span>
                    </div>
                    <p className="mt-2 text-xl font-semibold text-[#08152A]">From generation to consumption, one living system.</p>
                  </div>
                </div>
                {ecosystemNodes.map((node) => (
                  <button
                    key={node.id}
                    onMouseEnter={() => setActiveEcosystemNode(node.id)}
                    onFocus={() => setActiveEcosystemNode(node.id)}
                    className={`absolute rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition ${
                      activeEcosystemNode === node.id
                        ? "border-[#0072BC] bg-[#0072BC] text-white shadow-lg shadow-[#0072BC]/20"
                        : "border-[#dce9f5] bg-white/80 text-[#004A8F]"
                    }`}
                    style={{
                      left: `${[10, 22, 72, 80, 18, 40, 60, 76][ecosystemNodes.findIndex((item) => item.id === node.id)]}%`,
                      top: `${[20, 35, 18, 50, 70, 58, 32, 76][ecosystemNodes.findIndex((item) => item.id === node.id)]}%`,
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
                className="rounded-[2rem] border border-[#dce9f5] bg-white p-8"
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#0072BC]">Active layer</p>
                <h3 className="mt-4 text-2xl font-semibold text-[#08152A]">{activeNode.label}</h3>
                <p className="mt-5 text-lg leading-8 text-[#4b627b]">{activeNode.description}</p>
                <div className="mt-8 rounded-[1.5rem] border border-[#dce9f5] bg-[#f7fbff] p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-[#0072BC]/10 p-3 text-[#0072BC]">
                      <Globe2 size={18} />
                    </div>
                    <p className="text-sm font-semibold text-[#004A8F]">The network lights up as the story moves from extraction to consumption, reinforcing VinBytes’ role as the connective layer.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="journey" className="mt-24 rounded-[2.4rem] border border-[#dce9f5] bg-[linear-gradient(140deg,_#f8fbff_0%,_#ffffff_100%)] p-8 shadow-[0_16px_50px_rgba(0,74,143,0.06)] lg:p-10">
          <div className="mb-8 max-w-3xl">
            <SectionTag label="Digital transformation journey" />
            <h2 className="mt-3 text-3xl font-semibold text-[#08152A] sm:text-4xl">A visual story from infrastructure to intelligent decision-making.</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
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
              className="relative overflow-hidden rounded-[2rem] border border-[#dce9f5] bg-[#06121e]"
            >
              <img src={journeyVisuals[activeJourneyStep]} alt={journeySteps[activeJourneyStep].title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(3,10,18,0.92)_0%,_rgba(3,10,18,0.34)_100%)]" />
              <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-8 lg:p-10">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#8edbff]">Live transformation</p>
                <h3 className="mt-4 text-3xl font-semibold text-white">{journeySteps[activeJourneyStep].title}</h3>
                <p className="mt-4 max-w-xl text-lg leading-8 text-white/75">{journeySteps[activeJourneyStep].text}</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="why" className="mt-24">
          <div className="mb-8 max-w-3xl">
            <SectionTag label="Why VinBytes" />
            <h2 className="mt-3 text-3xl font-semibold text-[#08152A] sm:text-4xl">Not just a platform. A long-term operating partner for the energy economy.</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: revealEasing }}
            className="overflow-hidden rounded-[2.4rem] border border-[#dce9f5] bg-[linear-gradient(135deg,_#f8fbff_0%,_#ffffff_100%)] p-6 shadow-[0_16px_50px_rgba(0,74,143,0.06)] lg:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease: revealEasing }}
                className="rounded-[2rem] border border-[#dce9f5] bg-[#06121e] p-8 text-white"
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#8edbff]">Built for infrastructure that cannot fail</p>
                <h3 className="mt-5 text-3xl font-semibold sm:text-4xl">We build the operating intelligence that keeps critical systems steady even under pressure.</h3>
                <p className="mt-5 text-lg leading-8 text-white/70">VinBytes combines engineering rigor, operational discipline, and digital sophistication into a single trusted layer for modern energy organizations.</p>
              </motion.div>

              <div className="grid gap-4">
                {whyBlocks.map((block, index) => (
                  <motion.article
                    key={block.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-70px" }}
                    transition={{ duration: 0.8, delay: index * 0.07, ease: revealEasing }}
                    whileHover={{ y: -6, scale: 1.006 }}
                    className="rounded-[1.6rem] border border-[#dce9f5] bg-white p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0072BC]/10 text-[#0072BC]">
                      <Layers3 size={18} />
                    </div>
                    <h4 className="mt-5 text-xl font-semibold text-[#08152A]">{block.title}</h4>
                    <p className="mt-3 text-base leading-8 text-[#4b627b]">{block.text}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="trust" className="mt-24 rounded-[2.4rem] border border-[#dce9f5] bg-[linear-gradient(135deg,_#ffffff_0%,_#f6fbff_100%)] p-8 shadow-[0_20px_80px_rgba(0,74,143,0.08)] lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: revealEasing }}
            >
              <SectionTag label="Enterprise trust" />
              <h2 className="mt-3 text-3xl font-semibold text-[#08152A] sm:text-4xl">The confidence layer behind every transformation decision.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#4b627b]">
                Security, compliance, reliability, and engineering maturity are not side notes. They are the foundation of lasting transformation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.95, delay: 0.08, ease: revealEasing }}
              whileHover={{ y: -6, scale: 1.005 }}
              className="rounded-[2rem] border border-[#dce9f5] bg-white p-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0072BC]/10 text-[#0072BC]">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#004A8F]">Enterprise foundations</p>
                  <p className="text-xl font-semibold text-[#08152A]">Built for mission-critical delivery</p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {trustStats.map((stat) => (
                  <div key={stat.label} className="rounded-[1.2rem] border border-[#dce9f5] bg-[#f7fbff] p-4">
                    <p className="text-2xl font-semibold text-[#08152A]">{stat.value}</p>
                    <p className="mt-2 text-sm leading-7 text-[#4b627b]">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
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
                    className="inline-flex items-center gap-2 rounded-full border border-[#dce9f5] bg-[#f7fbff] px-4 py-2 text-sm font-medium text-[#004A8F]"
                  >
                    <BadgeCheck size={14} /> {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="insights" className="mt-24">
          <div className="mb-8 max-w-3xl">
            <SectionTag label="Insights" />
            <h2 className="mt-3 text-3xl font-semibold text-[#08152A] sm:text-4xl">Premium editorial thinking for the next era of energy.</h2>
          </div>

          <div className="rounded-[2.4rem] border border-[#dce9f5] bg-white p-6 shadow-[0_16px_50px_rgba(0,74,143,0.06)] lg:p-8">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.95, ease: revealEasing }}
              whileHover={{ y: -6, scale: 1.004 }}
              className="relative overflow-hidden rounded-[2rem] border border-[#dce9f5] bg-[#06121e] p-8 text-white lg:p-10"
            >
              <img
                src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=2200&q=80"
                alt="Energy infrastructure in motion"
                className="absolute inset-0 h-full w-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-[linear-gradient(125deg,_rgba(3,10,18,0.96)_0%,_rgba(3,10,18,0.5)_45%,_rgba(0,114,188,0.24)_100%)]" />
              <div className="relative z-10 max-w-2xl">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#8edbff]">Featured story</p>
                <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">The future of AI in energy is not about automation alone. It is about orchestration.</h3>
                <p className="mt-5 text-lg leading-8 text-white/75">Why industrial intelligence is becoming the operating layer of modern infrastructure, from utilities to large industrial networks.</p>
                <a href="#partner" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Read the perspective <ArrowRight size={14} />
                </a>
              </div>
            </motion.article>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {insightsItems.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.75, delay: index * 0.08, ease: revealEasing }}
                  whileHover={{ y: -6, scale: 1.005 }}
                  className="rounded-[1.8rem] border border-[#dce9f5] bg-[#f7fbff] p-8"
                >
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#0072BC]">Editorial {index + 1}</p>
                  <h4 className="mt-4 text-2xl font-semibold text-[#08152A]">{item.title}</h4>
                  <p className="mt-4 text-lg leading-8 text-[#4b627b]">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="partner" className="mt-24 rounded-[2.4rem] border border-[#dce9f5] bg-[#04101c] p-8 text-white shadow-[0_20px_80px_rgba(0,74,143,0.08)] lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: revealEasing }}
            className="max-w-3xl"
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#8edbff]">Partnership</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">The next generation of energy will be defined by intelligence as much as infrastructure.</h2>
            <p className="mt-5 text-lg leading-8 text-white/75">
              VinBytes is built for organizations that want to shape the next era of energy with clarity, confidence, and long-term operational depth.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#overview" className="inline-flex items-center gap-2 rounded-full bg-[#0072BC] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                Re-enter the vision
                <ArrowRight size={15} />
              </a>
              <a href="mailto:hello@vinbytes.com" className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white/90 transition hover:-translate-y-0.5">
                hello@vinbytes.com
              </a>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
