import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { InventoryPair } from "@/types";
import { mutator, pairMutate } from "@/utils/atoms";
import { deletePair } from "@/utils/fetchers";
import { useAtom } from "jotai";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export default function DeletePairDialog({ pair }: { pair: InventoryPair }) {
  const [mutate] = useAtom(pairMutate);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2Icon
          size={20}
          className="hidden group-hover:inline-block cursor-pointer text-red-600"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Pair</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure that you want to remove the pair "{pair.key}" from the
            database?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deletePair(pair.key);
              toast.success("Pair deleted successfully!");
              if (typeof mutate == "function") {
                await mutate();
              }
            }}
            className="bg-red-500 text-white"
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
