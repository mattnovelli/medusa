"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import PageButton from "@modules/home/components/PageButton"
import { FaClipboardList, FaDraftingCompass, FaWrench } from "react-icons/fa"
import { FaPersonRays } from "react-icons/fa6"
import { GiHamburgerMenu } from "react-icons/gi"

const SideMenuItems = {
  Home: "/",
  Survey: "/survey",
  // About: "/about",
  // Store: "/store",
  // Search: "/search",
  // Account: "/account",
  // Cart: "/cart",
}

const SideMenu = () => {
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  aria-label="Menu"
                  className="relative h-full pl-5 flex items-center focus:outline-none "
                >
                  <GiHamburgerMenu size={"2rem"} />
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="fixed inset-0 z-30 flex flex-col backdrop-blur-2xl">
                  {/* Full screen menu content */}
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full w-full bg-[rgba(3,7,18,0.5)] p-6 text-ui-fg-on-color"
                  >
                    <div className="flex justify-end" id="xmark">
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        className="p-2 hover:bg-white/10 rounded-md transition-colors"
                      >
                        <XMark />
                      </button>
                    </div>

                    {/* Centered menu items */}
                    <div className="flex-1 flex items-center justify-center">
                      <ul className="flex flex-col gap-6 items-center">
                        <li>
                          <PageButton
                            icon={<FaPersonRays />}
                            label="About"
                            color="yellow"
                            path="/"
                            onClick={close}
                            background={false}
                          />
                        </li>
                        <li>
                          <PageButton
                            icon={<FaWrench />}
                            label="Repairs"
                            color="yellow"
                            path="/repairs"
                            onClick={close}
                            background={false}
                          />
                        </li>
                        <li>
                          <PageButton
                            icon={<FaDraftingCompass />}
                            label="Design"
                            color="purple-900"
                            path="/design"
                            onClick={close}
                            background={false}
                          />
                        </li>
                        <li>
                          <PageButton
                            icon={<FaClipboardList />}
                            label="Survey"
                            color="yellow"
                            path="/survey"
                            onClick={close}
                            background={false}
                          />
                        </li>
                      </ul>
                    </div>

                    {/* Copyright at bottom */}
                    <div className="flex justify-center">
                      <Text className="text-center txt-compact-small">
                        © {new Date().getFullYear()} Dearborn Audio Effects
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
