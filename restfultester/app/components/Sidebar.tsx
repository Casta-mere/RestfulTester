"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dataMap } from "@/app/data";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-48 h-screen p-2 sticky top-0 ">
      <ul>
        {Object.keys(dataMap).map((name) => {
          const href = `/auto/${name}`;
          const isActive = pathname === href;
          return (
            <li key={name}>
              <Link
                href={href}
                className={`mt-1 block px-3 py-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                }`}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
