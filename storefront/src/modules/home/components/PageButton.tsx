"use client"
import Link from "next/link"
import React from "react"
import { HiChevronRight } from "react-icons/hi2"
import styles from "./PageButton.module.css"

interface PageButtonProps {
  icon: React.ReactNode
  label: string
  color: string
  path: string
}

export default function PageButton({
  icon,
  label,
  color,
  path,
}: PageButtonProps) {
  const letters = label.split("")
  return (
    <Link
      className={`${styles.link} uppercase min-w-16 no-underline flex items-center gap-3 px-3 py-1 text-2xl border rounded bg-purple-900`}
      href={path}
    >
      <span className="text-base">{icon}</span>
      <span aria-label={label} className={styles.word}>
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
      <HiChevronRight size={"1rem"} />
    </Link>
  )
}
