import { ShoppingListItem } from "./shoppingListItem.model";

export interface Recipe {
    id: number;
    name: string;
    description: string;
    ingredients: ShoppingListItem[];
    instructions: string[];
}