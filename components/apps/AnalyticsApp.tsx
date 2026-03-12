"use client";

export default function AnalyticsApp() {
  return (
    <div style={{ padding: "24px 28px", color: "#fff" }}>
      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          marginBottom: 6,
          color: "rgba(255,255,255,0.9)",
          letterSpacing: "-0.3px",
        }}
      >
        Analytics Case Study
      </h2>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
        Enactus Cairo University — Social Media Performance Analysis (Nov 13–30, 2025)
      </p>

      {/* Executive summary */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(59,130,246,0.08))",
          borderRadius: 12,
          padding: "16px 20px",
          border: "1px solid rgba(168,85,247,0.2)",
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
          Executive Summary
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
          Significant surge in social media performance during the campaign period. Instagram
          generated <strong>3.9x more views</strong> than Facebook, driven by 100% organic
          reach — zero paid ads.
        </p>
      </div>

      {/* Platform stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {/* Facebook */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: 12,
            padding: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#3b82f6",
              fontWeight: 600,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>📘</span> Facebook
          </div>
          {[
            { label: "Total Views", value: "85,800", change: "+100.4%" },
            { label: "Interactions", value: "1,300", change: "+367.9%" },
            { label: "3s Video Views", value: "↑", change: "+10,100%" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0",
                borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{stat.label}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{stat.value}</div>
                <div style={{ fontSize: 10, color: "#22c55e" }}>{stat.change}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: 12,
            padding: "16px",
            border: "1px solid rgba(168,85,247,0.2)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#a855f7",
              fontWeight: 600,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>📸</span> Instagram
          </div>
          {[
            { label: "Total Views", value: "332,900", change: "+1,100%" },
            { label: "Reach", value: "91,900", change: "+11,000%" },
            { label: "Interactions", value: "11,500", change: "+9,400%" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0",
                borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{stat.label}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{stat.value}</div>
                <div style={{ fontSize: 10, color: "#22c55e" }}>{stat.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Viral post highlight */}
      <div
        style={{
          background: "rgba(168,85,247,0.08)",
          borderRadius: 12,
          padding: "14px 16px",
          border: "1px solid rgba(168,85,247,0.15)",
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
          Viral Post Highlight
        </div>
        <div style={{ fontSize: 13, color: "#fff", fontWeight: 500, marginBottom: 4 }}>
          "Presentation team struggles — Apply..."
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            { label: "Views", value: "159.6K" },
            { label: "Shares", value: "2,700" },
            { label: "Engagement Rate", value: "3.45%" },
          ].map((m) => (
            <div key={m.label}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#a855f7" }}>{m.value}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Key Recommendations
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            "Double down on Instagram Reels and relatable content",
            "Invest in Instagram over Facebook for audience growth",
            "Increase Reels on Facebook — underutilized format",
            "Maintain coordinated cross-platform content calendar",
            "Leverage share economy on Instagram for organic virality",
          ].map((rec, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                fontSize: 12,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              <span style={{ color: "#22c55e", flexShrink: 0, marginTop: 1 }}>→</span>
              {rec}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
