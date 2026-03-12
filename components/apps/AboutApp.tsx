"use client";

import Image from "next/image";
import { MapPin, GraduationCap } from "lucide-react";

export default function AboutApp() {
  return (
    <div
      style={{
        padding: "32px",
        height: "100%",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      {/* Profile section */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div
          style={{
            position: "relative",
            width: 96,
            height: 96,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            border: "2px solid rgba(255,255,255,0.15)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          <Image
            src="/profile.jpg"
            alt="Eyad Ahmed"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.5px",
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            Eyad Ahmed
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.55)",
              marginTop: 4,
              fontWeight: 400,
            }}
          >
            Social Media Specialist & Marketing Expert
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginTop: 8,
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
            }}
          >
            <MapPin size={12} />
            <span>Cairo, Egypt</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

      {/* Bio */}
      <div>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.75)",
            fontWeight: 400,
          }}
        >
          Mass Communication student passionate about digital marketing, social media strategy,
          and brand communication. Experienced in managing targeted campaigns and using
          data-driven insights to significantly boost engagement. Eager to contribute creative
          and analytical skills to dynamic marketing teams.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {[
          { label: "Campaigns Managed", value: "10+" },
          { label: "Views Generated", value: "1M+" },
          { label: "Brands Worked With", value: "8+" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: 10,
              padding: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Education note */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 10,
          padding: "14px 16px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <GraduationCap size={18} color="rgba(255,255,255,0.5)" />
        <div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
            Mass Communication Student
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
            Cairo University
          </div>
        </div>
      </div>
    </div>
  );
}
