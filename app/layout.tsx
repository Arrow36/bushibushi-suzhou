import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "不时不食｜苏州时令风物志",
  description: "沿着月份与节气，遇见苏州一年里的鲜果、湖鲜、蔬食与节令味道。",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
