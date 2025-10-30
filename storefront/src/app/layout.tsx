import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { VT323 } from "next/font/google"

const vt323 = VT323({
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
      className={`${vt323.className} bg-green-950`}
    >
      <meta name="apple-mobile-web-app-title" content="DBAE" />
      <body>
        {/* <audio src="/music.mp3" loop autoPlay className="hidden" /> */}
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
