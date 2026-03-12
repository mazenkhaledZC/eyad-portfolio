"use client";

const jobs = [
  {
    role: "Marketing Vice President",
    company: "Enactus Cairo University",
    period: "Oct 2025 – Present",
    color: "#3b82f6",
    bullets: [
      "Led marketing strategy across all organizational initiatives, managing a team of 4 leaders and 30 members.",
      "Launched first major campaign achieving 700K+ views, significantly boosting brand awareness.",
      "Executed second campaign reaching 300K+ views, maintaining strong audience engagement.",
      "Conducted market research for 5 projects using innovative automation techniques.",
    ],
  },
  {
    role: "Freelance Branding & Content Specialist",
    company: "Duaya",
    period: "Feb 2026 – Mar 2026",
    color: "#a855f7",
    bullets: [
      "Developed full brand identity for the company's newspaper, including visual guidelines and tone of voice.",
      "Built content automation workflows to streamline production and ensure consistent publishing.",
      "Created and managed design assets aligned with brand identity across digital platforms.",
    ],
  },
  {
    role: "Marketing Specialist Intern",
    company: "Career 180",
    period: "Aug 2025 – Nov 2025",
    color: "#22c55e",
    bullets: [
      "Analyzed budgets and performance metrics for 5 client accounts, identifying optimization opportunities.",
      "Monitored and evaluated campaign performance, providing strategic recommendations to improve ROI.",
      "Served as Social Media Team Leader for 2 mega events: Banking & Fintech Summit and Her Mark.",
    ],
  },
  {
    role: "Content Creator",
    company: "Marqity Agency",
    period: "Jun 2025 – Aug 2025",
    color: "#f97316",
    bullets: [
      "Developed creative content strategies for clients across various industries.",
      "Produced high-quality visual and written content (reels, posts, stories), achieving up to 40% increase in interaction rates.",
      "Collaborated with design and marketing teams to execute trend-aligned campaigns.",
    ],
  },
  {
    role: "Content Creator",
    company: "Connect Agency",
    period: "Jul 2025 – Sep 2025",
    color: "#ec4899",
    bullets: [
      "Created engaging content for sports retail clients, tailoring visuals and copy to athletic and lifestyle audiences.",
      "Developed platform-specific posts, reels, and stories aligned with brand identity.",
      "Contributed to content calendars and campaign planning within a fast-paced agency environment.",
    ],
  },
  {
    role: "Social Media Team Member",
    company: "Enactus Cairo University",
    period: "Dec 2024 – Oct 2025",
    color: "#3b82f6",
    bullets: [
      "Designed visually appealing graphics, infographics, and promotional materials.",
      "Analyzed engagement metrics to refine content strategies and improve campaign outcomes.",
      "Managed social media campaigns, enhancing audience engagement through strategic scheduling.",
    ],
  },
  {
    role: "Digital Marketing Intern",
    company: "Banque Misr",
    period: "Nov 2024",
    color: "#eab308",
    bullets: [
      "Enhanced website visibility by applying keyword research and analytics tools to support SEO efforts.",
      "Managed social media campaigns and conducted audience research to develop targeted demographic personas.",
    ],
  },
  {
    role: "Marketing & Public Relations Representative",
    company: "Minders",
    period: "Feb 2024 – Oct 2024",
    color: "#14b8a6",
    bullets: [
      "Developed and executed integrated marketing campaigns combining print, digital, and PR strategies.",
      "Collaborated with influencers and partners to boost campaign reach and engagement.",
      "Crafted compelling press releases and social media content to engage audiences and media effectively.",
    ],
  },
  {
    role: "Internship Trainee",
    company: "CIB Egypt",
    period: "Sep 2024",
    color: "#6366f1",
    bullets: [
      "Applied digital marketing techniques including keyword optimization and analytics tracking.",
      "Strengthened soft skills: collaboration, time management, problem-solving, and adaptability.",
    ],
  },
];

export default function ExperienceApp() {
  return (
    <div style={{ padding: "24px 28px", color: "#fff" }}>
      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          marginBottom: 24,
          color: "rgba(255,255,255,0.9)",
          letterSpacing: "-0.3px",
        }}
      >
        Work Experience
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
        {/* Timeline line */}
        <div
          style={{
            position: "absolute",
            left: 7,
            top: 8,
            bottom: 8,
            width: 1,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
          }}
        />

        {jobs.map((job, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 20,
              paddingBottom: i < jobs.length - 1 ? 24 : 0,
            }}
          >
            {/* Dot */}
            <div style={{ flexShrink: 0, paddingTop: 4 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: job.color,
                  border: "2px solid rgba(20,20,25,0.9)",
                  boxShadow: `0 0 8px ${job.color}88`,
                  zIndex: 1,
                  position: "relative",
                }}
              />
            </div>

            {/* Content */}
            <div
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                borderRadius: 10,
                padding: "14px 16px",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 4,
                  marginBottom: 8,
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{job.role}</div>
                  <div
                    style={{ fontSize: 12, color: job.color, marginTop: 2, fontWeight: 500 }}
                  >
                    {job.company}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    background: "rgba(255,255,255,0.06)",
                    padding: "3px 8px",
                    borderRadius: 20,
                    flexShrink: 0,
                  }}
                >
                  {job.period}
                </div>
              </div>

              <ul style={{ margin: 0, paddingLeft: 14 }}>
                {job.bullets.map((b, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.6,
                      marginBottom: j < job.bullets.length - 1 ? 4 : 0,
                    }}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
