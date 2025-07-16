import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import { Michroma } from "next/font/google"
const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
})

const Hero = () => {
  return (
    <div className="h-[calc(100vh-64px)] w-full relative bg-green-600">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <img src="/second.jpg" alt="" className="w-64 h-64 rounded-full" />

        <span>
          <Heading
            level="h1"
            className={`text-5xl text-white leading-10  ${michroma.className}`}
          >
            dearborn audio electronics
          </Heading>
          {/* center */}
        </span>
      </div>
    </div>
  )
}

export default Hero
