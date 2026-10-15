import type { Metadata } from "next";
import RegisterArena from "@/components/register-arena";

export const metadata: Metadata = {
  title: "Register // Intake Terminal — Xordium 5.0",
  description:
    "Uplink to the official Xordium 5.0 registration channels: Gen AI, Cyber Psychosis (Technocrat of the Year), Code Red CP Contest, Ad Verse, Poster Making, Treasure Hunt and the 12 Hour Hackathon.",
};

export default function RegistrationPage() {
  return <RegisterArena />;
}
