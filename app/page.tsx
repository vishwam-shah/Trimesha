import type { Metadata } from "next";
import { ImmersiveHome } from "@/components/home/immersive-home";

export const metadata: Metadata = {
  title: "Trimesha - Digital Solutions Studio",
  description:
    "Custom AI systems, web platforms, and mobile apps engineered to scale with your ambition. Scroll-driven 3D showcase of our digital capabilities.",
};

export default function Home() {
  return <ImmersiveHome />;
}
