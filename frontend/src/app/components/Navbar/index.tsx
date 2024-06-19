import { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/shared/routes/routes";
import Image from "next/image";
import { logOutStart } from "@/app/store/slices/auth/authSlices";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logOutStart());
    router.push(ROUTES.LOGIN);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" passHref>
              <div className="text-xl font-bold text-gray-900 transition-transform duration-300 hover:scale-110">
                <Image
                  src={"/logo.png"}
                  alt="Logo"
                  width={50}
                  height={50}
                  draggable="false"
                />
              </div>
            </Link>
            <div className="hidden md:flex ml-10 space-x-4">
              <Link href="/" passHref>
                <div className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 transition duration-300 hover:text-gray-900 hover:bg-gray-100">
                  Home
                </div>
              </Link>
             
              {/* <Link href="/auctions" passHref>
                <div className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 transition duration-300 hover:text-gray-900 hover:bg-gray-100">
                  Auctions
                </div>
              </Link>
              <Link href="/about" passHref>
                <div className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 transition duration-300 hover:text-gray-900 hover:bg-gray-100">
                  About
                </div>
              </Link>
              <Link href="/contact" passHref>
                <div className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 transition duration-300 hover:text-gray-900 hover:bg-gray-100">
                  Contact
                </div>
              </Link> */}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 transition duration-300 hover:text-gray-900 hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href={ROUTES.LOGIN} passHref>
                  <div className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 transition duration-300 hover:text-gray-900 hover:bg-gray-100">
                    Login
                  </div>
                </Link>
                <Link href={ROUTES.SIGNUP} passHref>
                  <div className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 transition duration-300 hover:text-gray-900 hover:bg-gray-100">
                    Signup
                  </div>
                </Link>
              </>
            )}
          </div>
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 transition duration-300 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6 transition-transform duration-300 transform rotate-45"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6 transition-transform duration-300 transform rotate-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden transition-all duration-300 ease-in-out`}
      >
        {/* Animation for mobile menu dropdown */}
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" passHref>
            <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 transition duration-300 hover:text-gray-900 hover:bg-gray-100">
              {/* Animation for hover effect on mobile menu items */}
              Home
            </div>
          </Link>
          <Link href="/auctions" passHref>
            <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 transition duration-300 hover:text-gray-900 hover:bg-gray-100">
              {/* Animation for hover effect on mobile menu items */}
              Auctions
            </div>
          </Link>
          <Link href="/about" passHref>
            <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 transition duration-300 hover:text-gray-900 hover:bg-gray-100">
              {/* Animation for hover effect on mobile menu items */}
              About
            </div>
          </Link>
          <Link href="/contact" passHref>
            <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 transition duration-300 hover:text-gray-900 hover:bg-gray-100">
              {/* Animation for hover effect on mobile menu items */}
              Contact
            </div>
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block w-full px-3 py-2 text-left rounded-md text-base font-medium text-gray-700 transition duration-300 hover:text-gray-900 hover:bg-gray-100"
            >
              {/* Animation for hover effect on Logout button */}
              Logout
            </button>
          ) : (
            <>
              <Link href={ROUTES.LOGIN} passHref>
                <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 transition duration-300 hover:text-gray-900 hover:bg-gray-100">
                  {/* Animation for hover effect on Login button */}
                  Login
                </div>
              </Link>
              <Link href={ROUTES.SIGNUP} passHref>
                <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 transition duration-300 hover:text-gray-900 hover:bg-gray-100">
                  {/* Animation for hover effect on Signup button */}
                  Signup
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
