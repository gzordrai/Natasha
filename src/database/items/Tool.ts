import { Item } from "./Item";
import { JSONTool } from "../JSON";

export class Tool extends Item {
    private breakRate: number;

    public constructor(name: string, price: number, breakRate: number, copy: number = 0) {
        super(name, price, copy);
        this.breakRate = breakRate;
    }

    /**
     * The break rate of the tool
     * 
     * @returns tool's break rate
     */
    public getBreakRate(): number {
        return this.breakRate;
    }

    /**
     * Check if the tool broke
     * 
     * @returns true if the tool is broken otherwise false
     */
    public isBreaked(): boolean {
        const min: number = 0;
        const max: number = 100;
        const rand: number = Math.floor(Math.random() * (max - min + 1) + min);

        if (rand <= this.breakRate)
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