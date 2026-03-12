"use client";

import { useState } from "react";
import { Mail, Linkedin, Copy, CheckCircle, MapPin } from "lucide-react";

export default function ContactApp() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("aeyad4798@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        padding: "40px 32px",
        height: "100%",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        textAlign: "center",
      }}
    >
      {/* Header */}
      <div>
        <div style={{ fontSize: 40, marginBottom: 12 }}>👋</div>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.3px",
            marginBottom: 8,
          }}
        >
          Let&apos;s Work Together
        </h2>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            maxWidth: 320,
            lineHeight: 1.6,
          }}
        >
          Whether you have a campaign in mind, need a brand strategy, or just want to connect — reach out.
        </p>
      </div>

      {/* Location */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: "rgba(255,255,255,0.4)",
          fontSize: 12,
        }}
      >
        <MapPin size={13} />
        Cairo, Egypt
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", width: "100%", maxWidth: 380 }} />

      {/* Contact options */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: "100%",
          maxWidth: 380,
        }}
      >
        {/* Email */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 12,
            padding: "14px 16px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "rgba(234,88,12,0.15)",
                border: "1px solid rgba(234,88,12,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Mail size={16} color="#f97316" />
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>
                Email
              </div>
              <div style={{ fontSize: 13, color: "#fff" }}>aeyad4798@gmail.com</div>
            </div>
          </div>
          <button
            onClick={copyEmail}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8,
              padding: "6px 10px",
              cursor: "pointer",
              color: copied ? "#22c55e" : "rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              transition: "all 0.2s",
            }}
          >
            {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/eyad-ahmed-0733852b9/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 12,
            padding: "14px 16px",
            border: "1px solid rgba(255,255,255,0.1)",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(10,102,194,0.12)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(10,102,194,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "rgba(10,102,194,0.15)",
              border: "1px solid rgba(10,102,194,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Linkedin size={16} color="#0a66c2" />
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>
              LinkedIn
            </div>
            <div style={{ fontSize: 13, color: "#fff" }}>Eyad Ahmed</div>
          </div>
        </a>
      </div>

      {/* CTA */}
      <a
        href="mailto:aeyad4798@gmail.com"
        style={{
          background: "#fff",
          color: "#000",
          border: "none",
          borderRadius: 24,
          padding: "12px 32px",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          textDecoration: "none",
          transition: "opacity 0.2s",
          display: "inline-block",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
      >
        Send a Message
      </a>
    </div>
  );
}
