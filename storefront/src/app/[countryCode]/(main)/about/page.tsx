import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { Heading } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "About",
  // description:
  //   "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function AboutPage({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  //   const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      {/* <Hero /> */}
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <Heading level="h1" className="text-center mb-8">
            About Us
          </Heading>
          <p className="text-center mb-4">write some stuff here</p>
        </ul>
      </div>
    </>
  )
}
