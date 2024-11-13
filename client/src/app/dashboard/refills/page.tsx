"use client";

import { loaderAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import useSWR from "swr";

export default function Refills() {
  const [, setLoading] = useAtom(loaderAtom);
  useEffect(() => {
    setLoading(false);
  }, []);

  const { data: refills } = useSWR("refills");

  return (
    <div className="p-20 flex flex-col w-full h-full">
      <h1 className="text-5xl font-semibold font-orbitron">Refills</h1>
    </div>
  );
}
