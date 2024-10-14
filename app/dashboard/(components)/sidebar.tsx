import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-slate-800 rounded-md shadow-xl text-white p-5">
      <h2 className="text-2xl font-bold mb-6">
        Texas <span className="text-red-500 px-1">Map</span>
      </h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link
              href="/dashboard"
              className={`block p-2 rounded font-medium ${
                pathname === "/dashboard" ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            >
              Add New Drill
            </Link>
          </li>

          <li className="mb-4">
            <Link
              href="/dashboard/alldrills"
              className={`block p-2 rounded font-medium ${
                pathname === "/dashboard/alldrills"
                  ? "bg-gray-600"
                  : "hover:bg-gray-700"
              }`}
            >
              All Drills
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex flex-col  h-full  items-center justify-center">
        <Link href="/maps">
          <Button variant="ghost">View Map</Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
