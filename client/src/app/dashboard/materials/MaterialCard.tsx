import { Material } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { titleCase } from "@/utils/fx";
import {
  BadgeIndianRupeeIcon,
  PencilIcon,
  Tally5Icon,
  TimerIcon,
  Trash2Icon,
} from "lucide-react";
import DeleteMaterialDialog from "./DeleteMaterialDialog";
import EditMaterialDialog from "./EditMaterialDialog";

export default function MaterialCard({ material }: { material: Material }) {
  return (
    <Card className="shadow-none border-black group">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          {material.name.toUpperCase()}
          <div className="flex items-center justify-end gap-5">
            <DeleteMaterialDialog id={material.id} />
            <EditMaterialDialog material={material} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center w-full">
        <div className="w-full grid grid-cols-3 gap-2 text-lg align-middle items-center">
          <div
            className="flex items-center justify-center gap-2 w-full"
            title="Cost per item"
          >
            <BadgeIndianRupeeIcon />
            {material.price}
          </div>
          <div
            className="flex items-center justify-center gap-2 w-full"
            title="Delivery time"
          >
            <TimerIcon />
            {material.deliveryTime}
          </div>
          <div
            className="flex items-center justify-center gap-2 w-full"
            title="Max quantity per order"
          >
            <Tally5Icon />
            {material.maxQty}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
