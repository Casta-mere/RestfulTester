"use client";
import { DataGroup, dataMap } from "@/app/data";
import { Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Settings from "./Settings";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-48 h-screen py-2 sticky top-0 flex flex-col items-center">
      <Flex className="w-full items-center" direction="column">
        <Heading>Restful Tester</Heading>
      </Flex>

      <ul className="overflow-y-auto space-y-1 px-1 w-full">
        {(Object.entries(dataMap) as [string, DataGroup][]).map(
          ([key, { label }]) => {
            const href = `/auto/${key}`;
            const isActive = pathname === href;
            return (
              <li key={key}>
                <Link
                  href={href}
                  className={`block px-3 py-2 rounded w-full ${
                    isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          }
        )}
      </ul>

      <Flex className="items-center mt-2 w-full" direction="column">
        <Settings />
      </Flex>
    </nav>
  );
}
