import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types";
import { CarIcon, CheckCircleIcon, TimerIcon } from "lucide-react";
import dayjs from "dayjs";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({
  ord,
  mod,
}: {
  ord: Order;
  mod: string | undefined;
}) {
  return (
    <Card className="border-black shadow-none">
      <CardHeader className="w-full flex items-center justify-between">
        <CardTitle className="text-xl w-full text-left">{ord.id}</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <div className="w-full grid grid-cols-3">
          <div className="flex items-center gap-2">
            <CarIcon size={20} />
            {mod}
          </div>
          <div className="flex items-center gap-2">
            <TimerIcon size={20} />
            {dayjs(ord.given_at).format("MMM DD, YYYY")}
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon size={20} />
            <OrderStatusBadge status={ord.status} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
