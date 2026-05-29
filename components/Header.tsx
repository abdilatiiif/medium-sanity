import Link from "next/link";

function Header() {
  return (
    <header className="p-4 border-b border-2 border-gray-300">
      {" "}
      <nav className="flex items-center justify-between">
        <Link href="/" className="bg-red-400 p-4 text-amber-50 font-bold">
          food for thought
        </Link>
        <ul className="hidden md:flex flex-1 items-center justify-center gap-8">
          <li className="bg-orange-300 p-2  rounded-2xl">
            <Link href="/about">About</Link>
          </li>
          <li className="bg-pink-300 p-2  rounded-2xl">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="bg-purple-300 p-2  rounded-2xl">
            <Link href="/follow">Follow</Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button className="p-2 bg-green-300 rounded-2xl">
            <Link href="/signin">Sign In</Link>
          </button>
          <button className="p-2 bg-blue-200 rounded-2xl font-bold ">
            <Link href="/signup">Get Started</Link>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
