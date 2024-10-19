import { Material } from "@/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  BadgeIndianRupeeIcon,
  PlusCircleIcon,
  Tally5Icon,
  TimerIcon,
} from "lucide-react";
import { twJoin } from "tailwind-merge";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addMaterial } from "@/utils/fetchers";
import { toast } from "sonner";
import { useState } from "react";
import { KeyedMutator } from "swr";
import { useAtom } from "jotai";
import { mutator } from "@/utils/atoms";

export default function CreateMaterialDialog({
  materials,
}: {
  materials: Material[];
}) {
  const [open, setOpen] = useState(false);
  const [mutate] = useAtom(mutator);

  const schema = z.object({
    name: z.string(),
    price: z.string(),
    time: z.string(),
    maxQty: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    await addMaterial({
      name: data.name,
      price: parseInt(data.price),
      deliveryTime: parseInt(data.time),
      maxQty: parseInt(data.maxQty),
    });
    toast.success("Created material successfully!");
    if (typeof mutate == "function") await mutate();
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
      <DialogTrigger
        className={materials.length % 2 === 0 ? "col-span-2" : "col-span-1"}
      >
        <Card
          className={twJoin(
            "w-full h-full shadow-none border-black border-dashed text-xl cursor-pointer p-6 py-12"
          )}
        >
          <CardContent className="w-full h-full flex items-center justify-center gap-2 pb-0">
            <PlusCircleIcon size={25} /> Add Material
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add a material</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <br />
            <div className="w-full grid grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div
                        className="flex items-center gap-2"
                        title="Price per each item"
                      >
                        <BadgeIndianRupeeIcon size={35} />
                        <Input
                          type="number"
                          className="remove-arrows"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div
                        className="flex items-center gap-2"
                        title="Manufacture time"
                      >
                        <TimerIcon size={35} />
                        <Input
                          type="number"
                          className="remove-arrows"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxQty"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div
                        className="flex items-center gap-2"
                        title="Maximum quantity per order"
                      >
                        <Tally5Icon size={35} />
                        <Input
                          type="number"
                          className="remove-arrows"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <br />
            <div className="flex items-center justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
