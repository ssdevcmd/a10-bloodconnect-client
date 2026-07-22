import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  MailIcon,
  MailOpen,
} from "lucide-react";
import { BiDonateBlood } from "react-icons/bi";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 my-10">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-2xl text-white">
                <BiDonateBlood />
              </div>


              <p className="text-2xl font-bold text-red-600">
                BloodConnect
              </p>
            </div>

            <p className="mt-5 leading-7 text-gray-400">
              Connecting blood donors with patients in need.
              Together we can save lives, one donation at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/">Home</Link>
              </li>

              <li>
                <Link href="/donation-requests">
                  Donation Requests
                </Link>
              </li>

              <li>
                <Link href="/funding">
                  Funding
                </Link>
              </li>

              <li>
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Support
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/faq">FAQ</Link>
              </li>

              <li>
                <Link href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link href="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Mail className="text-red-500" size={18} />
                <span>support@bloodconnect.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-red-500" size={18} />
                <span>+880 1700-000000</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-red-500" size={18} />
                <span>Dhaka, Bangladesh</span>
              </div>

              {/* Social */}
              <div className="flex gap-4 pt-4">

                <a
                  href="#"
                  className="rounded-full bg-slate-800 p-3 transition hover:bg-red-600"
                >
                  <FaFacebook size={18} />
                </a>

                <a
                  href="#"
                  className="rounded-full bg-slate-800 p-3 transition hover:bg-red-600"
                >
                  <FaInstagram size={18} />
                </a>

                <a
                  href="#"
                  className="rounded-full bg-slate-800 p-3 transition hover:bg-red-600"
                >
                  <FaLinkedin size={18} />
                </a>

                <a
                  href="#"
                  className="rounded-full bg-slate-800 p-3 transition hover:bg-red-600"
                >
                  <FaGithub size={18} />
                </a>

              </div>

            </div>
          </div>

        </div>

        <div className="my-10 border-t border-slate-800"></div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

          <p className="flex items-center gap-2 text-sm">
            Made with
            <Heart
              size={16}
              className="fill-red-500 text-red-500"
            />
            for humanity.
          </p>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BloodBridge. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}