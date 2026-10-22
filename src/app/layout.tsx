import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Geist, Oswald } from "next/font/google";
import { cookies } from "next/headers";

import { Providers } from "./providers";

const oswald = Oswald({ subsets: ["latin"], weight: ["300", "500"], variable: "--font-oswald", display: "swap" });
const geist = Geist({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
    title: "Export Comments",
    description: "Export, filter and manage your Figma comments and feedback in one place.",
    manifest: "/manifest.json",
    openGraph: {
        title: "Export Comments",
        siteName: "Export Comments",
        type: "website",
        url: "https://exportcomments.io",
        images: [{ url: "https://exportcomments.io/images/Export-Comments.jpg", width: 1920, height: 960 }],
    },
};

export const viewport: Viewport = { themeColor: "#04050a", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const token = (await cookies()).get("userToken")?.value ?? "";
    return (
        <html lang="en" className={`${oswald.variable} ${geist.variable}`}>
            <body className="bg-paper text-body font-sans antialiased">
                <Providers initialToken={token}>{children}</Providers>
            </body>
        </html>
    );
}
