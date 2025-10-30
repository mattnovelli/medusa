"use client"
import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import { getBaseURL } from "@lib/util/env"
import Marquee from "./marquee"
import PageButton from "@modules/home/components/PageButton"
import { FaClipboardList, FaDraftingCompass, FaWrench } from "react-icons/fa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Wordmark from "@modules/home/components/logos/wordmark"
import { FaPersonRays } from "react-icons/fa6"
import SideMenu from "@modules/layout/components/side-menu"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import Link from "next/link"
import { usePathname } from "next/navigation"

// export const metadata: Metadata = {
//   metadataBase: new URL(getBaseURL()),
// }

export default function PageLayout(props: { children: React.ReactNode }) {
  // const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const pathname = usePathname()

  return (
    <div className=" grid grid-rows-[auto_1fr] text-white max-w-screen-xl mx-auto ">
      {/* <Nav /> */}
      <div className="sticky top-0 grid grid-cols-3 md:grid-cols-10 grid-rows-1 items-center text-white py-4 border-b border-dotted border-1 border-white bg-green-950 z-20">
        <div className="flex md:hidden h-full justify-start">
          <SideMenu />
        </div>
        <Link
          className="size-12 hover:text-yellow flex items-center justify-center justify-self-center col-start-2 md:col-start-auto md:col-span-2"
          href="/"
        >
          <Wordmark />
        </Link>
        <PageButton
          className={`hidden md:flex justify-self-center hover:bg-yellow-600 hover:text-black col-span-2 ${
            pathname === "/" ? "!bg-yellow-600 !text-black" : ""
          }`}
          icon={<FaPersonRays />}
          label="About"
          color="yellow"
          path="/"
          background={false}
        />
        <PageButton
          className={`hidden md:flex justify-self-center hover:bg-red-600 hover:text-black col-span-2 ${
            pathname === "/repairs" ? "!bg-red-600 !text-black" : ""
          }`}
          icon={<FaWrench />}
          label="Repairs"
          color="yellow"
          path="/repairs"
          background={false}
        />

        <PageButton
          className={`hidden md:flex justify-self-center hover:bg-orange-600  hover:text-black col-span-2 ${
            pathname === "/design" ? "!bg-orange-600 !text-black" : ""
          }`}
          icon={<FaDraftingCompass />}
          label="Design"
          color="purple-900"
          path="/design"
          background={false}
        />
        <PageButton
          className={`hidden md:flex justify-self-center hover:bg-green-600 hover:text-black col-span-2 ${
            pathname === "/survey" ? "!bg-green-600 !text-black" : ""
          }`}
          icon={<FaClipboardList />}
          label="Survey"
          color="yellow"
          path="/survey"
          background={false}
        />
      </div>
      <div className="p-1 md:p-0">{props.children}</div>
    </div>
  )
}
