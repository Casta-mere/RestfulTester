"use client";
import { dataMap } from "@/app/data";
import { Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Settings from "./Settings";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-48 h-screen p-2 sticky top-0 ">
      <Flex direction="column" gap="3">
        <Heading>Restful Tester</Heading>
        <ul>
          {Object.keys(dataMap).map((name) => {
            const href = `/auto/${name}`;
            const isActive = pathname === href;
            return (
              <li key={name}>
                <Link
                  href={href}
                  className={`mt-1 block px-3 py-2 rounded w-full ${
                    isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
        <Flex direction="column" className="items-center">
          <Settings />
        </Flex>
      </Flex>
    </nav>
  );
}
