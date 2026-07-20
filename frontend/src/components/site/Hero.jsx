import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export const Hero = ({ ready }) => {
  const ref = useRef(null);
  const gridRef = useRef(null);
  const orbRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Interactive mouse effect: glowing grid patch + colour orb that follow the cursor
  useEffect(() => {
    const section = ref.current;
    const grid = gridRef.current;
    const orb = orbRef.current;
    if (!section) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let ox = tx;
    let oy = ty;
    let raf;
    let inside = false;

    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      inside = e.clientY >= r.top && e.clientY <= r.bottom;
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };

    const loop = () => {
      ox += (tx - ox) * 0.12;
      oy += (ty - oy) * 0.12;
      const mask = `radial-gradient(200px circle at ${tx}px ${ty}px, #000 0%, rgba(0,0,0,0.35) 45%, transparent 70%)`;
      if (grid) {
        grid.style.opacity = inside ? "1" : "0";
        grid.style.webkitMaskImage = mask;
        grid.style.maskImage = mask;
      }
      if (orb) {
        orb.style.opacity = inside ? "1" : "0";
        orb.style.transform = `translate(${ox}px, ${oy}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const cascade = {
    hidden: { opacity: 0, y: 28 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      id="hero"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 forge-grid" />
        {/* Interactive grid patch that lights up around the cursor */}
        <div ref={gridRef} className="hero-igrid absolute inset-0 transition-opacity duration-300" style={{ opacity: 0 }} />
        {/* Colour orb that trails the cursor */}
        <div
          ref={orbRef}
          className="hero-orb pointer-events-none absolute left-0 top-0 transition-opacity duration-500"
          style={{ opacity: 0 }}
        />
        <div className="absolute left-1/2 top-1/2 w-[620px] h-[620px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#3B82F6]/25 to-[#7C3AED]/25 blur-[130px] animate-radial-pulse pointer-events-none" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.h1
          custom={1}
          variants={cascade}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]"
        >
          We Build What Others{" "}
          <span className="bg-gradient-to-r from-[#3B82F6] to-[#7C3AED] bg-clip-text text-transparent">
            Can't Automate
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={cascade}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
          className="mt-7 text-base sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Custom AI tools, bots, workflows, and integrations — forged for
          businesses that refuse to waste time.
        </motion.p>

        <motion.div
          custom={3}
          variants={cascade}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            data-testid="hero-get-contact"
            className="hero-shimmer group inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(59,130,246,0.4)] hover:scale-105 hover:shadow-[0_0_34px_rgba(59,130,246,0.6)] transition-all"
          >
            Get in Contact
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#services"
            data-testid="hero-see-services"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/5 hover:border-white/50 transition-all"
          >
            See Our Services
          </a>
        </motion.div>
      </motion.div>

      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gray-500 hover:text-white transition-colors"
      >
        <ChevronDown className="h-7 w-7 animate-bounce-soft" />
      </a>
    </section>
  );
};
