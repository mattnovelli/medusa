import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { DM_Sans, VT323 } from "next/font/google"

const vt323 = DM_Sans({
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: {
    template: "%s | Dearborn Audio Effects",
    default: "Dearborn Audio Effects",
  },
  description:
    "Custom audio hardware and audio equipment repairs in Champaign-Urbana, IL.",
  metadataBase: new URL("https://dearborn.cool"),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      className={`${vt323.className} tracking-tight bg-green-950`}
    >
      <meta name="apple-mobile-web-app-title" content="DBFX" />
      <meta name="theme-color" content="#052e16" />
      <body className="bg-green-950">
        {/* <audio src="/music.mp3" loop autoPlay className="hidden" /> */}
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
