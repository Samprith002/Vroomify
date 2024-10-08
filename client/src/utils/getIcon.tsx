"use server";

import { LucideIcon } from "lucide-react";

export default async function getIcon(Icon: LucideIcon) {
  return <Icon size={30} strokeWidth={1.75} />;
}
