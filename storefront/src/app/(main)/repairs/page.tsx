import { DM_Sans, Dosis, Inter, Lexend, Michroma } from "next/font/google"
import { useFormState } from "react-dom"
import { submitRepairRequest } from "../../../helpers/serverFunctions"
import { RepairFormActionResult } from "../../../types/repair"
import { Metadata } from "next"
import RepairsForm from "./form"

export const metadata: Metadata = {
  title: "Repairs",
  description:
    "Request electronics repair services from Dearborn Audio Effects.",
}

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
})

export default function RepairsPage() {
  return (
    <div className="text-xl p-4 grid grid-rows-1 md:gap-8 md:grid-cols-3  grid-cols-1">
      <h1
        className={`${lexend.className} text-3xl font-semibold md:text-5xl  md:text-right`}
      >
        Electronics Repair
      </h1>
      <div className="col-span-2">
        <p className={` my-2`}>
          Located in the Champaign-Urbana area, I offer service on guitar
          pedals, amplifiers, pro audio gear (rack units, synthesizers, etc.),
          and home stereo equipment. If you have a specific custom modification
          in mind I'm open to discuss projects.
        </p>
        <p>
          Looking for a repair? Let me know and I'll get back to you with a
          quote.
        </p>
        <RepairsForm />
      </div>
    </div>
  )
}
