import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { Michroma, VT323 } from "next/font/google"
import Wordmark from "@modules/home/components/logos/wordmark"
import Marquee from "app/[countryCode]/(main)/marquee"
import { FaClipboardList, FaDraftingCompass, FaWrench } from "react-icons/fa"
import PageButton from "@modules/home/components/PageButton"
import { FaPersonRays } from "react-icons/fa6"

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
})

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group text-white">
      <header className="relative h-16 mx-auto duration-200 bg-green-950 ">
        <nav className="content-container w-full h-full  flex items-center">
          {/* Left section: mobile SideMenu OR first two desktop buttons */}
          <div className="flex items-center md:flex-1 h-full">
            <div className="flex md:hidden h-full items-center">
              <SideMenu regions={regions} />
            </div>
            <div className="hidden md:flex items-center gap-4 flex-1 justify-around h-full">
              <PageButton
                icon={<FaWrench />}
                label="Repairs"
                color="yellow"
                path="/repairs"
                background={false}
              />
              <PageButton
                icon={<FaDraftingCompass />}
                label="Design"
                color="purple-900"
                path="/design"
                background={false}
              />
            </div>
          </div>

          {/* Center logo always (absolute centered on mobile) */}
          <div className="px-14 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:transform-none flex justify-center items-center">
            <LocalizedClientLink
              href="/"
              className="size-12 hover:text-yellow flex items-center justify-center"
              data-testid="nav-store-link"
            >
              <Wordmark />
            </LocalizedClientLink>
          </div>

          {/* Right section: last two desktop buttons */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-around h-full">
            <PageButton
              icon={<FaPersonRays />}
              label="About"
              color="yellow"
              path="/about"
              background={false}
            />
            <PageButton
              icon={<FaClipboardList />}
              label="Survey"
              color="yellow"
              path="/survey"
              background={false}
            />
          </div>

          {/* <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="hover:text-gray-200"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Search
                </LocalizedClientLink>
              )}
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink> 
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div> */}
        </nav>
      </header>
    </div>
  )
}
