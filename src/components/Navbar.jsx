"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { BiDonateBlood } from "react-icons/bi";
import { User } from "lucide-react";

export default function Navbar() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    // Better Auth
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
    };

    if (isPending) {
        return (
            <nav className="border-b bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
                    <h1 className="text-2xl font-bold text-red-600">
                        BloodConnect
                    </h1>
                </div>
            </nav>
        );
    }

    return (
        <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                         <BiDonateBlood />
                    </div>

                    <span className="text-2xl font-bold text-red-600">
                        BloodConnect
                    </span>
                </Link>

                {/* Desktop */}
                <div className="hidden items-center gap-8 md:flex">

                  <Link
                  href="/"
                  className="font-medium transition hover:text-red-600">
                  Home
                  </Link>

                    <Link
                        href="/donation-requests"
                        className="font-medium transition hover:text-red-600"
                    >
                        Donation Requests
                    </Link>

                    {!user ? (
                        <Link
                            href="/auth/signin"
                            className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
                        >
                            Login
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/funding"
                                className="font-medium transition hover:text-red-600"
                            >
                                Funding
                            </Link>

                            {/* Avatar Dropdown */}
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="avatar cursor-pointer"
                                >
                                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white ring ring-red-500 ring-offset-2">
                                     {user?.image ? (
    <img
      src={user.image}
      alt={user.name}
      className="h-full w-full rounded-full object-cover"
    />
  ) : (
    <User size={20} />
  )}
</div>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[100] mt-3 w-52 rounded-xl border bg-white p-2 shadow-lg"
                                >
                                    <li className="border-b px-3 py-2">
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {user.email}
                                        </p>
                                    </li>

                                    <li>
                                        <Link
                                            href="/dashboard"
                                            className="block rounded-lg px-3 py-2 hover:bg-gray-100"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>

                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>

                {/* Mobile Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-2xl md:hidden"
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="space-y-3 border-t bg-white px-5 py-4 md:hidden">

                    <Link
                        href="/"
                        className="block"
                    >
                        Home    
                    </Link>

                    <Link
                        href="/donation-requests"
                        className="block"
                    >
                        Donation Requests
                    </Link>

                    {!user ? (
                        <Link
                            href="/auth/signin"
                            className="block rounded-lg bg-red-600 px-4 py-2 text-center text-white"
                        >
                            Login
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/funding"
                                className="block"
                            >
                                Funding
                            </Link>

                            <Link
                                href="/dashboard"
                                className="block"
                            >
                                Dashboard
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="text-red-600"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}


// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { ChevronDown, Menu, X } from "lucide-react";
// import { BiDonateBlood } from "react-icons/bi";

// export default function Navbar() {
//   // Change this later after Better Auth
//   const isLoggedIn = false;

//   const user = {
//     name: "John Doe",
//     email: "john@example.com",
//     image: "https://i.pravatar.cc/150?img=12",
//   };

//   const [open, setOpen] = useState(false);
//   const [dropdown, setDropdown] = useState(false);

//   return (
//     <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">

//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-xl text-white">
//             <BiDonateBlood />
//           </div>

//           {/* <p className="text-2xl font-bold text-red-600">
//             Blood<span className="text-gray-900 font-bold">Connect</span>
//           </p> */}
//           <p className="text-2xl font-bold text-red-600">
//             BloodConnect
//           </p>
          
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden items-center gap-5 md:flex">

//           <Link
//             href="/"
//             className="font-medium hover:text-red-600"
//           >
//             Home
//           </Link>
//           <Link
//             href="/donation-requests"
//             className="font-medium hover:text-red-600"
//           >
//             Donation Requests
//           </Link>

//           {isLoggedIn ? (
//             <>
//               <Link
//                 href="/funding"
//                 className="font-medium hover:text-red-600"
//               >
//                 Funding
//               </Link>

//               {/* Avatar */}
//               <div className="relative">

//                 <button
//                   onClick={() => setDropdown(!dropdown)}
//                   className="flex items-center gap-2"
//                 >
//                   <img
//                     src={user.image}
//                     alt=""
//                     className="h-10 w-10 rounded-full object-cover"
//                   />

//                   <ChevronDown size={18} />
//                 </button>

//                 {dropdown && (
//                   <div className="absolute right-0 mt-3 w-56 rounded-xl border bg-white p-2 shadow-lg">

//                     <div className="border-b p-3">
//                       <p className="font-semibold">
//                         {user.name}
//                       </p>

//                       <p className="text-sm text-gray-500">
//                         {user.email}
//                       </p>
//                     </div>

//                     <Link
//                       href="/dashboard"
//                       className="mt-2 block rounded-lg px-3 py-2 hover:bg-gray-100"
//                     >
//                       Dashboard
//                     </Link>

//                     <button
//                       className="mt-1 w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50"
//                     >
//                       Logout
//                     </button>

//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <Link
//               href="/signin"
//               className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
//             >
//               Login
//             </Link>
//           )}
//         </div>

//         {/* Mobile Button */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden"
//         >
//           {open ? <X /> : <Menu />}
//         </button>
//       </div>

//       {/* Mobile Menu */}

//       {open && (
//         <div className="space-y-3 border-t bg-white px-5 py-4 md:hidden">

//           <Link
//             href="/donation-requests"
//             className="block"
//           >
//             Donation Requests
//           </Link>

//           {isLoggedIn ? (
//             <>
//               <Link
//                 href="/funding"
//                 className="block"
//               >
//                 Funding
//               </Link>

//               <Link
//                 href="/dashboard"
//                 className="block"
//               >
//                 Dashboard
//               </Link>

//               <button className="text-red-600">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link
//               href="/login"
//               className="block rounded-lg bg-red-600 py-2 text-center text-white"
//             >
//               Login
//             </Link>
//           )}

//         </div>
//       )}
//     </nav>
//   );
// }