import localFont from "next/font/local";

export const darkmode = localFont({
  src: [
    { path: "./fonts/DarkmodeOn-Th.ttf", weight: "200", style: "normal" },
    { path: "./fonts/DarkmodeOn-Lt.ttf", weight: "300", style: "normal" },
    { path: "./fonts/DarkmodeOn-Rg.ttf", weight: "400", style: "normal" },
    { path: "./fonts/DarkmodeOn-Md.ttf", weight: "500", style: "normal" },
    { path: "./fonts/DarkmodeOn-SBd.ttf", weight: "600", style: "normal" },
    { path: "./fonts/DarkmodeOn-Bd.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-darkmode",
  display: "swap",
});

export const monaco = localFont({
  src: [{ path: "./fonts/Monaco.woff2", weight: "400", style: "normal" }],
  variable: "--font-monaco",
  display: "swap",
});
