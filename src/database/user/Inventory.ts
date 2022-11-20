import { Collection } from "discord.js";
import { Collectable, Tool } from "../items";
import { JSONCollectable, JSONInventory, JSONTool } from "../JSON";

export class Inventory {
    private collectables: Collection<string, Collectable>;
    private tools: Collection<string, Tool>;

    public constructor(collectables: Collection<string, Tool> = new Collection<string, Tool>(), tools: Collection<string, Tool> = new Collection<string, Tool>()) {
        this.collectables = collectables;
        this.tools = tools;
    }

    /**
     * Add a collectable item in user's inventory
     * 
     * @param collectable collectable item to be added
     */
    public addCollectable(collectable: Collectable): void {
        if (this.collectables.has(collectable.getName())) {
            const oldCollectable: Collectable = this.collectables.get(collectable.getName())!;

            collectable.setCopies(collectable.getCopies() + oldCollectable.getCopies());
        }

        this.collectables.set(collectable.getName(), collectable);
    }

    /**
     * Add a tool in user's inventory
     * 
     * @param tool tool to be added
     */
    public addTool(tool: Tool): void {
        if (this.tools.has(tool.getName())) {
            const oldTool: Tool = this.tools.get(tool.getName())!;

            tool.setCopies(tool.getCopies() + oldTool.getCopies())
        }

        this.tools.set(tool.getName(), tool);
    }

    /**
     * All collectable items in user's inventory
     * 
     * @returns user's collectable items
     */
    public getCollectables(): Collection<string, Collectable> {
        return this.collectables;
    }

    /**
     * All tools in user's inventory
     * 
     * @returns user's tools
     */
    public getTools(): Collection<string, Tool> {
        return this.tools;
    }

    /**
     * The data of the class intended to be stored in a .json
     * 
     * @returns class data
     */
    public toJSON(): JSONInventory {
        let collectables: Array<JSONCollectable> = new Array<JSONCollectable>();
        let tools: Array<JSONTool> = new Array<JSONTool>();

        this.collectables.forEach((collectable: Collectable) => {
            collectables.push(collectable.toJSON());
        });

        this.tools.forEach((tool: Tool) => {
            tools.push(tool.toJSON());
        });

        return { collectables: collectables, tools: tools };
    }
}