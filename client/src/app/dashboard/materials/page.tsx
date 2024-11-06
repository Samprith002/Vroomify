"use client";

import { cn } from "@/lib/utils";
import { Material } from "@/types";
import { getMaterials } from "@/utils/fetchers";
import { orbitron } from "@/utils/fonts";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import MaterialCard from "./MaterialCard";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";
import { twJoin } from "tailwind-merge";
import CreateMaterialDialog from "./CreateMaterialDialog";
import { useAtom } from "jotai";
import { loaderAtom, mutator } from "@/utils/atoms";

export default function Materials() {
  const { data: materials, mutate: mutMaterials } = useSWR(
    "materials",
    getMaterials
  );
  const [mutate, setMutate] = useAtom(mutator);

  const [, setLoading] = useAtom(loaderAtom);
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (mutMaterials) setMutate(() => mutMaterials);
  }, [mutMaterials]);

  return (
    <div className="p-20 flex flex-col w-full h-full">
      <h1 className="text-5xl font-semibold font-orbitron">Materials</h1>

      {materials ? (
        <div className="w-full mt-10 grid grid-cols-2 gap-3">
          {materials.map((mat) => (
            <MaterialCard key={mat.id} material={mat} />
          ))}
          <CreateMaterialDialog materials={materials} />
        </div>
      ) : (
        <div className="w-full flex items-center justify-center text-xl mt-10">
          Loading...
        </div>
      )}
    </div>
  );
}
