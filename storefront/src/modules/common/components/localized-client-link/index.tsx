"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

import { Michroma } from "next/font/google"
const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
})

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  [x: string]: any
}) => {
  const { countryCode } = useParams()

  return (
    <Link
      className={`text-uppercase ${michroma.className}`}
      href={`/${countryCode}${href}`}
      {...props}
    >
      {children}
    </Link>
  )
}

export default LocalizedClientLink
