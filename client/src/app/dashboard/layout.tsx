import { cn } from "@/lib/utils";
import { audiowide, orbitron, raleway } from "@/utils/fonts";
import { ReactNode } from "react";
import DashboardListItem from "../components/DashboardListItem";
import {
  BoxesIcon,
  CarFrontIcon,
  CarIcon,
  CogIcon,
  ComponentIcon,
  LayoutDashboardIcon,
  WarehouseIcon,
} from "lucide-react";
import getIcon from "@/utils/getIcon";

export default function DashLayout({ children }: { children: ReactNode }) {
  return (
    <div className={cn("flex flex-col w-screen h-screen justify-center items-center", raleway)}>
      <div className="w-full p-7 py-5 fixed top-0 left-0 flex items-center justify-between bg-black shadow-lg">
        <h2 className={cn("text-4xl font-bold text-white", orbitron)}>
          Vroomify
        </h2>
      </div>
      <div className="w-full h-full grid grid-cols-4 mt-20">
        <div className="p-5 flex flex-col w-full h-full items-center shadow-xl gap-2">
          <div className={cn("text-3xl w-full px-5 py-3 font-semibold", orbitron)}>Dashboard</div>
          <DashboardListItem label="Orders" link="orders" icon={getIcon(CarIcon)} />
          <DashboardListItem label="Materials" link="materials" icon={getIcon(ComponentIcon)} />
          <DashboardListItem label="Refills" link="refills" icon={getIcon(CogIcon)} />
          <DashboardListItem label="Inventory" link="inventory" icon={getIcon(BoxesIcon)} />
          <DashboardListItem label="Models" link="models" icon={getIcon(CarFrontIcon)} />
          <DashboardListItem label="Warehouse" link="warehouse" icon={getIcon(WarehouseIcon)} />
        </div>
        <div className="w-full h-full col-span-3">{children}</div>
      </div>
    </div>
  );
}
