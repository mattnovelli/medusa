import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import { VT323, Inter } from "next/font/google"
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
    <div className="h-[calc(100vh-64px)] w-full relative bg-green-700">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <Heading
          level="h1"
          className={`text-2xl font-bold text-white border-2 bg-black border-white hover:text-black hover:bg-white hover:border-black px-2  ${vt323.className}`}
        >
          welcome to the dearborn audio electronix online experience
        </Heading>
        <img src="/second.jpg" alt="" className="w-64 h-64 " />
      </div>
    </div>
  )
}

export default Hero
