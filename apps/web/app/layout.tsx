import type { Metadata } from "next";
import "./styles.css";
export const metadata: Metadata = { title: "Vidya — Knowledge, deliberately", description: "India's knowledge-first video platform." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
