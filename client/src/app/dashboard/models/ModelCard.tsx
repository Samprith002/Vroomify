import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Material, Model } from "@/types";
import { getMaterial } from "@/utils/fetchers";
import { BadgeIndianRupeeIcon, CalendarIcon, TimerIcon } from "lucide-react";
import { useEffect, useState } from "react";
import EditModelDialog from "./EditModelDialog";
import DeleteModelDialog from "./DeleteModelDialog";

export default function ModelCard({ model }: { model: Model }) {
  return (
    <Card className="shadow-none border-black group">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          {model.name.toUpperCase()}
          <div className="flex items-center justify-center gap-5">
            <DeleteModelDialog id={model.id} />
            <EditModelDialog model={model} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center w-full">
        <div className="w-full grid grid-cols-3 gap-2 text-lg align-middle items-center">
          <div
            className="flex items-center justify-center gap-2 w-full"
            title="Max quantity per order"
          >
            <CalendarIcon />
            {model.year}
          </div>
          <div
            className="flex items-center justify-center gap-2 w-full"
            title="Cost per item"
          >
            <BadgeIndianRupeeIcon />
            {model.price}
          </div>
          <div
            className="flex items-center justify-center gap-2 w-full"
            title="Delivery time"
          >
            <TimerIcon />
            {model.deliveryTime}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
