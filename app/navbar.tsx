import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-1/2 -translate-x-1/2 w-full p-4 container flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Quizzit
      </Link>
      <Link
        href="/auth"
        className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-5 rounded-lg text-sm"
      >
        Login/Signup
      </Link>
    </nav>
  );
}
