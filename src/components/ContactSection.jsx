"use client";

import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            Contact Us
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            We'd Love to Hear From You
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Have questions about blood donation or need assistance?
            Send us a message or contact us directly.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Contact Information */}
          <div className="rounded-3xl bg-red-600 p-10 text-white shadow-xl">

            <h3 className="text-3xl font-bold">
              Get In Touch
            </h3>

            <p className="mt-4 text-red-100">
              Our support team is available to answer your questions and
              help you with blood donation requests.
            </p>

            <div className="mt-10 space-y-8">

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-white/20 p-3">
                  <Phone size={22} />
                </div>

                <div>
                  <h4 className="font-semibold">Call Us</h4>
                  <p>+880 1700-000000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-white/20 p-3">
                  <Mail size={22} />
                </div>

                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p>support@bloodconnect.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-white/20 p-3">
                  <MapPin size={22} />
                </div>

                <div>
                  <h4 className="font-semibold">Office</h4>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl bg-white p-10 shadow-xl">

            <form className="space-y-6">

              <div>
                <label className="mb-2 block font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-red-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>
      </div>
    </section>
  );
}