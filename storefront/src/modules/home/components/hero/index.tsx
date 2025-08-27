import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Marquee from "app/[countryCode]/(main)/marquee"
import { VT323, Inter } from "next/font/google"
import styles from "./index.module.css"
const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
})

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
})

const Hero = () => {
  return (
    <>
      <div
        className={`md:h-[calc(100vh-104px)] h-auto w-full relative bg-green-800 place-items-center p-8 gap-12 flex flex-col md:flex-row items-center justify-center ${styles.bg}`}
      >
        {/* <div className="flex flex-col gap-4 items-center justify-center w-full md:w-1/2"> */}
        <img
          src="/db.jpg"
          alt="A photo of Dearborn next to an electronics bench, looking mischevious."
          className={`${vt323.className} max-h-[28rem] w-auto object-cover color-white rounded-lg shadow-lg`}
        />
        {/* </div> */}
        <div className="color-white text-2xl flex flex-col gap-4 text-white w-full md:w-1/2">
          <span className="flex flex-row flex-wrap gap-2 items-baseline">
            <h1 className="text-5xl font-bold bg-black px-2">Dearborn Plys</h1>
            <h2 className="text-2xl font-bold">(they/them)</h2>
          </span>

          <p>
            is a hardware engineer based in Urbana, Illinois designing guitar
            pedals and creating music.
          </p>
          <p>
            <a href="/survey" className="underline font-bold font-2xl">
              Take the survey!
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Hero
