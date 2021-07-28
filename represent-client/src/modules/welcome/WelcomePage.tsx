import { Button } from "@material-ui/core"
import { FocusedLayout } from "@/components/layouts/FocusedLayout"
import React from "react"
import { useRouter } from "next/router"
import { useUserStore } from "@/stores/user/useUserStore"

export const WelcomePage = () => {
  const { saveSettings } = useUserStore()
  const { replace } = useRouter()

  function handleContinue() {
    saveSettings({ hasSeenWelcome: true })
    replace("/")
  }
  return (
    <FocusedLayout title="Welcome">
      <section className="pr-4 pl-4 mt-5">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Welcome to Represent</h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          We aim to give you upfront information about what your elected officials are doing on your behalf. Represent presents information about what&apos;s happening in the house
          and senate.
        </p>

        <h2 className="text-l mt-6 font-semibold text-gray-800 dark:text-gray-200">Getting Started</h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">1. You can keep up with what votes have recently been voted on in Congress by clicking on the votes tab.</p>
        <p className="mt-2 text-gray-600 dark:text-gray-400 mb-20">
          2. Take a look at the representatives tab where you can see who your reprenatives are and how they&apos;ve been voting. You can also find useful links to get more
          information about what they are doing.
        </p>
        <Button variant="contained" color="primary" fullWidth onClick={handleContinue}>
          Continue
        </Button>
      </section>
    </FocusedLayout>
  )
}
