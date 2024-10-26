"use client";

import { cn } from "@/lib/utils";
import { loaderAtom, pairMutate } from "@/utils/atoms";
import { listPairs } from "@/utils/fetchers";
import { orbitron } from "@/utils/fonts";
import { useAtom } from "jotai";
import { useEffect } from "react";
import useSWR from "swr";
import InventoryCard from "./InventoryCard";
import CreatePairDialog from "./CreatePairDialog";

export default function Inventory() {
  const [, setLoading] = useAtom(loaderAtom);
  useEffect(() => {
    setLoading(false);
  }, []);

  const { data: pairs, mutate: mutPairs } = useSWR("inventory", listPairs);
  const [, setMutate] = useAtom(pairMutate);

  useEffect(() => {
    if (mutPairs) setMutate(() => mutPairs);
  }, [mutPairs]);

  return (
    <div className="p-20 flex flex-col w-full h-full">
      <h1 className={cn("text-5xl font-semibold", orbitron)}>Inventory</h1>
      {pairs ? (
        <div className="w-full mt-10 grid grid-cols-2 gap-3">
          {pairs.map((pair) => (
            <InventoryCard pair={pair} />
          ))}
          <CreatePairDialog pairs={pairs} />
        </div>
      ) : (
        <div className="w-full flex items-center justify-center text-xl mt-10">
          Loading...
        </div>
      )}
    </div>
  );
}
