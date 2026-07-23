import Link from "next/link";
import {
  HeartHandshake,
  ShieldCheck,
  BellRing,
  Users,
  Activity,
  Droplet,
  ArrowRight,
} from "lucide-react";

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
    { icon: Users, value: "5,000+", label: "Registered Donors" },
    { icon: Activity, value: "1,200+", label: "Lives Helped" },
    { icon: HeartHandshake, value: "350+", label: "Active Requests" },
    { icon: Droplet, value: "8", label: "Blood Groups Covered" },
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
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-red-600 to-red-700 p-8 text-white md:p-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div key={index} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="mt-4 text-3xl font-extrabold">
                    {stat.value}
                  </div>

                  <p className="mt-1 text-sm text-red-100">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            Every Donation Can Save Up To Three Lives
          </h3>

          <p className="mt-3 text-gray-600">
            Join our growing community of donors and help ensure that no patient
            has to wait for lifesaving blood.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-700 hover:shadow-lg"
            >
              Join as a Donor
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-8 py-4 font-semibold text-gray-700 transition hover:border-red-600 hover:text-red-600"
            >
              Search Donors
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}