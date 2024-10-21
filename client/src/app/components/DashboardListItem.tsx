"use client";

import { cn } from "@/lib/utils";
import { loaderAtom } from "@/utils/atoms";
import { audiowide, orbitron } from "@/utils/fonts";
import { useAtom } from "jotai";
import { LucideIcon } from "lucide-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

// Define the Props interface
interface Props {
  label: string;
  link: string;
  icon: ReactNode;
}

// DashboardListItem component
export default function DashboardListItem({ label, link, icon }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [, setLoading] = useAtom(loaderAtom);

  return (
    <div
      onClick={() => {
        setLoading(true);
        router.push(`/dashboard/${link}`);
      }}
      className={cn(
        "w-full p-5 flex items-center justify-start gap-x-7 transition hover:cursor-pointer border-white hover:bg-gray-200 hover:border-gray-200 rounded-md ease-in-out duration-300",
        pathname.includes(link) ? "bg-gray-200" : "bg-white"
      )}
    >
      {icon}
      <div className={cn("text-xl font-light", orbitron)}>{label}</div>
    </div>
  );
}
