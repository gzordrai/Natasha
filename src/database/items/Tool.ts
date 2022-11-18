import { Item } from ".";
import { JSONTool } from "../JSON";

export class Tool extends Item {
    private breakRate: number;

    public constructor(name: string, price: number, breakRate: number, copy?: number) {
        super(name, price, copy);
        this.breakRate = breakRate;
    }

    /**
     * Check if the tool broke
     * 
     * @returns true if the tool is broken otherwise false
     */
    public isBreaked(): boolean {
        const rand: number = Math.floor(Math.random() * (100 - 0) + 0);

        if (this.breakRate <= rand)
            return true;
        return false;
    }

    /**
     * The data of the class intended to be stored in a .json
     * 
     * @returns class data
     */
    public toJSON(): JSONTool {
        return { name: this.name, price: this.price, copy: this.copy, breakRate: this.breakRate };
    }
}