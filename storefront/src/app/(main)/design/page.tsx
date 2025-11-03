import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Design",
}

export default function DesignPage() {
  return (
    <div className="flex p-20 flex-col items-center justify-center  text-white gap-4">
      <img src="/construction.gif" alt="Under Construction" />
    </div>
  )
}
