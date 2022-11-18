import { Collection } from "discord.js";
import { Collectable, Item, Tool } from "../items";

export class Inventory {
    private collectables: Collection<string, Collectable>;
    private tools: Collection<string, Tool>;

    public constructor(collectables: Collection<string, Tool> = new Collection<string, Tool>(), tools: Collection<string, Tool> = new Collection<string, Tool>()) {
        this.collectables = collectables;
        this.tools = tools;
    }

    public getCollectables(): Collection<string, Collectable> {
        return this.collectables;
    }

    public getTools(): Collection<string, Item> {
        return this.tools;
    }
}