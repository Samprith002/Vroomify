"use client";

import { cn } from "@/lib/utils";
import { loaderAtom, modelMutate } from "@/utils/atoms";
import { getModels } from "@/utils/fetchers";
import { orbitron } from "@/utils/fonts";
import { useAtom } from "jotai";
import { useEffect } from "react";
import useSWR from "swr";
import ModelCard from "./ModelCard";
import CreateModelCard from "./CreateModelDialog";

export default function Models() {
  const { data: models, mutate: mutModels } = useSWR("models", getModels);
  const [, setMutate] = useAtom(modelMutate);

  useEffect(() => {
    if (mutModels) setMutate(() => mutModels);
  }, [mutModels]);

  const [, setLoading] = useAtom(loaderAtom);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="p-20 flex flex-col w-full h-full">
      <h1 className="text-5xl font-semibold font-orbitron">Models</h1>
      {models ? (
        <div className="w-full mt-10 grid grid-cols-2 gap-3">
          {models.map((mod) => (
            <ModelCard key={mod.id} model={mod} />
          ))}
          <CreateModelCard models={models} />
        </div>
      ) : (
        <div className="w-full flex items-center justify-center text-xl mt-10">
          Loading...
        </div>
      )}
    </div>
  );
}
