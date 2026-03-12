"use client";

import { useState, useRef, useCallback } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Platform = "instagram" | "tiktok" | "facebook";

interface Reel {
  type: "reel" | "post" | "tiktok" | "facebook";
  id: string;
  label: string;
}

interface Company {
  id: string;
  name: string;
  short: string;
  platform: Platform;
  handle: string;
  pageUrl: string | null;
  period: string;
  color: string;
  description: string;
  reels: Reel[];
}

const companies: Company[] = [
  {
    id: "enactus", name: "Enactus Cairo University", short: "Enactus",
    platform: "instagram", handle: "@enactuscairouniversity",
    pageUrl: "https://www.instagram.com/enactuscairouniversity?igsh=bjFlMnVwOHJzM2Qw",
    period: "Mar 2025 – Present", color: "#a855f7",
    description: "Full page management — 700K+ total views. Led as Marketing VP.",
    reels: [
      { type: "reel", id: "DRCzr4PjMtW", label: "Reel #1" },
      { type: "post", id: "DRFdOnmDEsl", label: "Post" },
      { type: "reel", id: "DRVHdxeDeQG", label: "Reel #2" },
      { type: "reel", id: "DSA6R5BDpHu", label: "Reel #3" },
    ],
  },
  {
    id: "banking", name: "Banking & Fintech Summit", short: "B&F Summit",
    platform: "instagram", handle: "@banking.fintech.summit",
    pageUrl: "https://www.instagram.com/banking.fintech.summit?igsh=MTNqa3Q0aTk1ejRvYw%3D%3D",
    period: "Sep – Oct 2025", color: "#22c55e",
    description: "Social Media Team Leader for the mega Banking & Fintech Summit event.",
    reels: [
      { type: "reel", id: "DOl34PYDBbe", label: "Reel #1" },
      { type: "reel", id: "DOrBwx-DMvK", label: "Reel #2" },
      { type: "reel", id: "DPMcZFGCIBg", label: "Reel #3" },
      { type: "reel", id: "DPJt2euDG0L", label: "Reel #4" },
      { type: "reel", id: "DPUIAp9DOlq", label: "Reel #5" },
    ],
  },
  {
    id: "career180", name: "Career 180", short: "Career 180",
    platform: "instagram", handle: "@career.180",
    pageUrl: "https://www.instagram.com/career.180?igsh=anN0emthN256ZTY3",
    period: "Aug – Nov 2025", color: "#3b82f6",
    description: "Content & social media management for career development platform.",
    reels: [
      { type: "reel", id: "DQPTfb6DQ_Q", label: "Reel #1" },
      { type: "reel", id: "DOljzraDKYV", label: "Reel #2" },
    ],
  },
  {
    id: "connect", name: "Connect Agency", short: "Connect",
    platform: "instagram", handle: "@connectagen",
    pageUrl: "https://www.instagram.com/connectagen?igsh=MTN2NGIzdjFqZzZhYQ%3D%3D",
    period: "Jul – Sep 2025", color: "#ec4899",
    description: "Sports retail content — all content on this page created by Eyad.",
    reels: [
      { type: "reel", id: "DH3w3XiID-3", label: "Reel #1" },
      { type: "reel", id: "DLum7MUC6_j", label: "Reel #2" },
    ],
  },
  {
    id: "freelance", name: "Duaya (Freelance)", short: "Freelance",
    platform: "instagram", handle: "Freelance",
    pageUrl: null,
    period: "Feb – Mar 2026", color: "#f97316",
    description: "Branding, content automation, and design assets for freelance clients.",
    reels: [
      { type: "post", id: "DUqguqSDNkC", label: "Brand Post" },
      { type: "reel", id: "DUgWGVyjPkA", label: "Brand Reel" },
    ],
  },
  {
    id: "weevix", name: "Weevix", short: "Weevix",
    platform: "facebook", handle: "Weevix",
    pageUrl: "https://www.facebook.com/profile.php?id=61575751570061&mibextid=wwXIfr",
    period: "2025", color: "#14b8a6",
    description: "Facebook content creation and brand management.",
    reels: [
      { type: "facebook", id: "https://www.facebook.com/share/p/18EtD1e2DK/?mibextid=wwXIfr", label: "Post #1" },
      { type: "facebook", id: "https://www.facebook.com/share/p/1Ebate1jUx/?mibextid=wwXIfr", label: "Post #2" },
    ],
  },
  {
    id: "marqity", name: "Marqity Agency", short: "Marqity",
    platform: "instagram", handle: "@marqity.agency",
    pageUrl: "https://www.instagram.com/marqity.agency?igsh=MW04bXRsYXEwMHd4NA%3D%3D",
    period: "Jun – Aug 2025", color: "#eab308",
    description: "Creative content strategies — 40% avg engagement increase across clients.",
    reels: [],
  },
];

function getEmbedUrl(reel: Reel): string | null {
  if (reel.type === "reel") return `https://www.instagram.com/reel/${reel.id}/embed/?autoplay=1&muted=1`;
  if (reel.type === "post") return `https://www.instagram.com/p/${reel.id}/embed/`;
  return null;
}

function getDirectUrl(reel: Reel): string {
  if (reel.type === "reel") return `https://www.instagram.com/reel/${reel.id}/`;
  if (reel.type === "post") return `https://www.instagram.com/p/${reel.id}/`;
  return reel.id;
}

function ExternalCard({ reel, color }: { reel: Reel; color: string }) {
  const isT = reel.type === "tiktok";
  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 20, padding: 28, textAlign: "center",
      background: `radial-gradient(ellipse at center, ${color}18 0%, transparent 70%)`,
    }}>
      <div style={{ fontSize: 52 }}>{isT ? "🎵" : "👍"}</div>
      <div>
        <div style={{ fontSize: 14, color: "#fff", fontWeight: 600, marginBottom: 6 }}>{reel.label}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 22 }}>
          {isT ? "TikTok — click to watch" : "Facebook post — click to view"}
        </div>
        <a href={getDirectUrl(reel)} target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "10px 22px", borderRadius: 22,
            background: `${color}22`, border: `1px solid ${color}55`,
            color, fontSize: 13, fontWeight: 600, textDecoration: "none",
            transition: "background 0.15s",
          }}
        >
          <ExternalLink size={13} />
          {isT ? "Watch on TikTok" : "View on Facebook"}
        </a>
      </div>
    </div>
  );
}

export default function PortfolioApp() {
  const [selectedId, setSelectedId] = useState("enactus");
  const [index, setIndex] = useState(0);
  const iframeKey = useRef(0);
  const isMobile = useIsMobile();

  const company = companies.find((c) => c.id === selectedId)!;
  const reels = company.reels;

  const selectCompany = useCallback((id: string) => {
    setSelectedId(id);
    setIndex(0);
  }, []);

  const goTo = useCallback((i: number) => {
    iframeKey.current++;
    setIndex(i);
  }, []);

  const current = reels[index];
  const embedUrl = current ? getEmbedUrl(current) : null;
  const isExternal = current && !embedUrl;

  // ── MOBILE LAYOUT ──────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{ color: "#fff", paddingBottom: 20 }}>
        {/* Horizontal company chips */}
        <div style={{
          display: "flex", gap: 8, overflowX: "auto", padding: "14px 14px 10px",
          WebkitOverflowScrolling: "touch", scrollbarWidth: "none",
        }}>
          {companies.map((c) => {
            const active = selectedId === c.id;
            return (
              <button key={c.id} onClick={() => selectCompany(c.id)}
                style={{
                  flexShrink: 0, padding: "6px 14px", borderRadius: 20,
                  border: `1px solid ${c.color}55`,
                  background: active ? c.color : `${c.color}18`,
                  color: active ? "#fff" : c.color,
                  fontSize: 12, fontWeight: active ? 600 : 400,
                  cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
                }}
              >{c.short}</button>
            );
          })}
        </div>

        {/* Company info */}
        <div style={{ padding: "0 14px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: company.color, boxShadow: `0 0 6px ${company.color}` }} />
                <span style={{ fontSize: 13, fontWeight: 600 }}>{company.name}</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, color: company.color }}>{company.handle}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{company.period}</span>
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 5, lineHeight: 1.5 }}>
                {company.description}
              </p>
            </div>
            {company.pageUrl && (
              <a href={company.pageUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 4, flexShrink: 0,
                  padding: "7px 12px", borderRadius: 18,
                  border: `1px solid ${company.color}44`, background: `${company.color}12`,
                  color: company.color, fontSize: 11, fontWeight: 600, textDecoration: "none",
                }}>
                <ExternalLink size={10} /> Page
              </a>
            )}
          </div>
        </div>

        {/* Video */}
        {reels.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>📂</div>
            Visit the page link to view this profile
          </div>
        ) : (
          <div style={{ padding: "14px 14px 0" }}>
            {/* Nav dots */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <button onClick={() => goTo(Math.max(0, index - 1))} disabled={index === 0}
                style={{ background: "none", border: "none", cursor: index === 0 ? "not-allowed" : "pointer", color: index === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)", padding: 4 }}>
                <ChevronLeft size={20} />
              </button>
              <div style={{ display: "flex", gap: 6 }}>
                {reels.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} style={{
                    width: i === index ? 18 : 6, height: 6, padding: 0, borderRadius: 3,
                    border: "none", cursor: "pointer",
                    background: i === index ? company.color : "rgba(255,255,255,0.25)",
                    transition: "all 0.25s",
                  }} />
                ))}
              </div>
              <button onClick={() => goTo(Math.min(reels.length - 1, index + 1))} disabled={index === reels.length - 1}
                style={{ background: "none", border: "none", cursor: index === reels.length - 1 ? "not-allowed" : "pointer", color: index === reels.length - 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)", padding: 4 }}>
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Video frame — full width 9:16 */}
            <div style={{
              width: "100%", aspectRatio: "9/16",
              borderRadius: 16, overflow: "hidden",
              border: `1.5px solid ${company.color}40`,
              background: "#0a0a0f",
              boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 0.5px ${company.color}20`,
            }}>
              {isExternal ? (
                <ExternalCard reel={current} color={company.color} />
              ) : (
                <iframe
                  key={`mobile-${current.id}-${iframeKey.current}`}
                  src={embedUrl!}
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                  scrolling="no"
                  allowTransparency
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
                />
              )}
            </div>

            {/* Link */}
            <a href={getDirectUrl(current)} target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 4, justifyContent: "center",
                marginTop: 12, fontSize: 11, color: "rgba(255,255,255,0.35)", textDecoration: "none",
              }}>
              <ExternalLink size={10} />
              {current.label} — Open on {current.type === "tiktok" ? "TikTok" : current.type === "facebook" ? "Facebook" : "Instagram"}
            </a>
          </div>
        )}
      </div>
    );
  }

  // ── DESKTOP LAYOUT ─────────────────────────────────────────
  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden", color: "#fff" }}>

      {/* ── LEFT SIDEBAR ── */}
      <div style={{
        width: 188, flexShrink: 0,
        borderRight: "1px solid rgba(255,255,255,0.07)",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        background: "rgba(0,0,0,0.25)",
      }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 700, letterSpacing: "0.9px", textTransform: "uppercase", padding: "14px 14px 8px" }}>
          Brands
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "0 6px 10px" }}>
          {companies.map((c) => {
            const active = selectedId === c.id;
            return (
              <button key={c.id} onClick={() => selectCompany(c.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 9,
                  padding: "8px 10px", borderRadius: 8, border: "none",
                  cursor: "pointer", width: "100%", textAlign: "left",
                  background: active ? `${c.color}22` : "transparent",
                  marginBottom: 2,
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                  background: c.color,
                  boxShadow: active ? `0 0 7px ${c.color}` : "none",
                  transition: "box-shadow 0.2s",
                }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: active ? 600 : 400, color: active ? "#fff" : "rgba(255,255,255,0.6)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {c.short}
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", marginTop: 1 }}>
                    {c.reels.length > 0 ? `${c.reels.length} posts` : "Page only"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT CONTENT ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

        {/* Company header */}
        <div style={{
          padding: "12px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: `linear-gradient(135deg, ${company.color}14 0%, transparent 65%)`,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: company.color, boxShadow: `0 0 8px ${company.color}` }} />
                <span style={{ fontSize: 14, fontWeight: 600 }}>{company.name}</span>
                <span style={{
                  fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 9,
                  background: `${company.color}22`, color: company.color,
                  border: `1px solid ${company.color}44`, letterSpacing: "0.4px", textTransform: "uppercase",
                }}>
                  {company.platform}
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, color: company.color }}>{company.handle}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{company.period}</span>
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 4, lineHeight: 1.5, maxWidth: 400 }}>
                {company.description}
              </p>
            </div>
            {company.pageUrl && (
              <a href={company.pageUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "7px 13px", borderRadius: 20,
                  border: `1px solid ${company.color}44`,
                  background: `${company.color}12`, color: company.color,
                  fontSize: 11, fontWeight: 600, textDecoration: "none",
                  whiteSpace: "nowrap", flexShrink: 0, transition: "background 0.15s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = `${company.color}26`)}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = `${company.color}12`)}
              >
                <ExternalLink size={11} /> Open Page
              </a>
            )}
          </div>
        </div>

        {/* Video area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "12px 10px 16px", minHeight: 0, overflow: "hidden" }}>
          {reels.length === 0 ? (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 13, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 40 }}>📂</span>
              <span>No specific posts to embed</span>
              <span style={{ fontSize: 11 }}>Visit the page link to view this profile</span>
            </div>
          ) : (
            <>
              {/* Navigation row */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12, width: "100%" }}>
                {/* Prev */}
                <button onClick={() => goTo(Math.max(0, index - 1))} disabled={index === 0}
                  style={{
                    width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)", cursor: index === 0 ? "not-allowed" : "pointer",
                    color: index === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (index > 0) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)"; }}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"}
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Dots */}
                <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: 6 }}>
                  {reels.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)}
                      style={{
                        width: i === index ? 20 : 7, height: 7, padding: 0,
                        borderRadius: 3.5, border: "none", cursor: "pointer",
                        background: i === index ? company.color : "rgba(255,255,255,0.2)",
                        transition: "all 0.25s",
                      }}
                    />
                  ))}
                </div>

                {/* Next */}
                <button onClick={() => goTo(Math.min(reels.length - 1, index + 1))} disabled={index === reels.length - 1}
                  style={{
                    width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)", cursor: index === reels.length - 1 ? "not-allowed" : "pointer",
                    color: index === reels.length - 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (index < reels.length - 1) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)"; }}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"}
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* The video frame — fills remaining space at 9:16 */}
              <div style={{
                flex: 1, minHeight: 0,
                display: "flex", flexDirection: "column", alignItems: "center",
                width: "100%",
              }}>
                {/* Calculate the max height we have, then derive 9:16 width */}
                <div style={{
                  // Use CSS container queries approach: constrain both by height and by a max width
                  height: "100%",
                  maxWidth: "calc(100% - 20px)",
                  aspectRatio: "9 / 16",
                  position: "relative",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: `1.5px solid ${company.color}40`,
                  background: "#0a0a0f",
                  boxShadow: `0 12px 48px rgba(0,0,0,0.65), 0 0 0 0.5px ${company.color}20`,
                }}>
                  {isExternal ? (
                    <ExternalCard reel={current} color={company.color} />
                  ) : (
                    <iframe
                      key={`${current.id}-${iframeKey.current}`}
                      src={embedUrl!}
                      style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                      scrolling="no"
                      allowTransparency
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
                    />
                  )}
                </div>

                {/* Open link */}
                {current && (
                  <a href={getDirectUrl(current)} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: 4, marginTop: 10,
                      fontSize: 11, color: "rgba(255,255,255,0.3)", textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = company.color)}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)")}
                  >
                    <ExternalLink size={10} />
                    {current.label} — Open on {current.type === "tiktok" ? "TikTok" : current.type === "facebook" ? "Facebook" : "Instagram"}
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
