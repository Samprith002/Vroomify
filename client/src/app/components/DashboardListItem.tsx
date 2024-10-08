"use client";

import { cn } from "@/lib/utils";
import { audiowide, orbitron } from "@/utils/fonts";
import { LucideIcon } from "lucide-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// Define the Props interface
interface Props {
  label: string;
  link: string;
  icon: ReactNode;
}


// DashboardListItem component
export default function DashboardListItem({ label, link, icon }: Props) {
  const pathname = usePathname()
  
  return (
    <Link
      href={`/dashboard/${link}`}
      className={cn(
        "w-full p-5 flex items-center justify-start gap-x-7 transition hover:cursor-pointer border-white hover:bg-gray-200 hover:border-gray-200 rounded-md ease-in-out duration-300",
        pathname.includes(link) ? "bg-gray-200" : "bg-white"
      )}
    >
      {icon}
      <div className={cn("text-2xl font-light", orbitron)}>{label}</div>
    </Link>
  );
}