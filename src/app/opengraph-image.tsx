import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "La Nuit de l'EFREI · MMXXVI · 28 mai 2026 · La Péniche";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background:
            "linear-gradient(135deg, #001329 0%, #001f3f 60%, #001329 100%)",
          color: "#F5E6D3",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: 6,
            color: "#EAC97B",
            textTransform: "uppercase",
          }}
        >
          <div>FAIT PAR PROM EFREI · MMXXVI</div>
          <div>28 · 05 · 2026</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: 8,
              color: "#EAC97B",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            ·· Le retour, dix ans plus tard ··
          </div>
          <div
            style={{
              fontFamily: "serif",
              fontSize: 152,
              lineHeight: 1,
              letterSpacing: -4,
              color: "#F5E6D3",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>La Nuit</span>
            <span
              style={{
                paddingLeft: 80,
                fontWeight: 700,
                background:
                  "linear-gradient(120deg, #A87509 0%, #D4A437 30%, #FBE9B6 50%, #D4A437 70%, #6B4A07 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              de l&apos;EFREI
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 32,
            borderTop: "1px solid rgba(212, 164, 55, 0.4)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 24,
              color: "rgba(245, 230, 211, 0.7)",
            }}
          >
            <div style={{ fontFamily: "serif", fontSize: 36, color: "#F5E6D3" }}>
              La Péniche
            </div>
            <div>2 quai de la Tournelle · Paris V · 22h → 04h</div>
          </div>
          <div
            style={{
              fontSize: 22,
              fontFamily: "monospace",
              letterSpacing: 6,
              color: "#EAC97B",
              textTransform: "uppercase",
            }}
          >
            2016 · → · 2026
          </div>
        </div>
      </div>
    ),
    size,
  );
}
