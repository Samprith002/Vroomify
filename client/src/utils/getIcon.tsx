"use server";

import { LucideIcon } from "lucide-react";

export default async function getIcon(Icon: LucideIcon) {
  return <Icon size={25} strokeWidth={2} />;
}
