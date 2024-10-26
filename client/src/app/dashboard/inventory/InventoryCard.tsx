import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InventoryPair } from "@/types";
import EditPairDialog from "./EditPairDialog";
import DeletePairDialog from "./DeletePairDialog";

export default function InventoryCard({ pair }: { pair: InventoryPair }) {
  return (
    <Card className="shadow-none border-black group">
      <CardHeader>
        <CardTitle className="w-full flex items-center justify-between text-xl">
          {pair.key.toUpperCase()}
          <div className="flex items-center gap-3">
            <DeletePairDialog pair={pair} />
            <EditPairDialog pair={pair} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl">{pair.value}</div>
      </CardContent>
    </Card>
  );
}
