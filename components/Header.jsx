"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CgWebsite } from "react-icons/cg";
import { MdOutlinePayment, MdShoppingCart } from "react-icons/md";
import { useState, useEffect } from "react";
import { IoStorefrontSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    function getCartCount() {
      const keys = Object.keys(localStorage).filter(
        (key) => key !== "ally-supports-cache"
      );
      return keys.length;
    }

    setCartCount(getCartCount());
  }, [pathname]);

  return (
    <header className="flex flex-col items-center justify-between w-full bg-white shadow-md fixed top-0 z-50">
      <div className="container max-w-7xl mx-auto flex items-center justify-between p-2">
        <div className="flex items-center justify-center">
          <a href="https://owlsentry.com">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Image src="/logo.jpg" width={200} height={75} alt="Logo" />
            </motion.div>
          </a>
        </div>

        <div className="flex">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:flex hidden border border-1 items-center justify-center border-[#1B1464] text-[#1B1464] px-2 mr-2 py-1 rounded-md shadow lg:px-4 lg:py-2 text-sm lg:text-base"
            href="https://app.owlsentry.com"
          >
            <div className="lg:text-lg flex gap-1 items-center justify-center">
              <CgWebsite />
              <span className="h-0 lg:h-auto">Platform</span>
            </div>
          </motion.a>

          <div className="relative text-[#1B1464] px-2 mr-2 py-1 rounded-md lg:px-4 lg:py-2">
            <div className="lg:text-lg flex gap-1 items-center justify-center">
              <a className="mx-5" href="https://store.owlsentry.com">
                {" "}
                <IoStorefrontSharp
                  aria-label="Store Owl Sentry Page"
                  style={{ fontSize: "32px", color: "#1B1464" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
