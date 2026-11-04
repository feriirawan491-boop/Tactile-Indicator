import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
export function GET(request: NextRequest) {
  const title = (
    request.nextUrl.searchParams.get("title") || "Tactile Indicator"
  ).slice(0, 150);
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 70,
        background: "#0a0a0a",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 26, letterSpacing: 6 }}>
        TACTILE INDICATOR
      </div>
      <div
        style={{
          display: "flex",
          fontSize: title.length > 70 ? 52 : 68,
          lineHeight: 1.12,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#d4d4d4" }}>
        GUIDING · WARNING · STAINLESS STEEL
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
