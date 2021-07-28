import Link from "next/link"
import { useRouter } from "next/router"

const BottomNav = () => {
  const router = useRouter()

  return (
    <div className="sm:hidden">
      <nav className="pb-safe w-full bg-gray-100 border-t dark:bg-gray-900 dark:border-gray-800 fixed bottom-0">
        <div className="mx-auto px-6 max-w-md h-16 flex items-center justify-around">
          {links.map(({ href, label, icon }) => (
            <Link key={label} href={href}>
              <a
                className={`space-y-1 w-full h-full flex flex-col items-center justify-center ${
                  router.pathname === href ? "text-indigo-500 dark:text-indigo-400" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                }`}
              >
                {icon}
                <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default BottomNav

const links = [
  {
    label: "Votes",
    href: "/votes",
    icon: (
      <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path
          d="M2.5.5V0H2v.5h.5zm10 0h.5V0h-.5v.5zM4.947 4.724a.5.5 0 00-.894-.448l.894.448zM2.5 8.494l-.447-.223-.146.293.21.251.383-.32zm5 5.997l-.384.32a.5.5 0 00.769 0l-.385-.32zm5-5.996l.384.32.21-.251-.146-.293-.447.224zm-1.553-4.219a.5.5 0 00-.894.448l.894-.448zM8 9.494v-.5H7v.5h1zm-.5-4.497A4.498 4.498 0 013 .5H2a5.498 5.498 0 005.5 5.497v-1zM2.5 1h10V0h-10v1zM12 .5a4.498 4.498 0 01-4.5 4.497v1c3.038 0 5.5-2.46 5.5-5.497h-1zM4.053 4.276l-2 3.995.895.448 2-3.995-.895-.448zM2.116 8.815l5 5.996.769-.64-5-5.996-.769.64zm5.768 5.996l5-5.996-.768-.64-5 5.996.769.64zm5.064-6.54l-2-3.995-.895.448 2 3.995.895-.448zM8 14.49V9.494H7v4.997h1z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Representatives",
    href: "/representatives",
    icon: (
      <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path d="M7.5 15V7m0 .5v3m0-3a4 4 0 00-4-4h-3v3a4 4 0 004 4h3m0-3h3a4 4 0 004-4v-3h-3a4 4 0 00-4 4v3zm0 0l4-4m-4 7l-4-4" stroke="currentColor" />
      </svg>
    ),
  },
]
