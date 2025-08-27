import { permanentRedirect } from "next/navigation"

export default function SurveyLink() {
  return permanentRedirect(
    "https://docs.google.com/forms/d/e/1FAIpQLSeY9IQd2oNA2EChE8ZuaT80xuexMGbp6DlHF5fluag2KI7hYA/viewform"
  )
}
