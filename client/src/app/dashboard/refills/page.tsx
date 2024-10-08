import { cn } from "@/lib/utils";
import { orbitron } from "@/utils/fonts";

export default function Refills()  {
  return (
    <div className="p-20 flex flex-col w-full h-full">
      <h1 className={cn("text-5xl font-semibold", orbitron)}>Refills</h1>
    </div>
  )
}