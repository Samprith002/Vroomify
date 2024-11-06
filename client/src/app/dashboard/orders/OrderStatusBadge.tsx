import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function OrderStatusBadge({ status }: { status: number }) {
  return (
    <Badge
      className={cn(
        "text-white",
        (() => {
          switch (status) {
            case 0:
              return "bg-yellow-600";
            case 1:
              return "bg-blue-600";
            case 2:
              return "bg-red-600";
            case 3:
              return "bg-green-600";
          }
        })()
      )}
    >
      {(() => {
        switch (status) {
          case 0:
            return "Accepted";
          case 1:
            return "Manufacturing";
          case 2:
            return "Stored";
          case 3:
            return "Delivered";
        }
      })()}
    </Badge>
  );
}
