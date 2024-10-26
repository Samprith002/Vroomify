import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InventoryPair } from "@/types";
import { pairMutate } from "@/utils/atoms";
import { createPair, updatePair } from "@/utils/fetchers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { PencilIcon, PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { twJoin } from "tailwind-merge";
import { z } from "zod";

export default function EditPairDialog({ pair }: { pair: InventoryPair }) {
  const [open, setOpen] = useState(false);
  const [mutate] = useAtom(pairMutate);

  const formSchema = z.object({
    key: z.string(),
    value: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: pair.key,
      value: pair.value,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await updatePair(data);
    toast.success("Key pair updated successfully!");
    console.log(typeof mutate);
    if (typeof mutate === "function") await mutate();
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => {
        setOpen(op);
        form.reset();
      }}
    >
      <DialogTrigger>
        <PencilIcon
          size={20}
          className="hidden group-hover:inline-block cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Inventory Pair</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input type="number" className="remove-arrows" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <div className="w-full flex items-center justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
