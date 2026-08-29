export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Project = {
  title: string;
  description: string;
  outcome: string;
  stack: string[];
  href: string;
  tone: string;
};

export type Fact = {
  label: string;
  value: string;
  icon: "location" | "availability" | "focus" | "stack";
};

export const portfolio = {
  name: "Kaung Set Hein",
  role: "Full-Stack Software Engineer",
  summary:
    "I have over three years of experience designing and developing scalable web applications, dashboards, RESTful APIs, and business automation workflows for local and international clients.",
  heroNote: "React, Next.js, TypeScript, Node.js, and business automation.",
  highlight:
    "Experienced in Agile and Scrum environments, technical leadership, performance optimization, API integration, cloud deployment, and n8n workflow automation.",
  location: "Yangon, Myanmar",
  availability: "Frontend Developer at Origin Business Solution",
  email: "kaungsethein91@gmail.com",
  phones: ["+95 9764341352", "+95 9985921367"],
  resumeHref: "/Kaung_Set_Hein_Resume.pdf",
  navItems: [
    { label: "About Me", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/kaung-set107", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kaung-set-hein-900b2626b",
      icon: "linkedin",
    },
    { label: "Email", href: "mailto:kaungsethein91@gmail.com", icon: "mail" },
  ] satisfies SocialLink[],
  quickFacts: [
    { label: "Location", value: "Yangon, Myanmar", icon: "location" },
    { label: "Experience", value: "3+ years", icon: "availability" },
    { label: "Current Role", value: "Frontend Developer", icon: "focus" },
    { label: "Education", value: "B.C.Sc.", icon: "stack" },
  ] satisfies Fact[],
  skillGroups: [
    {
      title: "Frontend",
      items: ["React.js", "Next.js", "TypeScript", "JavaScript ES6+", "Tailwind CSS", "Bootstrap", "NextUI"],
    },
    {
      title: "Backend & Data",
      items: ["Node.js", "Express.js", "RESTful APIs", "JWT Authentication", "MongoDB"],
    },
    {
      title: "Cloud & Automation",
      items: ["AWS Lightsail", "n8n", "Webhooks", "API Integration", "Server Configuration"],
    },
    {
      title: "Delivery & Collaboration",
      items: ["Agile", "Scrum", "Git", "GitHub", "GitLab", "Jira", "Microsoft Teams"],
    },
  ] satisfies SkillGroup[],
  featuredProjects: [
    {
      title: "POS & Finance Web Application",
      description:
        "Developed the frontend for a multi-branch clinic finance system with application dashboards and operational reporting.",
      outcome: "Multi-branch finance workflows with maintainable dashboard interfaces.",
      stack: ["React.js", "Next.js", "TypeScript"],
      href: "#contact",
      tone: "from-cyan-400/35 via-sky-500/15 to-indigo-500/25",
    },
    {
      title: "Team Learning Management System",
      description:
        "Developed Admin, Instructor, and Student panels with examinations, approval workflows, and role-based learning operations.",
      outcome: "A complete multi-panel learning workflow for teams and instructors.",
      stack: ["Next.js", "TypeScript", "Node.js"],
      href: "#contact",
      tone: "from-fuchsia-400/30 via-violet-500/15 to-slate-500/25",
    },
    {
      title: "E-Learning Platform",
      description:
        "Built a full-stack, multi-panel education platform with email communication through EmailJS and Nodemailer integrations.",
      outcome: "Integrated frontend, backend, and email workflows in one platform.",
      stack: ["React.js", "Node.js", "EmailJS"],
      href: "#contact",
      tone: "from-emerald-400/30 via-teal-500/15 to-cyan-500/20",
    },
  ] satisfies Project[],
  experience: [
    {
      period: "Mar 2026 - Present",
      title: "Frontend Developer - Origin Business Solution",
      description:
        "Building scalable point-system web applications with React.js, Next.js, and TypeScript while delivering reusable UI components and performance optimization.",
    },
    {
      period: "Sep 2025 - Feb 2026",
      title: "Frontend Developer - LOM Tech Global",
      description:
        "Designed React and Tailwind frontend architecture, built REST APIs with Node.js and Express, managed AWS Lightsail deployment, and supervised ERP modules.",
    },
    {
      period: "Jan 2025 - Aug 2025",
      title: "Supervisor - K-Win Technologies",
      description:
        "Coordinated project execution and team activities while supporting Korean education and Pilates platforms, Java API integration, UI performance, and delivery.",
    },
    {
      period: "Mar 2023 - Sep 2025",
      title: "Web Developer - K-Win Technologies",
      description:
        "Developed and maintained ERP, POS, and business management applications, including the Suzuki spare-parts POS and sales platform.",
    },
  ],
  education: {
    degree: "Bachelor of Computer Science",
    institution: "Computer University, Monywa",
    period: "2016 - 2020",
  },
  languages: ["Burmese - Native", "English - Fluent", "Japanese - N5"],
} as const;
