import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/create">Add Student</Link>
      </nav>
    </header>
  );
};

export default Header;
