import { Item } from ".";
import { JSONCollectable } from "../JSON";

export class Collectable extends Item {
    public constructor(name: string, price: number, copy?: number) {
        super(name, price, copy);
    }

    /**
     * The data of the class intended to be stored in a .json
     * 
     * @returns class data
     */
    public toJSON(): JSONCollectable {
        return { name: this.name, price: this.price, copy: this.copy };
    }
}