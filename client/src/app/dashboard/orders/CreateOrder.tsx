import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/types";
import { createOrder, getModels } from "@/utils/fetchers";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR, { KeyedMutator } from "swr";
import { z } from "zod";

export default function CreateOrder({
  mutate,
}: {
  mutate: KeyedMutator<Order[]>;
}) {
  const [open, setOpen] = useState(false);
  const { data: models } = useSWR("models", getModels);

  const schema = z.object({
    mod_id: z.string().min(1, "Model is required"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      mod_id: "",
    },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    await createOrder(data.mod_id);
    toast.success("Order created successfully!");
    await mutate();
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        form.reset({
          mod_id: "",
        });
      }}
    >
      <DialogTrigger className="px-4 p-2 bg-foreground border-foreground rounded-md text-white text-center flex items-center justify-center gap-2">
        <PlusIcon size={20} />
        Create Order
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="mod_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  {models && (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {models.map((mod) => (
                          <SelectItem value={mod.id} key={mod.id}>
                            {mod.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
