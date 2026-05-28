import { Unit, convert} from './units';


export type Ingredient = {
    id: string;
    label: string;
    gramsPerCup: number;
}

export const INGREDIENTS: Ingredient[] = [
  // Flours
{ id: "flour_ap",       label: "Flour (all-purpose)",      gramsPerCup: 125 },
{ id: "flour_bread",    label: "Flour (bread)",            gramsPerCup: 127 },
{ id: "flour_whole",    label: "Flour (whole wheat)",      gramsPerCup: 120 },
{ id: "flour_cake",     label: "Flour (cake)",             gramsPerCup: 114 },

  // Sugars
{ id: "sugar_white",    label: "Sugar (white granulated)", gramsPerCup: 200 },
{ id: "sugar_brown",    label: "Sugar (brown, packed)",    gramsPerCup: 220 },
{ id: "sugar_powdered", label: "Sugar (powdered)",         gramsPerCup: 120 },

  // Fats
{ id: "butter",         label: "Butter",                   gramsPerCup: 227 },
{ id: "oil_veg",        label: "Oil (vegetable)",          gramsPerCup: 218 },

  // Dairy / liquids
{ id: "milk",           label: "Milk",                     gramsPerCup: 245 },
{ id: "water",          label: "Water",                    gramsPerCup: 240 },
{ id: "honey",          label: "Honey",                    gramsPerCup: 340 },

  // Misc
{ id: "cocoa",          label: "Cocoa powder",             gramsPerCup: 85 },
{ id: "oats",           label: "Oats (rolled)",            gramsPerCup: 90 },
{ id: "rice",           label: "Rice (uncooked)",          gramsPerCup: 185 },
{ id: "salt",           label: "Salt",                     gramsPerCup: 288 },
];


export const convertIngredient= (
    value: number,
    from: Unit,
    to: Unit,
    ingredient: Ingredient
): number => {
    // Case 1: Same category - use the regular unit conversion
    if (from.category === to.category) {
        const result = convert(value, from, to);
        return result ?? 0;
    }

    // Case 2: Volume -> weight
    if (from.category === "volume" && to.category === "weight"){
        // convert the volume value to ml
        const ml = value * from.toBase;
        const cups = ml / 240; // 1 cup = 240 ml
        const grams = cups * ingredient.gramsPerCup;
        return grams / to.toBase; // convert grams to target unit
    }

    // Case 3: Weight -> volume
    if (from.category === "weight" && to.category === "volume"){
        // convert the weight value to grams
        const grams = value * from.toBase;
        const cups = grams / ingredient.gramsPerCup;
        const ml = cups * 240;
        return ml / to.toBase; // convert ml to target unit
    }

return 0;
};