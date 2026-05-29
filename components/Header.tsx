import Link from "next/link";

function Header() {
  return (
    <header>
      <div>
        {" "}
        <Link href="/">Logo</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/follow">Follow</Link>
          </li>
        </ul>

        <div>
          <button>
            <Link href="/signin">Sign In</Link>
          </button>
          <button>
            <Link href="/signup">Get Started</Link>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
