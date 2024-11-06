import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Model } from "@/types";
import { modelMutate } from "@/utils/atoms";
import { getMaterials, updateModel } from "@/utils/fetchers";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useAtom } from "jotai";
import {
  BadgeIndianRupeeIcon,
  CalendarIcon,
  DotIcon,
  PencilIcon,
  PlusCircleIcon,
  TimerIcon,
  Trash2Icon,
} from "lucide-react";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import { z } from "zod";

const EditModelDialog = memo(({ model }: { model: Model }) => {
  const { data: materials } = useSWR("materials", getMaterials);
  const [mutate] = useAtom(modelMutate);

  const [selected, setSelected] = useState<Record<string, string>>(
    Object.fromEntries(
      Object.entries(model.materials).map((x) => [x[0], x[1].toString()])
    )
  );

  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    name: z.string(),
    year: z.string(),
    materials: z.record(z.string(), z.string()),
    price: z.string(),
    deliveryTime: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: model.name,
      year: model.year.toString(),
      materials: selected,
      price: model.price.toString(),
      deliveryTime: model.deliveryTime.toString(),
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const mod: Model = {
      id: model.id,
      name: data.name,
      year: parseInt(data.year),
      price: parseInt(data.price),
      deliveryTime: parseInt(data.deliveryTime),
      materials: {},
    };

    mod.materials = Object.fromEntries(
      Object.entries(data.materials).map((x) => [x[0], parseInt(x[1])])
    );

    console.log(mod);
    await updateModel(mod);
    toast.success("Model updated successfully!");
    if (typeof mutate === "function") {
      mutate();
    }
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        form.reset();
        setSelected({});
        setOpen(o);
      }}
    >
      <DialogTrigger>
        <PencilIcon
          size={20}
          className="hidden group-hover:inline-block cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit a model</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Name</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <br />
            <div className="w-full grid grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2" title="Year">
                        <CalendarIcon size={35} />
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div
                        className="flex items-center gap-2"
                        title="Price of model"
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
                name="deliveryTime"
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
            </div>
            <br />
            <FormField
              control={form.control}
              name="materials"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Materials Required</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-center w-full gap-2">
                      {Object.entries(field.value).map(([id, val]) => (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <DotIcon size={20} />
                            <div className="">
                              {materials?.find((mat) => mat.id === id)?.name}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              value={val}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setSelected((old) => {
                                  const updated = { ...old, [id]: newValue };
                                  field.onChange(updated);
                                  return updated;
                                });
                              }}
                            />
                            <Trash2Icon
                              size={20}
                              className="text-red-600 cursor-pointer"
                              onClick={() => {
                                setSelected((old) =>
                                  Object.fromEntries(
                                    Object.entries(old).filter(
                                      (x) => x[0] !== id
                                    )
                                  )
                                );
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      <DropdownMenu>
                        <DropdownMenuTrigger className="w-full border border-black border-dashed flex items-center justify-center gap-2 p-3 rounded-md">
                          <PlusCircleIcon size={20} />
                          Add Material
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {materials
                            ?.filter(
                              (mat) =>
                                !Object.entries(selected).find(
                                  (x) => x[0] === mat.id
                                )
                            )
                            .map((mat) => (
                              <DropdownMenuItem
                                key={mat.id}
                                onClick={() =>
                                  setSelected((old) => ({
                                    ...old,
                                    [mat.id]: "0",
                                  }))
                                }
                              >
                                {mat.name}
                              </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <br />
            <div className="w-full flex items-center justify-end">
              <Button>Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

export default EditModelDialog;
