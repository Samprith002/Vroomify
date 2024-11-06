"use client";

import { loaderAtom } from "@/utils/atoms";
import { getModels, listOrders } from "@/utils/fetchers";
import { useAtom } from "jotai";
import { useEffect } from "react";
import useSWR from "swr";
import OrderCard from "./OrderCard";
import CreateOrder from "./CreateOrder";

export default function Orders() {
  const [, setLoading] = useAtom(loaderAtom);
  useEffect(() => {
    setLoading(false);
  }, []);

  const { data: models } = useSWR("models", getModels);
  const { data: orders, mutate } = useSWR("orders", listOrders);

  return (
    <div className="p-20 flex flex-col w-full h-full">
      <h1 className="text-5xl font-semibold font-orbitron">Orders</h1>
      <div className="w-full flex items-center justify-end">
        <CreateOrder mutate={mutate} />
      </div>
      {models && orders ? (
        <div className="w-full mt-10 grid grid-cols-1 gap-3">
          {orders.map((ord) => (
            <OrderCard
              key={ord.id}
              ord={ord}
              mod={models.find((x) => x.id === ord.mod_id)?.name}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center text-xl mt-10">
          Loading...
        </div>
      )}
    </div>
  );
}
