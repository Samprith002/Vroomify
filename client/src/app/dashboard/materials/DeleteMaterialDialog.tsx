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
import { Button } from "@/components/ui/button";
import { mutator } from "@/utils/atoms";
import { deleteMaterial } from "@/utils/fetchers";
import { useAtom } from "jotai";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export default function DeleteMaterialDialog({ id }: { id: string }) {
  const [mutate] = useAtom(mutator);

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
          <AlertDialogTitle>Delete Material</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure that you want to remove this material from the
            database?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteMaterial(id);
              toast.success("Material deleted successfully!");
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
