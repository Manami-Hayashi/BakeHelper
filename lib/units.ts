export type Category = "volume" | "weight"

export type Unit = {
    id: string;
    label: string; 
    category: Category;
    toBase: number;
};

export const UNITS: Unit[] = [
    { id: "ml", label: "ml", category: "volume", toBase: 1},
    { id: "tsp",     label: "tsp",     category: "volume", toBase: 4.92892 },
    { id: "tbsp",    label: "tbsp",    category: "volume", toBase: 14.7868 },
    { id: "floz",    label: "fl oz",   category: "volume", toBase: 29.5735 },
    { id: "cup",     label: "cup",     category: "volume", toBase: 240 },
    { id: "l",       label: "L",       category: "volume", toBase: 1000 },
    { id: "gallon",  label: "gallon",  category: "volume", toBase: 3785.41 },

  // Weight (base: g)
    { id: "g",   label: "g",   category: "weight", toBase: 1 },
    { id: "kg",  label: "kg",  category: "weight", toBase: 1000 },
    { id: "oz",  label: "oz",  category: "weight", toBase: 28.3495 },
    { id: "lb",  label: "lb",  category: "weight", toBase: 453.592 },
]

// Convert a value from one unit to another
export const convert = (
    value: number,
    from: Unit,
    to: Unit
): number | null => {
    if (from.category !== to.category) {
        return null;
    }
    const inBase = value * from.toBase;
    return inBase/ to.toBase;
};

// Filter UNITS to only those in the same category as the given unit.
export const compatibleUnits = (selected: Unit) : Unit[] => {
    return UNITS.filter((u) => u.category === selected.category);
};