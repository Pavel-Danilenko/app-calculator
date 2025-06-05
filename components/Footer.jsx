"use client";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#1B1464] text-white p-8">
      <div className="container max-w-7xl mx-auto pt-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl text-center font-semibold">
            Have you any question? Contact us!
          </h2>
          <a
            href="mailto:support@owlsentry.com"
            className="text-sm text-gray-100 hover:text-white hover:underline"
          >
            office@owlsentry.com
          </a>
        </div>
        <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
          <div className="flex items-center space-x-4">
            <motion.a
              href="https://www.linkedin.com/company/owlsentry"
              aria-label="LinkedIn"
              className="text-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </motion.a>
            {/* Add more social icons here if needed */}
          </div>
          <p className="mt-4">© Owl Sentry 2024 All Rights Reserved</p>

          <Link
            href="/privacy-policy"
            className="mt-2 text-sm text-gray-100 hover:text-white hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="mt-2 text-sm text-gray-100 hover:text-white hover:underline"
          >
            Terms and conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
