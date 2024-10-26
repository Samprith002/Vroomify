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
import { createPair } from "@/utils/fetchers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { twJoin } from "tailwind-merge";
import { z } from "zod";

export default function CreatePairDialog({
  pairs,
}: {
  pairs: InventoryPair[];
}) {
  const [open, setOpen] = useState(false);
  const [mutate] = useAtom(pairMutate);

  const formSchema = z.object({
    key: z.string(),
    value: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const keys = pairs.map((x) => x.key.toUpperCase());

    if (keys.find((x) => x === data.key)) {
      form.setError("key", { message: "Key is already used" });
      return;
    }

    await createPair(data);
    toast.success("Key pair created successfully!");
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
        <Card
          className={twJoin(
            "w-full h-full shadow-none border-black border-dashed text-xl cursor-pointer p-6 py-12"
          )}
        >
          <CardContent className="w-full h-full flex items-center justify-center gap-2 pb-0">
            <PlusCircleIcon size={25} /> Add Pair
          </CardContent>
        </Card>
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
                    <Input
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
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
