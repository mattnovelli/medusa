"use client"
import Link from "next/link"
import React from "react"
import { HiChevronRight } from "react-icons/hi2"
import styles from "./PageButton.module.css"
import { VT323 } from "next/font/google"

interface PageButtonProps {
  icon: React.ReactNode
  label: string
  color: string
  path: string
  background: boolean
  className?: string
  onClick?: () => void
}

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
})
export default function PageButton({
  icon,
  label,
  color,
  path,
  background,
  className,
  onClick,
}: PageButtonProps) {
  const letters = label.split("")
  return (
    <Link
      className={`uppercase w-fit h-auto  justify-center flex flex-row flex-nowrap items-center text-nowrap no-underline gap-3 px-3  text-2xl  ${
        background
          ? "bg-purple-900 border rounded " + styles.button
          : "bg-transparent " + styles.link
      } ${className || ""}`}
      href={path}
      onClick={onClick}
    >
      <span className="text-base">{icon}</span>
      <span aria-label={label} className={styles.word + " " + vt323.className}>
        {letters.map((ch, i) => (
          <span
            key={i}
            className={styles.letter}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
      {background && <HiChevronRight size={"1rem"} />}
    </Link>
  )
}
