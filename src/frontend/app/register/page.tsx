import type { Metadata } from "next";
import RegisterArena from "@/components/register-arena";

export const metadata: Metadata = {
  title: "Register // Intake Terminal — Xordium 5.0",
  description:
    "Uplink to the official Xordium 5.0 registration channels: 12 Hour Hackathon, Code Red CP Contest, Treasure Hunt, Ad Verse, Cyber Psychosis (Technocrat of the Year) and Pixel Pulse (Gen AI poster making).",
};

export default function RegistrationPage() {
  return <RegisterArena />;
}
