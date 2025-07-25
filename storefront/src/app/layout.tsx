import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { VT323 } from "next/font/google"

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={vt323.className}>
      <meta name="apple-mobile-web-app-title" content="DBAE" />
      <body>
        <audio src="/music.mp3" loop autoPlay className="hidden" />
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
