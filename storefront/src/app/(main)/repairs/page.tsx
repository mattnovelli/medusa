import { Michroma } from "next/font/google"
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

const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
})
export default function RepairsPage() {
  return (
    <div className="text-2xl p-4">
      <h1 className={`${michroma.className} text-xl md:text-6xl`}>
        Electronics Repair
      </h1>
      <p>
        Located in the Champaign-Urbana area, I offer service on guitar pedals,
        amplifiers, pro audio gear (rack units, synthesizers, etc.), and home
        stereo equipment. If you have a specific custom modification in mind I'm
        open to discuss projects. Looking for a repair? Let me know and I'll get
        back to you with a quote.
      </p>
      <RepairsForm />
    </div>
  )
}
