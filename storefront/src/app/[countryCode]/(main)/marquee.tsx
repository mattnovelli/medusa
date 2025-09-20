import styles from "./marquee.module.css"
import { Michroma } from "next/font/google"

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
})

export default function Marquee() {
  return (
    <div
      className={`${styles.marquee} ${michroma.className} uppercase bg-green-900`}
    >
      <ul className={styles.marqueeContent}>
        <p>Dearborn Audio Effects</p>
      </ul>
      <ul className={styles.marqueeContent} aria-hidden="true">
        <p>Dearborn Audio Effects</p>
      </ul>
    </div>
  )
}
