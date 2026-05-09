"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Sparkles,
  Stars,
  useProgress,
} from "@react-three/drei";
import Link from "next/link";
import { motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/layout/header";
import { Spotlight } from "@/components/ui/spotlight";

gsap.registerPlugin(ScrollTrigger);

/* ─── Detect low-end device (client snapshot; no setState in effects) ─── */
function getLowEndClientSnapshot(): boolean {
  if (typeof navigator === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  return cores <= 4 || mem <= 4;
}

function useIsLowEnd() {
  return useSyncExternalStore(
    () => () => {},
    getLowEndClientSnapshot,
    () => false,
  );
}

type LenisController = {
  raf: (time: number) => void;
  destroy: () => void;
};

/* ─── 3D Crystal Object (optimized) ─── */
function CrystalObject({ colorHue, isLowEnd }: { colorHue: number; isLowEnd: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const timerRef = useRef<THREE.Timer | null>(null);

  useLayoutEffect(() => {
    const timer = new THREE.Timer();
    if (typeof document !== "undefined") timer.connect(document);
    timerRef.current = timer;
    return () => {
      timer.disconnect();
      timer.dispose();
      timerRef.current = null;
    };
  }, []);

  const { baseColor, emissiveColor, ringColor } = useMemo(() => ({
    baseColor: new THREE.Color().setHSL(colorHue, 0.85, 0.55),
    emissiveColor: new THREE.Color().setHSL(colorHue, 0.9, 0.3),
    ringColor: new THREE.Color().setHSL((colorHue + 0.15) % 1, 0.8, 0.6),
  }), [colorHue]);

  useFrame(() => {
    if (!groupRef.current) return;
    const timer = timerRef.current;
    if (!timer) return;
    timer.update();
    const t = timer.getElapsed();
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.3;
      innerRef.current.rotation.z = t * 0.2;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.15;
      outerRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.2;
    }
  });

  // Reduce geometry detail on low-end
  const orbCount = isLowEnd ? 3 : 5;

  return (
    <group ref={groupRef}>
      {/* Inner crystal core */}
      <mesh ref={innerRef} castShadow>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
          distort={isLowEnd ? 0.08 : 0.15}
          speed={isLowEnd ? 1 : 2}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Outer shell */}
      <mesh ref={outerRef} scale={1.6}>
        <icosahedronGeometry args={[1, isLowEnd ? 0 : 1]} />
        <meshStandardMaterial
          color={baseColor}
          transparent
          opacity={0.08}
          wireframe
          emissive={ringColor}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Orbiting ring */}
      <mesh ref={ringRef} scale={2.2}>
        <torusGeometry args={[1, 0.02, isLowEnd ? 8 : 16, isLowEnd ? 48 : 100]} />
        <meshStandardMaterial
          color={ringColor}
          emissive={ringColor}
          emissiveIntensity={1.2}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Small orbs */}
      {Array.from({ length: orbCount }, (_, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0} floatIntensity={0.5}>
          <mesh
            position={[
              Math.cos((i / orbCount) * Math.PI * 2) * 2.8,
              Math.sin((i / orbCount) * Math.PI * 2) * 2.8,
              Math.sin((i / orbCount) * Math.PI) * 0.5,
            ]}
            scale={0.08 + i * 0.02}
          >
            <sphereGeometry args={[1, isLowEnd ? 8 : 16, isLowEnd ? 8 : 16]} />
            <meshStandardMaterial
              color={ringColor}
              emissive={ringColor}
              emissiveIntensity={2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ─── Camera Controller ─── */
function CameraController() {
  const { camera } = useThree();
  const posRef = useRef({ x: 0, y: 0.5, z: 6 });
  const targetRef = useRef({ x: 0, y: 0, z: 0 });

  // Reuse vectors to avoid GC churn
  const _vec3Pos = useMemo(() => new THREE.Vector3(), []);
  const _vec3Look = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    /* Keyframes match scroll-section-1 … scroll-section-3 (hero has no trigger class). */
    const positions = [
      { x: 0, y: 0.5, z: 6 },
      { x: 2.5, y: -0.5, z: 4.5 },
      { x: -2, y: 1.5, z: 3.5 },
      { x: -1.5, y: 2, z: 5 },
    ];
    const targets = [
      { x: 0, y: 0, z: 0 },
      { x: -0.5, y: 0.3, z: 0 },
      { x: 0.5, y: -0.2, z: 0 },
      { x: 0, y: 0, z: 0 },
    ];

    const triggers: ScrollTrigger[] = [];

    for (let i = 0; i < positions.length - 1; i++) {
      const st = ScrollTrigger.create({
        trigger: `.scroll-section-${i + 1}`,
        start: "top bottom",
        end: "top top",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          posRef.current.x = THREE.MathUtils.lerp(positions[i].x, positions[i + 1].x, p);
          posRef.current.y = THREE.MathUtils.lerp(positions[i].y, positions[i + 1].y, p);
          posRef.current.z = THREE.MathUtils.lerp(positions[i].z, positions[i + 1].z, p);
          targetRef.current.x = THREE.MathUtils.lerp(targets[i].x, targets[i + 1].x, p);
          targetRef.current.y = THREE.MathUtils.lerp(targets[i].y, targets[i + 1].y, p);
          targetRef.current.z = THREE.MathUtils.lerp(targets[i].z, targets[i + 1].z, p);
        },
      });
      triggers.push(st);
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  useFrame(() => {
    _vec3Pos.set(posRef.current.x, posRef.current.y, posRef.current.z);
    camera.position.lerp(_vec3Pos, 0.08);
    _vec3Look.set(targetRef.current.x, targetRef.current.y, targetRef.current.z);
    camera.lookAt(_vec3Look);
  });

  return null;
}

/* ─── 3D Scene (optimized): vivid crystal/lighting; page shell uses theme bg like careers ─── */
const SCENE_BG = "#050510";

function Scene({ colorHue, isLowEnd }: { colorHue: number; isLowEnd: boolean }) {
  return (
    <>
      <color attach="background" args={[SCENE_BG]} />
      <fog attach="fog" args={[SCENE_BG, 8, 20]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 3]} intensity={1.8} castShadow={!isLowEnd} />
      <spotLight position={[-4, 6, 4]} intensity={1.2} angle={0.4} penumbra={0.6} color="#a78bfa" />
      <pointLight position={[0, -3, 2]} intensity={0.8} color="#6d28d9" />
      <Environment preset="night" />

      <Stars
        radius={80}
        depth={60}
        count={isLowEnd ? 500 : 1500}
        factor={3}
        saturation={0.5}
        fade
        speed={1}
      />
      {!isLowEnd && (
        <Sparkles count={80} size={2.5} speed={0.5} color="#c4b5fd" scale={8} />
      )}

      {/* Slightly smaller overall; Y scaled down so the form reads shorter */}
      <group scale={[0.36, 0.28, 0.36]}>
        <CrystalObject colorHue={colorHue} isLowEnd={isLowEnd} />
      </group>
      <CameraController />
    </>
  );
}

/* ─── Loading Screen ─── */
function LoadingScreen({ onLoaded }: { onLoaded: () => void }) {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setShow(false);
        onLoaded();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, onLoaded]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-transform duration-700"
      style={{ transform: progress >= 100 ? "translateX(100%)" : "translateX(0)" }}
    >
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
        Loading Experience
      </p>
      <div className="relative h-[2px] w-[300px] overflow-hidden rounded-full bg-white/10">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-white/40">{Math.round(progress)}%</p>
    </div>
  );
}

/* ─── Section data ─── */
const SECTIONS = [
  {
    title: "AI-Powered Solutions That Scale\nYour Vision Into Reality",
    copy: "From concept to deployment, we craft intelligent custom software that transforms challenges into opportunities and accelerates your growth.",
    cta: { href: "/services", label: "Explore Services" },
    align: "left" as const,
  },
  {
    title: "AI-Powered\nProducts",
    copy: "From intelligent chatbots to predictive analytics - we build AI systems tuned to the way your business actually works.",
    cta: { href: "/products", label: "View Products" },
    align: "right" as const,
  },
  {
    title: "Precision\nEngineering",
    copy: "Every module ships with tests, monitoring, and documentation. Our staging-first culture means zero surprises at launch.",
    cta: { href: "/about", label: "About Us" },
    align: "left" as const,
  },
  {
    title: "Let's Build\nTogether",
    copy: "Book a discovery call. We'll scope your project, align timelines, and show you what production-ready means for your stack.",
    cta: { href: "/pricing", label: "Get Started" },
    align: "center" as const,
  },
];

/* ─── Navbar height constant for spacing ─── */
const NAVBAR_HEIGHT = "5rem"; // ~80px to clear the fixed navbar

/* ─── Main Component ─── */
export function ImmersiveHome() {
  const [loaded, setLoaded] = useState(false);
  const colorHue = 0.75;
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const isLowEnd = useIsLowEnd();

  const handleLoaded = useCallback(() => {
    setLoaded(true);
    document.body.style.overflowY = "auto";
  }, []);

  /* GSAP text animations */
  useLayoutEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      // Hero text entrance
      gsap.from(".hero-title", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
      });
      gsap.from(".hero-copy", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
      });
      gsap.from(".hero-cta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.9,
        ease: "power3.out",
      });

      // Scroll sections
      document.querySelectorAll(".content-block").forEach((block) => {
        gsap.from(block.querySelectorAll(".anim-line"), {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 75%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Hero text fade out on scroll
      gsap.to(".hero-content", {
        xPercent: -80,
        opacity: 0,
        scrollTrigger: {
          trigger: ".scroll-section-1",
          start: "top bottom",
          end: "top 80%",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loaded]);

  /* Lenis smooth scroll */
  useEffect(() => {
    if (!loaded) return;
    let raf: number;
    let lenis: LenisController | undefined;

    import("lenis").then((mod) => {
      const Lenis = mod.default;
      const instance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis = instance;

      function loop(time: number) {
        instance.raf(time);
        ScrollTrigger.update();
        raf = requestAnimationFrame(loop);
      }
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [loaded]);

  return (
    <div ref={containerRef} className="dark relative min-h-screen bg-background">
      {/* ── Loading Screen ── */}
      <LoadingScreen onLoaded={handleLoaded} />

      {/* ── Fixed 3D Canvas ── */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0.5, 6], fov: 42 }}
          shadows={isLowEnd ? false : { type: THREE.PCFShadowMap }}
          gl={{
            antialias: !isLowEnd,
            alpha: false,
            powerPreference: isLowEnd ? "low-power" : "high-performance",
          }}
          dpr={isLowEnd ? [1, 1] : [1, 1.5]}
        >
          <Scene colorHue={colorHue} isLowEnd={isLowEnd} />
        </Canvas>
      </div>

      {/* ── Same ambient treatment as careers hero (grid opacity + orbs) ── */}
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgb(139, 92, 246)" />
        <Spotlight className="top-10 left-full md:left-80 md:top-20" fill="rgb(59, 130, 246)" />
        <Spotlight className="-top-20 right-full md:right-60 md:top-10" fill="rgb(168, 85, 247)" />
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(139,92,246)_1px,transparent_1px),linear-gradient(to_bottom,rgb(139,92,246)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
        <motion.div
          className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-500/20 dark:bg-purple-500/10 blur-3xl"
          aria-hidden
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-blue-500/20 dark:bg-blue-500/10 blur-3xl"
          aria-hidden
          animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Existing Site Navbar ── */}
      <Header />

      {/* ── Scrollable Content ── */}
      <main ref={sectionsRef} className="relative z-10">
        {/* Hero Section - pushed down to clear navbar */}
        <section
          className="relative flex min-h-[88svh] items-center md:min-h-screen"
          style={{ paddingTop: NAVBAR_HEIGHT }}
        >
          <div className="hero-content px-6 md:px-16 lg:px-24">
            <div className="max-w-2xl lg:max-w-3xl">
              <p className="hero-title mb-2 text-xs font-bold uppercase tracking-[0.35em] text-violet-400">
                Digital Solutions Studio
              </p>
              <h1
                className="hero-title text-balance text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {SECTIONS[0].title.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="hero-copy mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-white/65 sm:text-base md:mt-6 md:text-lg">
                {SECTIONS[0].copy}
              </p>
              <div className="hero-cta mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
                <Link
                  href={SECTIONS[0].cta.href}
                  className="rounded-full bg-violet-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-400 hover:shadow-violet-400/40 sm:px-7 sm:py-3.5"
                >
                  {SECTIONS[0].cta.label}
                </Link>
                <Link
                  href="/about"
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/15 sm:px-7 sm:py-3.5"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3">
            <div className="h-10 w-[1px] animate-pulse bg-gradient-to-b from-transparent via-violet-400/60 to-transparent" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll to explore</p>
          </div>
        </section>

        {/* Scroll Sections */}
        {SECTIONS.slice(1).map((section, idx) => {
          const sectionIdx = idx + 1;
          const alignClass =
            section.align === "right"
              ? "ml-auto mr-6 md:mr-16 text-right"
              : section.align === "center"
                ? "mx-auto text-center"
                : "ml-6 md:ml-16";

          return (
            <section
              key={section.title}
              className={`scroll-section-${sectionIdx} relative flex min-h-screen items-center`}
            >
              <div className={`content-block max-w-lg px-4 sm:px-0 ${alignClass}`}>
                <p className="anim-line text-xs font-bold uppercase tracking-[0.35em] text-violet-400">
                  {String(sectionIdx + 1).padStart(2, "0")}
                </p>
                <h2
                  className="anim-line mt-3 text-3xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-4xl md:text-6xl"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {section.title.split("\n").map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="anim-line mt-4 text-sm leading-relaxed text-white/60 sm:text-base sm:mt-5 md:text-lg">
                  {section.copy}
                </p>
                <div className="anim-line mt-6 sm:mt-7">
                  <Link
                    href={section.cta.href}
                    className="inline-flex rounded-full bg-violet-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:bg-violet-400 sm:px-6 sm:py-3"
                  >
                    {section.cta.label}
                  </Link>
                </div>
              </div>

              {/* Decorative skewed background (like the drill demo's custom--bg) */}
              {section.align === "right" && (
                <div
                  className="pointer-events-none absolute -right-40 top-0 h-[600px] w-full opacity-[0.07]"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                    transform: "skew(-12deg) rotate(6deg)",
                    borderRadius: "40px",
                  }}
                />
              )}
            </section>
          );
        })}

        {/* Footer */}
        <footer className="relative z-20 flex flex-col items-center justify-center gap-4 bg-black/80 px-6 py-16 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-300/70">
            Trimesha Digital Solutions
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-white/70 transition hover:bg-white/15"
          >
            Back to Top
          </button>
        </footer>
      </main>
    </div>
  );
}
