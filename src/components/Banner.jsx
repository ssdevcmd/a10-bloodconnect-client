import Link from "next/link";
import { FaHeartbeat } from "react-icons/fa";

export default function Banner() {
    return (
        <section
            className="relative h-[90vh] bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1920&q=80')",
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
                <div className="max-w-3xl rounded-3xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/90 px-5 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm">
                        <FaHeartbeat className="text-base" />
                        <span>Donate Blood, Save Lives</span>
                    </span>

                    <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white md:text-6xl">
                        Your Blood Can Give
                        <span className="block text-red-500">
                            Someone Another Chance
                        </span>
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-gray-200">
                        Become a lifesaver by joining our community of blood donors.
                        Search verified donors or register today to help patients
                        receive blood when they need it most.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/register"
                            className="rounded-xl bg-red-600 px-8 py-4 text-center font-semibold text-white transition hover:bg-red-700"
                        >
                            Join as a Donor
                        </Link>

                        <Link
                            href="/search"
                            className="rounded-xl border-2 border-white px-8 py-4 text-center font-semibold text-white transition hover:bg-white hover:text-red-600"
                        >
                            Search Donors
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}