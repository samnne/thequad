"use client";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { navLinks } from "../app/client-utils/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <nav className={clsx(" p-1 w-screen grid ", "fixed bottom-0 z-1")}>
      <ul className="flex p-1 shadow-lg shadow-accent/40  bg-white border border-secondary/30  rounded-xl justify-around items-center">
        {navLinks.map((link) => {
          return (
            <li className="grow flex justify-center" key={link.href}>
              <Link
                className={`${pathname.includes(link.href) && "text-primary border border-primary  "} hover:bg-background-dark/10 grow cursor-pointer flex-col text-black rounded-2xl w-12  h-12 flex justify-center items-center `}
                href={link.href}
              >
                {link.icon()}
                <span className="text-xs font-bold">{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
