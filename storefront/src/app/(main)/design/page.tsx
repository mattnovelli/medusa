import { Metadata } from "next"
import { Lexend } from "next/font/google"

export const metadata: Metadata = {
  title: "Design",
}

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
})

export default function DesignPage() {
  return (
    <div className="text-xl p-4 grid grid-rows-1 md:gap-8 md:grid-cols-3  grid-cols-1">
      <h1
        className={`${lexend.className} text-3xl font-semibold md:text-5xl  md:text-right`}
      >
        Design Services
      </h1>
      <div className="col-span-2">
        <p className={` my-2`}>
          Looking for help making your next guitar pedal, synthesizer, sound
          installation, or mysterious audio gizmo that exceeds current
          understanding and imagination?
        </p>
        <p>My design services include: </p>
        <ul className="list-disc ml-6 m-6">
          <li>PCB layout and prototyping</li>
          <li>Analog and digital circuit design</li>
          <li>Firmware development</li>
          <li>
            Technical assistance for sound installations (e.g. Max,
            SuperCollider, custom hardware)
          </li>
        </ul>
        <p>
          I'm passionate about bringing musical creations to life! For more
          information or to set up a chat email me at{" "}
          <a href="mailto:dearborn@dearborn.cool">dearborn@dearborn.cool</a>
        </p>
      </div>
    </div>
  )
}
