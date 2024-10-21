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
import { modelMutate, mutator } from "@/utils/atoms";
import { deleteMaterial, deleteModel } from "@/utils/fetchers";
import { useAtom } from "jotai";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export default function DeleteModelDialog({ id }: { id: string }) {
  const [mutate] = useAtom(modelMutate);

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
          <AlertDialogTitle>Delete Model</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure that you want to remove this model from the database?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteModel(id);
              toast.success("Model deleted successfully!");
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
