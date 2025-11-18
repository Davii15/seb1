import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kagumo Downloader Site - SEB Browser Download",
  description:
    "Download SEB Browser for secure examination environments. Official download site for Kagumo Teachers College.",
  generator: "v0.app",
  keywords: ["SEB Browser", "Secure Exam Browser", "Kagumo Teachers College", "Download", "Education"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
