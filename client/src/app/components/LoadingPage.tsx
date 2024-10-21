"use client";

import { loaderAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { LoaderCircleIcon } from "lucide-react";
import { twJoin } from "tailwind-merge";

export default function LoadingPage() {
  const [loading] = useAtom(loaderAtom);

  return (
    <div
      className={twJoin(
        "flex-col w-screen h-screen items-center gap-2 z-100 absolute top-0 left-0 opacity-60",
        loading ? "flex" : "hidden"
      )}
    >
      {/* <LoaderCircleIcon size={50} className="animate-spin" /> */}
      <hr className="w-full h-2 absolute top-0 left-0 bg-green-600 animate-pulse" />
    </div>
  );
}
