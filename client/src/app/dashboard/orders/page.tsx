"use client";

import { cn } from "@/lib/utils";
import { loaderAtom } from "@/utils/atoms";
import { orbitron } from "@/utils/fonts";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function Orders() {
  const [, setLoading] = useAtom(loaderAtom);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="p-20 flex flex-col w-full h-full">
      <h1 className={cn("text-5xl font-semibold", orbitron)}>Orders</h1>
    </div>
  );
}
