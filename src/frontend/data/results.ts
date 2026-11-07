export type HackTheMatrixResult = {
  category: string;
  award: "Winner" | "Runner-up" | "Honorable Mention";
  rank: number;
  teamName: string;
  members: string[];
  projectName: string;
  description: string;
  demoUrl?: string;
  websiteUrl?: string;
  githubUrl?: string;
};

/**
 * Add verified Hack The Matrix result records here as they are released.
 * Keeping this as a data module lets the public results page remain a simple,
 * static page while making future event result collections easy to add.
 */
export const hackTheMatrixResults: HackTheMatrixResult[] = [
  {
    category: "Best Overall Project",
    award: "Winner",
    rank: 1,
    teamName: "CodeX",
    members: ["Vartika Shambhavi", "Aishwarya Choudhary"],
    projectName: "MediMatrix",
    description:
      "MediMatrix is an AI-powered personal healthcare assistant designed to make health information easier to manage and understand, especially for families caring for elderly members. It extracts and structures medicine details from uploaded prescriptions, supports a daily medication tracker, and uses an interactive Body Map for symptom guidance. A rule-based safety layer checks emergency warning signs before AI analysis, while patient context such as allergies and current medications personalizes responses. Daily Check-in, an AI health assistant, and doctor-ready health summaries make everyday healthcare more organized, accessible, and informed.",
    demoUrl:
      "https://drive.google.com/file/d/1izjjG3JwhgqAWSfj-aCT9oKgD6kFTWRN/preview",
    websiteUrl: "https://code-x-hackathon-three.vercel.app",
    githubUrl: "https://github.com/shambhavivartika06-cmyk/codeX-hackathon-",
  },
  {
    category: "Best Overall Project",
    award: "Runner-up",
    rank: 2,
    teamName: "Stealth Bytes",
    members: [
      "Aaryan Tiwari",
      "Ayush Kunar",
      "Ravikishan Singh",
      "Daya Shankar",
    ],
    projectName: "CampusSphere",
    description:
      "CampusSphere is a unified campus management and student-engagement platform that brings essential campus services into one digital ecosystem. It integrates Lost & Found, an academic Resource Hub, ClubConnect, a student Marketplace, and CampusFix: an intelligent campus issue reporting and resolution system. Built with Next.js, Supabase and PostgreSQL, it provides secure authentication, role-based access, database-level security and real-time workflows. CampusFix adds community validation, authority assignment, WhatsApp notifications and transparent issue tracking for a more connected, responsive and accountable campus.",
    demoUrl:
      "https://drive.google.com/file/d/1Efpf1QkZ2g5fqfVZFkLtQOCI-XGRlbVj/preview",
    websiteUrl: "https://hackathon-xordium1.vercel.app",
    githubUrl: "https://github.com/DayaShankar1/hackathon-Xordium1.git",
  },
  {
    category: "Best Technical Implementation",
    award: "Winner",
    rank: 1,
    teamName: "Beatles",
    members: [
      "Vipul Krishna Pandey",
      "Harsh Deep Kumar",
      "Mohan Sharma",
      "Divyam Mishra",
    ],
    projectName: "DevPilot",
    description:
      "DevPilot is a local-first engineering assistant that combines code scanning, dependency auditing, blast-radius analysis and automated patching in one private workflow. Its verification sandbox safely applies and tests proposed changes in temporary Git worktrees with py_compile, Ruff and pytest before the source is touched. The MVP includes Git impact analysis through RepoGraph, Android security hygiene checks, and a SQLite memory engine that catches regressions across commits. Built with Python, Typer, Pydantic v2 and Ruff alongside a Next.js 16 and React 19 dashboard, it works 100% offline by default and can optionally connect to Groq or Gemini with automatic secret redaction.",
    demoUrl:
      "https://drive.google.com/file/d/1r8ldIZfBDU4Q2pCen1QssovpkZVlqQ3n/preview",
    githubUrl: "https://github.com/KrishnaVipul14/DevPilot",
  },
  {
    category: "Honorable Mentions",
    award: "Honorable Mention",
    rank: 1,
    teamName: "Victory Lap",
    members: ["Mohit Raj", "Md. Zaid Anwar", "Aditya Kumar"],
    projectName: "FareBuddy",
    description:
      "FareBuddy turns hostels into collaborative micro-economies. Students can aggregate Blinkit and Instamart carts to bypass delivery fees, auto-match shared rides to railway stations and airports, and buy pre-owned lab gear from seniors in the hostel common room. Native UPI deep links split dues down to the exact rupee, while face-to-face exchanges keep transactions simple. By consolidating demand across hostels, floors and transit gates, FareBuddy transforms everyday campus expenses into a community-driven habit of collective savings.",
    demoUrl:
      "https://drive.google.com/file/d/1wBhugrya1ZIhDLk1aVwT9Z-45VGxm4Br/preview",
    websiteUrl: "https://fare-buddy-eight.vercel.app/",
    githubUrl: "https://github.com/mohit-1025/fare_buddy",
  },
  {
    category: "Honorable Mentions",
    award: "Honorable Mention",
    rank: 2,
    teamName: "HackTantra",
    members: ["Pratiksha Singh", "Sachin Kumar", "Stuti Shree", "Shambhavi"],
    projectName: "LocalConnect",
    description:
      "LocalConnect is a travel assistance and local-services platform designed to bridge the gap between travellers and local communities. It helps people in unfamiliar places find essential services, rent necessary items, access local assistance and connect with reliable service providers. The platform includes a rental marketplace and Razorpay payments, while creating opportunities for local residents to showcase services, rent out resources and generate additional income.",
    demoUrl:
      "https://drive.google.com/file/d/1JZ7ASafEIssffREs39BgfObi2kyyrvij/preview",
    websiteUrl: "https://localconnect-frontend-vxnn.onrender.com/",
    githubUrl: "https://github.com/sachin6298/Local-Connect",
  },
  {
    category: "Honorable Mentions",
    award: "Honorable Mention",
    rank: 3,
    teamName: "Pussy Cat",
    members: ["Aryan Kumar", "Abhijeet Raj"],
    projectName: "Sound Drop",
    description:
      "Sound Drop lets people send a note, link or Wi-Fi password to any nearby device as sound — with no pairing, internet connection or app required.",
    demoUrl:
      "https://drive.google.com/file/d/10ZMYFCoZwN13mi6r8qbzroSZ0RFpZGRN/preview",
    websiteUrl: "https://sounddrop-xordium.netlify.app/",
    githubUrl: "https://github.com/arkr6913/sounddrop",
  },
];
