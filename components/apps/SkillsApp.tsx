"use client";

import { useState, useEffect } from "react";

const skills = [
  { name: "Social Media Marketing", category: "Marketing" },
  { name: "Content Writing & Copywriting", category: "Content" },
  { name: "Script Writing", category: "Content" },
  { name: "Graphic Design", category: "Design" },
  { name: "Branding", category: "Design" },
  { name: "Content Automation", category: "Tech" },
  { name: "Media Planning", category: "Marketing" },
  { name: "Marketing Strategies", category: "Marketing" },
  { name: "Data Literacy & Analytics", category: "Tech" },
  { name: "Market Research", category: "Tech" },
  { name: "Team Leadership", category: "Leadership" },
  { name: "Event Planning", category: "Leadership" },
];

const categoryColors: Record<string, string> = {
  Marketing: "#3b82f6",
  Content: "#a855f7",
  Design: "#ec4899",
  Tech: "#22c55e",
  Leadership: "#f97316",
};

const lines = [
  { text: "eyad@portfolio ~ % whoami", delay: 0 },
  { text: "Eyad Ahmed — Social Media Specialist & Marketing Expert", delay: 300, indent: true },
  { text: "", delay: 400 },
  { text: "eyad@portfolio ~ % skills --list", delay: 700 },
  { text: "Loading skill set...", delay: 1000, dim: true },
  { text: "", delay: 1100 },
];

export default function SkillsApp() {
  const [shown, setShown] = useState(0);
  const [skillsVisible, setSkillsVisible] = useState(false);

  useEffect(() => {
    if (shown < lines.length) {
      const t = setTimeout(() => setShown((s) => s + 1), lines[shown]?.delay ?? 200);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setSkillsVisible(true), 200);
      return () => clearTimeout(t);
    }
  }, [shown]);

  return (
    <div
      style={{
        padding: "24px",
        height: "100%",
        fontFamily: "'SF Mono', 'Monaco', 'Courier New', monospace",
        color: "#e8e8e8",
        fontSize: 13,
        lineHeight: 1.7,
      }}
    >
      {lines.slice(0, shown).map((line, i) => (
        <div
          key={i}
          style={{
            color: line.indent
              ? "rgba(255,255,255,0.7)"
              : line.dim
              ? "rgba(255,255,255,0.4)"
              : line.text.startsWith("eyad@")
              ? "#22c55e"
              : "#e8e8e8",
            paddingLeft: line.indent ? 16 : 0,
          }}
        >
          {line.text}
        </div>
      ))}

      {shown >= lines.length && (
        <>
          <div style={{ color: "#22c55e", marginBottom: 16 }}>
            ✓ Found {skills.length} skills
          </div>

          {skillsVisible && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 8,
              }}
            >
              {skills.map((skill, i) => (
                <div
                  key={i}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontFamily: "sans-serif",
                    fontWeight: 500,
                    background: `${categoryColors[skill.category]}18`,
                    border: `1px solid ${categoryColors[skill.category]}44`,
                    color: categoryColors[skill.category],
                    animation: "fadeIn 0.3s ease both",
                    animationDelay: `${i * 60}ms`,
                  }}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          )}

          {skillsVisible && (
            <div style={{ marginTop: 28 }}>
              <div style={{ color: "rgba(255,255,255,0.3)", marginBottom: 10, fontSize: 11 }}>
                — categories —
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                {Object.entries(categoryColors).map(([cat, color]) => (
                  <div
                    key={cat}
                    style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: color,
                        boxShadow: `0 0 6px ${color}`,
                      }}
                    />
                    <span style={{ color: "rgba(255,255,255,0.5)", fontFamily: "sans-serif" }}>
                      {cat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 20, color: "#22c55e" }}>
            eyad@portfolio ~ % <span style={{ animation: "blink 1s infinite" }}>▌</span>
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
