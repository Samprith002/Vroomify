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
  PencilIcon,
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
import { addMaterial, updateMaterial } from "@/utils/fetchers";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { KeyedMutator } from "swr";
import { useAtom } from "jotai";
import { mutator } from "@/utils/atoms";
import { titleCase } from "@/utils/fx";

export default function EditMaterialDialog({
  material,
}: {
  material: Material;
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
    defaultValues: {
      name: titleCase(material.name),
      price: material.price.toString(),
      time: material.deliveryTime.toString(),
      maxQty: material.maxQty.toString(),
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: titleCase(material.name),
        price: material.price.toString(),
        time: material.deliveryTime.toString(),
        maxQty: material.maxQty.toString(),
      });
    }
  }, [open, material, form]);

  async function onSubmit(data: z.infer<typeof schema>) {
    await updateMaterial({
      id: material.id,
      name: data.name,
      price: parseInt(data.price),
      deliveryTime: parseInt(data.time),
      maxQty: parseInt(data.maxQty),
    });
    toast.success("Updated material successfully!");
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
      <DialogTrigger>
        <PencilIcon
          size={20}
          className="hidden group-hover:inline-block cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update material</DialogTitle>
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
