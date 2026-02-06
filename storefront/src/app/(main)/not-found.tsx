import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)] p-8">
      <h1 className="text-4xl font-bold text-white">Page not found</h1>
      <p className="text-xl text-white">
        The page you tried to access does not exist.
      </p>
      <Link 
        href="/" 
        className="text-blue-400 hover:text-blue-300 underline text-lg"
      >
        Go to homepage
      </Link>
    </div>
  )
}
