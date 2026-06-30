import {
  Layers,
  BrickWall,
  Truck,
  Hammer,
  Shovel,
  Pickaxe,
  HardHat,
  Ruler,
  Wrench,
  Forklift,
} from "lucide-react";

// Maps the serviceCategory.icon enum (Sanity) → a lucide icon. Keep keys in sync with the
// options list in src/sanity/schemaTypes/serviceCategory.ts. Falls back to Layers.
const ICONS = {
  layers: Layers,
  "brick-wall": BrickWall,
  truck: Truck,
  hammer: Hammer,
  shovel: Shovel,
  pickaxe: Pickaxe,
  "hard-hat": HardHat,
  ruler: Ruler,
  wrench: Wrench,
  forklift: Forklift,
} satisfies Record<string, typeof Layers>;

export function ServiceIcon({
  name,
  className,
  strokeWidth = 1.8,
}: {
  name?: string | null;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = ICONS[name as keyof typeof ICONS] ?? Layers;

  return <Icon className={className} strokeWidth={strokeWidth} />;
}
