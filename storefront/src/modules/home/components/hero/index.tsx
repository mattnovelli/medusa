import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Marquee from "app/(main)/marquee"
import { VT323, Inter, Montserrat, Michroma } from "next/font/google"
import styles from "./index.module.css"
import Image from "next/image"
import React from "react"
import PageButton from "../PageButton"

import { FaClipboardList, FaDraftingCompass, FaWrench } from "react-icons/fa"
import { FaPersonRays } from "react-icons/fa6"

const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
})

/**
 * Renders text where each letter receives an alternating custom underline color.
 * Underline is drawn via a pseudo-element so the text color can remain unchanged.
 */
export const AlternatingUnderlineLink: React.FC<{
  href: string
  text: string
}> = ({ href, text }) => {
  const letters = Array.from(text)
  const colorClasses = ["border-red-600", "border-black"]
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold inline-flex no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
    >
      {letters.map((ch, i) => {
        if (ch === " ") {
          return <span key={i} className="inline-block w-2" />
        }
        return (
          <span
            key={i}
            className={`inline-block border-b-2 ${
              colorClasses[i % 2]
            } border-solid no-underline leading-none`}
          >
            {ch}
          </span>
        )
      })}
    </a>
  )
}

const Hero = () => {
  return (
    <div className=" w-full flex flex-col items-center justify-center ">
      <div
        className={` w-full relative  place-items-center md:max-w-4xl md:p-8  gap-6 grid grid-cols-1 md:grid-cols-[1fr_2fr] grid-rows-1 items-start  justify-center ${styles.bg}`}
      >
        <picture>
          <source srcSet="/db.webp" type="image/webp" />
          <source srcSet="/db.jpeg" type="image/jpeg" />
          <img
            className={`w-auto object-cover color-white rounded-lg shadow-lg`}
            src="/db.jpeg"
            alt="A photo of Dearborn next to an electronics bench, looking mischevious."
          />
        </picture>

        <div
          className={`md:gap-3 color-white text-2xl flex flex-col text-white w-full col-span-1 mt-auto `}
        >
          <h1
            className={`${michroma.className} -translate-y-16 md:translate-y-0  text-5xl font-bold text-shadow-md`}
          >
            Dearborn Plys
          </h1>
          {/* <h3 className={`${michroma.className} text-2xl font-bold`}>
            they/them
          </h3> */}
          {/* <div
            className={` lg:overflow-y-auto md:overflow-y-auto text-2xl md:h-[100%] pr-2 flex flex-col gap-4`}
          > */}
          <p>
            Hello! It's very nice to meet you. I'm Dearborn Plys (they/them), a
            hardware engineer, vocalist, and guitar player based in Urbana,
            Illinois.
          </p>
          <p>
            Dearborn Audio Effects is my project to create strange and wonderful
            soundmaking devices. Pedal effects and stylized microphones are on
            my mind, so that's what you can expect to see in the near future.
          </p>
          {/* <p>
              I started playing riot grrl and messing with pedals in high
              school, and proceeded to study Electrical Engineering at the
              University of Illinois at Urbana-Champaign. I've worked as an
              engineer for{" "}
              <AlternatingUnderlineLink
                href="https://www.hakenaudio.com/"
                text="Haken Audio"
              />
              , building hyper-sensitive synthesizers, programming UI, and
              providing technical support to customers. I've organized shows,
              run sound live on air for WEFT Sessions, Twitch streamed myself
              producing, and repaired everything I could get my hands on.
            </p>

            <p>
              I want pedals to be for everyone, regardless of instrument!
              Vocalists, wind players, guitarists and synth players are all on
              my mind when creating a new device. Let's all turn knobs and click
              switches together.
            </p>

            <p>
              Looking for help with an audio design project? I have experience
              in PCB layout, circuit design, and firmware. Send me an email at{" "}
              <a href="mailto:dearborn@dearborn.cool">dearborn@dearborn.cool</a>
            </p>
            <p>
              Looking for repairs locally? Send me an email at{" "}
              <a href="mailto:repair@dearborn.cool">repair@dearborn.cool</a>
            </p> */}

          {/* <a href="/survey" className=" font-bold font-2xl">
              Tell me what you want, or else ...
            </a> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default Hero
