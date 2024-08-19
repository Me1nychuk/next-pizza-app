export const mapPizzaSize = {
  20: "Мала",
  30: "Середня",
  40: "Велика",
} as const;

export const mapPizzaType = {
  1: "традиційне",
  2: "тонке",
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([name, value]) => ({
  name,
  value,
}));
