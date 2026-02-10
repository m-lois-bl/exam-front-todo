import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

{/* Fonction pour gérer la fusion des classes Tailwind au niveau des composants */}
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}