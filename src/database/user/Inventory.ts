import { Collection } from "discord.js";
import { Collectable, Tool } from "../items";

export interface Inventory {
    collectables: Collection<string, Collectable>;
    tools: Collection<string, Tool>;
}