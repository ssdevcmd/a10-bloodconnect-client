"use client";

import Link from "next/link";
import {
  HeartHandshake,
  ShieldCheck,
  BellRing,
  Users,
  Activity,
  Droplet,
  ArrowRight,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function Counter({ end, duration = 2, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = end / (duration * 60);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function FeaturedSection() {
  const features = [
    {
      icon: HeartHandshake,
      title: "Emergency Blood Requests",
      description:
        "Patients and hospitals can create urgent blood requests in seconds, helping donors respond quickly during critical situations.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Donor Network",
      description:
        "Search trusted donors by blood group, location, and availability through a secure and verified community platform.",
    },
    {
      icon: BellRing,
      title: "Rapid Response Alerts",
      description:
        "Nearby donors receive instant notifications when a matching blood request is posted, reducing response time when every minute matters.",
    },
  ];

 
  const stats = [
    {
      icon: Users,
      value: 5000,
      suffix: "+",
      label: "Registered Donors",
    },
    {
      icon: Activity,
      value: 1200,
      suffix: "+",
      label: "Lives Helped",
    },
    {
      icon: HeartHandshake,
      value: 350,
      suffix: "+",
      label: "Active Requests",
    },
    {
      icon: DollarSign,
      value: 250000,
      prefix: "$",
      suffix: "+",
      label: "Fundings",
    },
  ];


  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            <Droplet className="h-4 w-4" />
            Featured Impact
          </span>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Why Thousands Trust
            <span className="block text-red-600">BloodConnect</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            BloodConnect is built to connect donors, patients, and hospitals
            through a fast, transparent, and life-saving donation network.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 transition group-hover:bg-red-600">
                  <Icon className="h-7 w-7 text-red-600 transition group-hover:text-white" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 rounded-3xl bg-gradient-to-r from-red-600 to-red-700 p-8 text-white md:p-10"
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div key={index} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="mt-4 text-3xl font-extrabold">
                    <Counter
                      end={stat.value}
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix || ""}
                    />
                  </div>

                  <p className="mt-1 text-sm text-red-100">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>


        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            Every Donation Can Save Up To Three Lives
          </h3>

          <p className="mt-3 text-gray-600">
            Join our growing community of donors and help ensure that no patient
            has to wait for lifesaving blood.
          </p>

        </div>
      </div>
    </section>
  );
}