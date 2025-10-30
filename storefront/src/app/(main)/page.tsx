import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero, { AlternatingUnderlineLink } from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { Michroma } from "next/font/google"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Dearborn Plys and Dearborn Audio Effects.",
}

const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
})

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <div className="grid md:grid-cols-3 md:grid-rows-1 grid-cols-1 md:p-0 p-2 md:[&>*]:p-4 md:[&>*:not(:first-child)]:border-l md:[&>*:not(:first-child)]:border-dotted ">
      {/* <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div> */}
      <div className="col-span-1">
        <div className="w-full aspect-square overflow-hidden rounded-lg shadow-lg">
          <picture className="w-full h-full">
            <source srcSet="/db.webp" type="image/webp" />
            <source srcSet="/db.jpeg" type="image/jpeg" />
            <img
              src="/db.jpeg"
              alt="A photo of Dearborn next to an electronics bench, looking mischevious."
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
      </div>
      <div className="col-span-2 text-2xl -translate-y-16 md:translate-y-0">
        <h1
          className={`${michroma.className} text-shadow-sm  text-6xl font-bold text-shadow-md`}
        >
          Dearborn Plys
        </h1>

        <p className="mt-6">
          Hello! It's very nice to meet you. I'm Dearborn Plys (they/them), a
          hardware engineer, vocalist, and guitar player based in Urbana,
          Illinois.
        </p>
        <p>
          Dearborn Audio Effects is my project to create strange and wonderful
          soundmaking devices. Pedal effects and stylized microphones are on my
          mind, so that's what you can expect to see in the near future.
        </p>
        <p>
          I started playing riot grrl and messing with pedals in high school,
          and proceeded to study Electrical Engineering at the University of
          Illinois at Urbana-Champaign. I've worked as an engineer for{" "}
          <AlternatingUnderlineLink
            href="https://www.hakenaudio.com/"
            text="Haken Audio"
          />
          , building hyper-sensitive synthesizers, programming UI, and providing
          technical support to customers. I've organized shows, run sound live
          on air for WEFT Sessions, Twitch streamed myself producing, and
          repaired everything I could get my hands on.
        </p>

        <p>
          I want pedals to be for everyone, regardless of instrument! Vocalists,
          wind players, guitarists and synth players are all on my mind when
          creating a new device. Let's all turn knobs and click switches
          together.
        </p>

        <p>
          Looking for help with an audio design project? I have experience in
          PCB layout, circuit design, and firmware. Send me an email at{" "}
          <a href="mailto:dearborn@dearborn.cool">dearborn@dearborn.cool</a>
        </p>
        <p>
          Looking for repairs locally? Send me an email at{" "}
          <a href="mailto:repair@dearborn.cool">repair@dearborn.cool</a>
        </p>
      </div>
    </div>
  )
}
